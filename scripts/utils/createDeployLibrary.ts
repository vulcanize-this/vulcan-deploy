import { ContractInterface, ContractFactory } from '@ethersproject/contracts'
import { DeploymentConfig, DeploymentState } from '../types'

export default function createDeployLibrary({
  key,
  artifact: { contractName, abi, bytecode },
}: {
  key: keyof DeploymentState
  artifact: { contractName: string; abi: ContractInterface; bytecode: string }
}) {
  return async (state: DeploymentState, { signer, gasPrice }: DeploymentConfig) => {
    if (state[key] === undefined) {
      const factory = new ContractFactory(abi, bytecode, signer)

      const library = await factory.deploy({ gasPrice })
      state[key] = library.address

      return [
        {
          message: `Library ${contractName} deployed`,
          address: library.address,
          hash: library.deployTransaction.hash,
        },
      ]
    } else {
      return [{ message: `Library ${contractName} was already deployed`, address: state[key] }]
    }
  }
}
