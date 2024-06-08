import { program } from "commander";
import { Wallet } from "@ethersproject/wallet";
import { version } from "./package.json";
import { JsonRpcProvider, TransactionReceipt } from "@ethersproject/providers";
import { deployRegistry } from "./scripts/00_markets_registry";
import { sign } from "crypto";

program
  .requiredOption(
    "-pk, --private-key <string>",
    "Private key used to deploy all contracts"
  )
  .requiredOption(
    "-j, --json-rpc <url>",
    "JSON RPC URL where the program should be deployed"
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

async function run() {
  console.log(opts);
  const { registryProvider } = await deployRegistry({ signer: wallet });
  console.log(registryProvider);
}

run().then();
