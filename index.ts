import { program } from "commander";
import { Wallet } from "@ethersproject/wallet";
import { version } from "./package.json";
import { JsonRpcProvider, TransactionReceipt } from "@ethersproject/providers";
import { deployRegistry } from "./scripts/00_markets_registry";
import { sign } from "crypto";
import { DeploymentState } from "./scripts/types";
import fs from "fs";
import { BigNumber } from "@ethersproject/bignumber";
import { deployBorrowLogic, deploySupplyLogic } from "./scripts/01_logic_libs";

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
  //deploy logic libraries
  console.log(registry);
  const supplylib = await deploySupplyLogic(state, deployConfig);
  const borrowlib = await deployBorrowLogic(state, deployConfig);
  console.log(supplylib);
  console.log(borrowlib);
}

run().then();
