import createDeployment from "./utils/createDeployment";
import proxyArtifact from "../artifacts/contracts/dependencies/openzeppelin/upgradeability/InitializableAdminUpgradeabilityProxy.sol/InitializableAdminUpgradeabilityProxy.json";
import treasuryControllerArtifact from "../artifacts/contracts/treasury/AaveEcosystemReserveController.sol/AaveEcosystemReserveController.json";
import treasuryReserve from "../artifacts/contracts/treasury/AaveEcosystemReserveV2.sol/AaveEcosystemReserveV2.json";

export const deployTreasuryProxy = createDeployment({
  key: "TreasuryProxy",
  artifact: proxyArtifact,
});

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

export const deployTreasuryImpl = createDeployment({
  key: "TreasuryImplementation",
  artifact: treasuryReserve,
});
