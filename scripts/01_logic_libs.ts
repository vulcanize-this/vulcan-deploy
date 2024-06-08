import { ContractFactory } from "@ethersproject/contracts";
import BorrowLogic from "../artifacts/contracts/protocol/libraries/logic/BorrowLogic.sol/BorrowLogic.json";
import SupplyLogic from "../artifacts/contracts/protocol/libraries/logic/SupplyLogic.sol/SupplyLogic.json";
import createDeployment from "./utils/createDeployment";
import createDeployLibrary from "./utils/createDeployLibrary";

export const deploySupplyLogic = createDeployLibrary({
  key: "SupplyLogic",
  artifact: SupplyLogic,
});


export const deployBorrowLogic = createDeployLibrary({
    key: "BorrowLogic",
    artifact: BorrowLogic
})