import { ContractFactory } from "@ethersproject/contracts";
import {
  abi,
  bytecode,
} from "../artifacts/contracts/protocol/configuration/PoolAddressesProviderRegistry.sol/PoolAddressesProviderRegistry.json";

export const deployRegistry = async ({ signer }: any) => {
  const rp = new ContractFactory(abi, bytecode, signer);
  const deployed = await rp.deploy(signer.address)

  return {
    registryProvider: deployed,
  };
};
