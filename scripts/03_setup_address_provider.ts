// Import JSON Artifacts from Contracts
import PoolAddressProviderArtifact from "../artifacts/contracts/protocol/configuration/PoolAddressesProvider.sol/PoolAddressesProvider.json";

// Import Main Deploy Script Functions
import createDeployment from "./utils/createDeployment";

// Deploy PoolAddressProvider and configure market ID as 0 and owner
export const deployAddressProvider = createDeployment({
    key: "PoolAddressProvider",
    artifact: PoolAddressProviderArtifact,
    argsFn(state, {owner}) {
        if (owner === undefined) {
            throw new Error(`Missing deployer address in Pool Address Provider`)
        }
        return [0, owner]
    },
})