import { program } from "commander";
import { Wallet } from "@ethersproject/wallet";
import { version } from "./package.json";
import { JsonRpcProvider, TransactionReceipt } from "@ethersproject/providers";
import { deployRegistry } from "./scripts/00_markets_registry";
import { DeploymentState } from "./scripts/types";
import fs from "fs";
import { BigNumber } from "@ethersproject/bignumber";
import {
  deployBorrowLogic,
  deployLiquidationLogic,
  deploySupplyLogic,
  deployemodeLogic,
  deployBridgeLogic,
  deployConfiguratorLogic,
  deployPoolLogic,
  deployFlashLoanLogic,
} from "./scripts/01_logic_libs";
import { abi as TreasuryInterface } from "./artifacts/contracts/treasury/AaveEcosystemReserveV2.sol/AaveEcosystemReserveV2.json";
import { abi as TreasuryProxyInterface } from "./artifacts/contracts/dependencies/openzeppelin/upgradeability/InitializableAdminUpgradeabilityProxy.sol/InitializableAdminUpgradeabilityProxy.json";
import {
  deployTreasuryController,
  deployTreasuryImpl,
  deployTreasuryProxy,
} from "./scripts/02_treasury";
import { Contract } from "@ethersproject/contracts";
import { ZERO_ADDRESS } from "./scripts/utils/constants";

program
  .requiredOption(
    "-pk, --private-key <string>",
    "Private key used to deploy all contracts"
  )
  .requiredOption(
    "-j, --json-rpc <url>",
    "JSON RPC URL where the program should be deployed"
  )
  .option(
    "-s, --state <path>",
    "Path to the JSON file containing the migrations state (optional)",
    "./state.json"
  );

program.name("vulcan").version(version).parse(process.argv);

const opts = program.opts();

if (!/^0x[a-zA-Z0-9]{64}$/.test(opts.privateKey)) {
  console.error("Invalid private key!");
  process.exit(1);
}

let url: URL;
try {
  url = new URL(opts.jsonRpc);
} catch (error) {
  console.error("Invalid JSON RPC URL", (error as Error).message);
  process.exit(1);
}

const wallet = new Wallet(
  opts.privateKey,
  new JsonRpcProvider({ url: url.href })
);

let state: DeploymentState;
if (fs.existsSync(opts.state)) {
  try {
    state = JSON.parse(fs.readFileSync(opts.state, { encoding: "utf8" }));
  } catch (error) {
    console.error(
      "Failed to load and parse migration state file",
      (error as Error).message
    );
    process.exit(1);
  }
} else {
  state = {};
}

let gasPrice: number | undefined;
try {
  gasPrice = opts.gasPrice ? parseInt(opts.gasPrice) : undefined;
} catch (error) {
  console.error("Failed to parse gas price", (error as Error).message);
  process.exit(1);
}

async function run() {
  const BNGasPrice =
    typeof gasPrice === "number"
      ? BigNumber.from(gasPrice).mul(BigNumber.from(10).pow(9))
      : undefined;
  const deployConfig = { signer: wallet, gasPrice: BNGasPrice };
  //deploy Provider Registry
  const registry = await deployRegistry(state, {
    ...deployConfig,
    owner: wallet.address,
  });
  //deploy logic libraries, do it individually instead of a tight loop due to nonce errors
  await deployBorrowLogic(state, deployConfig);
  await deploySupplyLogic(state, deployConfig);
  await deployemodeLogic(state, deployConfig);
  await deployLiquidationLogic(state, deployConfig);
  await deployBridgeLogic(state, deployConfig);
  await deployConfiguratorLogic(state, deployConfig);
  await deployPoolLogic(state, deployConfig);
  //deploy flashloan
  await deployFlashLoanLogic(state, deployConfig);

  //deploy treasury proxy
  await deployTreasuryProxy(state, deployConfig);

  //deploy treasury controller
  await deployTreasuryController(state, {
    ...deployConfig,
    owner: wallet.address,
  });

  //deploy tresury Reserve
  await deployTreasuryImpl(state, deployConfig);

  //initialize the treasury code
  if (state.TreasuryImplementation && state.TreasuryProxy) {
    const tiContract = new Contract(
      state.TreasuryImplementation,
      TreasuryInterface,
      wallet
    );
    await tiContract["initialize"](ZERO_ADDRESS);
    const payload = tiContract.interface.encodeFunctionData("initialize", [
      state.TreasuryController,
    ]);

    //initialize the proxy
    const proxy = new Contract(
      state.TreasuryProxy,
      TreasuryProxyInterface,
      wallet
    );

    await proxy["initialize(address,address,bytes)"](
      state.TreasuryImplementation,
      wallet.address,
      payload
    );
  }
  console.log(state);
}

run().then();
