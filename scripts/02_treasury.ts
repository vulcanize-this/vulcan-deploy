// Import JSON Artifacts from Contracts
import proxyArtifact from "../artifacts/contracts/dependencies/openzeppelin/upgradeability/InitializableAdminUpgradeabilityProxy.sol/InitializableAdminUpgradeabilityProxy.json";
import treasuryControllerArtifact from "../artifacts/contracts/treasury/AaveEcosystemReserveController.sol/AaveEcosystemReserveController.json";
import treasuryReserve from "../artifacts/contracts/treasury/AaveEcosystemReserveV2.sol/AaveEcosystemReserveV2.json";

// Import Main Deploy Script Functions
import createDeployment from "./utils/createDeployment";

// Deploy TreasuryProxy
export const deployTreasuryProxy = createDeployment({
  key: "TreasuryProxy",
  artifact: proxyArtifact,
});

// Deploy TreasuryController
export const deployTreasuryController = createDeployment({
  key: "TreasuryController",
  artifact: treasuryControllerArtifact,
  argsFn(state, {owner}) {
    if (owner === undefined) {
        throw new Error(`Missing Deployer address in Registry Provider`)
    }
    return [owner]
},
});

// Deploy TreasuryImplementation
export const deployTreasuryImpl = createDeployment({
  key: "TreasuryImplementation",
  artifact: treasuryReserve,
});
