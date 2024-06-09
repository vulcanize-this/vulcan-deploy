import { ContractFactory } from "@ethersproject/contracts";
import BorrowLogic from "../artifacts/contracts/protocol/libraries/logic/BorrowLogic.sol/BorrowLogic.json";
import SupplyLogic from "../artifacts/contracts/protocol/libraries/logic/SupplyLogic.sol/SupplyLogic.json";
import LiquidationLogic from "../artifacts/contracts/protocol/libraries/logic/LiquidationLogic.sol/LiquidationLogic.json";
import EModeLogic from "../artifacts/contracts/protocol/libraries/logic/EModeLogic.sol/EModeLogic.json";
import BridgeLogic from "../artifacts/contracts/protocol/libraries/logic/BridgeLogic.sol/BridgeLogic.json";
import PoolLogic from "../artifacts/contracts/protocol/libraries/logic/PoolLogic.sol/PoolLogic.json";
import ConfiguratorLogic from "../artifacts/contracts/protocol/libraries/logic/ConfiguratorLogic.sol/ConfiguratorLogic.json";
import FlashLoanLogic from "../artifacts/contracts/protocol/libraries/logic/FlashLoanLogic.sol/FlashLoanLogic.json";
import createDeployLibrary from "./utils/createDeployLibrary";
import createDeployment from "./utils/createDeployment";

export const deploySupplyLogic = createDeployLibrary({
  key: "SupplyLogic",
  artifact: SupplyLogic,
});

export const deployBorrowLogic = createDeployLibrary({
  key: "BorrowLogic",
  artifact: BorrowLogic,
});

export const deployLiquidationLogic = createDeployLibrary({
  key: "LiquidationLogic",
  artifact: LiquidationLogic,
});

export const deployemodeLogic = createDeployLibrary({
  key: "EModeLogic",
  artifact: EModeLogic,
});

export const deployBridgeLogic = createDeployLibrary({
  key: "BridgeLogic",
  artifact: BridgeLogic,
});

export const deployConfiguratorLogic = createDeployLibrary({
  key: "ConfiguratorLogic",
  artifact: ConfiguratorLogic,
});

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


export const deployPoolLogic = createDeployLibrary({
    key: 'PoolLogic',
    artifact: PoolLogic
})