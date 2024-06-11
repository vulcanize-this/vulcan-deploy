import createDeployment from "./utils/createDeployment";
import poolAddressProviderArtifact from '../artifacts/contracts/protocol/configuration/PoolAddressesProvider.sol/PoolAddressesProvider.json'


export const deployAddressProvider = createDeployment({
    key: "PoolAddressProvider",
    artifact: poolAddressProviderArtifact,
    argsFn(state, {owner}) {
        if (owner === undefined) {
            throw new Error(`Missing Deployer address in Registry Provider`)
        }
        return [0, owner]
    },
})