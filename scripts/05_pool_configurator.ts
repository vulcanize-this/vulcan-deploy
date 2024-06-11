// Import JSON Artifacts from Contracts
import PoolConfiguratorArtifact from "../artifacts/contracts/protocol/pool/PoolConfigurator.sol/PoolConfigurator.json";

// Import Main Deploy Script Functions
import createDeployment from "./utils/createDeployment";

// Deploy Pool Configurator
export const deployPoolConfigurator = createDeployment({
    key: "PoolConfigurator",
    artifact: PoolConfiguratorArtifact,
    computeLibs(state, config) {
      if (state.ConfiguratorLogic === undefined) {
        throw new Error(
          "ConfiguratorLogic address not provided to deploy Pool Configurator"
        );
      }
      return {["ConfiguratorLogic"]: state.ConfiguratorLogic};
    },
  });