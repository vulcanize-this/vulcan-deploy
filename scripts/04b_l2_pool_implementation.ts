// Import JSON Artifacts from Contracts
import L2PoolArtifact from "../artifacts/contracts/protocol/pool/L2Pool.sol/L2Pool.json";
import CalldataLogic from "../artifacts/contracts/protocol/libraries/logic/CalldataLogic.sol/CalldataLogic.json"; 

// Import Main Deploy Script Functions
import createDeployLibrary from "./utils/createDeployLibrary";
import createDeployment from "./utils/createDeployment";

// Deploy CalldataLogic for L2Pool
export const deployCalldataLogic = createDeployLibrary({
    key: "CalldataLogic",
    artifact: CalldataLogic,
});

// Deploy L2Pool and configure Pool Address Provider address
export const deployAddressProvider = createDeployment({
    key: "L2Pool",
    artifact: L2PoolArtifact,
    argsFn(state, {poolProvider}) {
        if (poolProvider === undefined) {
            throw new Error(`Missing Pool Address Provider address in L2Pool`)
        }
        return [poolProvider]
    },
    computeLibs(state,config) {
        if (state.LiquidationLogic === undefined) {
            throw new Error(
                "LiquidationLogic address not provided to deploy Pool contract"
            );
        }

        if (state.SupplyLogic === undefined) {
            throw new Error(
                "SupplyLogic address not provided to deploy Pool contract"
            );
        }

        if (state.EModeLogic === undefined) {
            throw new Error(
                "EModeLogic address not provided to deploy Pool contract"
            );
        }

        if (state.FlashLoanLogic === undefined) {
            throw new Error(
                "FlashLoanLogic address not provided to deploy Pool contract"
            );
        }

        if (state.BorrowLogic === undefined) {
            throw new Error(
                "BorrowLogic address not provided to deploy Pool contract"
            );
        }

        if (state.BridgeLogic === undefined) {
            throw new Error(
                "BridgeLogic address not provided to deploy Pool contract"
            );
        }

        if (state.PoolLogic === undefined) {
            throw new Error(
                "PoolLogic address not provided to deploy Pool contract"
            );
        }

        if (state.CalldataLogic === undefined) {
            throw new Error(
                "CalldataLogic address not provided to deploy Pool contract"
            );
        }

        return {
            ["LiquidationLogic"]: state.LiquidationLogic,
            ["SupplyLogic"]: state.SupplyLogic,
            ["EModeLogic"]: state.EModeLogic,
            ["FlashLoanLogic"]: state.FlashLoanLogic,
            ["BorrowLogic"]: state.BorrowLogic,
            ["BridgeLogic"]: state.BridgeLogic,
            ["PoolLogic"]: state.PoolLogic,
            ["CalldataLogic"]: state.CalldataLogic,
        };
    },
    
})
