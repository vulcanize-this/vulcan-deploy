// Import JSON Artifacts from Contracts
import BorrowLogic from "../artifacts/contracts/protocol/libraries/logic/BorrowLogic.sol/BorrowLogic.json";
import SupplyLogic from "../artifacts/contracts/protocol/libraries/logic/SupplyLogic.sol/SupplyLogic.json";
import LiquidationLogic from "../artifacts/contracts/protocol/libraries/logic/LiquidationLogic.sol/LiquidationLogic.json";
import EModeLogic from "../artifacts/contracts/protocol/libraries/logic/EModeLogic.sol/EModeLogic.json";
import BridgeLogic from "../artifacts/contracts/protocol/libraries/logic/BridgeLogic.sol/BridgeLogic.json";
import PoolLogic from "../artifacts/contracts/protocol/libraries/logic/PoolLogic.sol/PoolLogic.json";
import ConfiguratorLogic from "../artifacts/contracts/protocol/libraries/logic/ConfiguratorLogic.sol/ConfiguratorLogic.json";
import FlashLoanLogic from "../artifacts/contracts/protocol/libraries/logic/FlashLoanLogic.sol/FlashLoanLogic.json";

// Import Main Deploy Script Functions
import createDeployLibrary from "./utils/createDeployLibrary";
import createDeployment from "./utils/createDeployment";

// Deploy SupplyLogic
export const deploySupplyLogic = createDeployLibrary({
  key: "SupplyLogic",
  artifact: SupplyLogic,
});

// Deploy BorrowLogic
export const deployBorrowLogic = createDeployLibrary({
  key: "BorrowLogic",
  artifact: BorrowLogic,
});

// Deploy LiquidationLogic
export const deployLiquidationLogic = createDeployLibrary({
  key: "LiquidationLogic",
  artifact: LiquidationLogic,
});

// Deploy EModeLogic
export const deployEModeLogic = createDeployLibrary({
  key: "EModeLogic",
  artifact: EModeLogic,
});

// Deploy BridgeLogic
export const deployBridgeLogic = createDeployLibrary({
  key: "BridgeLogic",
  artifact: BridgeLogic,
});

// Deploy ConfiguratorLogic
export const deployConfiguratorLogic = createDeployLibrary({
  key: "ConfiguratorLogic",
  artifact: ConfiguratorLogic,
});

// Deploy FlashLoanLogic and configure BorrowLogic address
export const deployFlashLoanLogic = createDeployment({
  key: "FlashLoanLogic",
  artifact: FlashLoanLogic,
  computeLibs(state, config) {
    if (state.BorrowLogic === undefined) {
      throw new Error(
        "Borrow logic address not provided to deploy flashloan lib"
      );
    }
    return {["BorrowLogic"]: state.BorrowLogic};
  },
});

// Deploy PoolLogic
export const deployPoolLogic = createDeployLibrary({
    key: 'PoolLogic',
    artifact: PoolLogic
})