import {
  ContractInterface,
  ContractFactory,
  Contract,
} from "@ethersproject/contracts";
import { DeploymentConfig, DeploymentState } from "../types";
import { error } from "console";
import linkLibraries from "./linkLibraries";

//inspired from uniswap deploy v3
type ConstructorArgs = (string | number | string[] | number[])[];

const createDeployment = ({
  key,
  artifact: { contractName, abi, bytecode, linkReferences },
  argsFn,
  computeLibs,
}: {
  key: keyof DeploymentState;
  artifact: {
    contractName: string;
    abi: ContractInterface;
    bytecode: string;
    linkReferences?: {
      [fileName: string]: {
        [contractName: string]: { length: number; start: number }[];
      };
    };
  };
  argsFn?: (
    state: Readonly<DeploymentState>,
    config: DeploymentConfig
  ) => ConstructorArgs;
  computeLibs?: (
    state: Readonly<DeploymentState>,
    config: DeploymentConfig
  ) => { [libraryName: string]: string };
}) => {
  if (
    linkReferences &&
    Object.keys(linkReferences).length > 0 &&
    !computeLibs
  ) {
    throw new Error("Missing function to compute library addresses");
  } else if (
    computeLibs &&
    (!linkReferences || Object.keys(linkReferences).length === 0)
  ) {
    throw new Error("Compute libraries passed but no link references");
  }
  return async (state: DeploymentState, config: DeploymentConfig) => {
    if (state[key] === undefined) {
      const args = argsFn ? argsFn(state, config) : [];
      const factory = new ContractFactory(abi, linkReferences && computeLibs
        ? linkLibraries({ bytecode, linkReferences }, computeLibs(state, config))
        : bytecode, config.signer);

      let contract: Contract;
      try {
        contract = await factory.deploy(...args, { gasPrice: config.gasPrice });
      } catch (e) {
        console.error(`Failed to deploy: ${contractName}`);
        throw error;
      }
      state[key] = contract.address;
      return [
        {
          message: `Contract ${contractName} deployed`,
          address: contract.address,
          hash: contract.deployTransaction.hash,
        },
      ];
    } else {
      return [
        {
          message: `Contract ${contractName} was already deployed`,
          address: state[key],
        },
      ];
    }
  };
};

export default createDeployment;
