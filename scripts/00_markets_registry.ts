import PoolRegistryArtifact from "../artifacts/contracts/protocol/configuration/PoolAddressesProviderRegistry.sol/PoolAddressesProviderRegistry.json";
import createDeployment from "./utils/createDeployment";

export const deployRegistry = createDeployment({
    key: "PoolAddressesProviderRegistry",
    artifact: PoolRegistryArtifact,
    argsFn(state, {owner}) {
        if (owner === undefined) {
            throw new Error(`Missing Deployer address in Registry Provider`)
        }
        return [owner]
    },
});