// Import JSON Artifact from Contracts
import PoolRegistryArtifact from "../artifacts/contracts/protocol/configuration/PoolAddressesProviderRegistry.sol/PoolAddressesProviderRegistry.json";

// Import Main Deploy Script Functions
import createDeployment from "./utils/createDeployment";

// Deploy PoolAddressesProviderRegistry
export const deployRegistry = createDeployment({
    key: "PoolAddressesProviderRegistry",
    artifact: PoolRegistryArtifact,
    argsFn(state, {owner}) {
        if (owner === undefined) {
            throw new Error(`Missing Deployer address in Pool Addresses Provider Registry`)
        }
        return [owner]
    },
});