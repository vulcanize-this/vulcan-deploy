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
    
})
