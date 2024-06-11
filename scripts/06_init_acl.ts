// Import JSON Artifacts from Contracts
import ACLManagerArtifact from "../artifacts/contracts/protocol/configuration/ACLManager.sol/ACLManager.json";

// Import Main Deploy Script Functions
import createDeployment from "./utils/createDeployment";

// Deploy ACL Manager
export const deployACLManager = createDeployment({
    key: "ACLManager",
    artifact: ACLManagerArtifact,
    argsFn(state, {poolProvider}) {
        if (poolProvider === underfined) {
            throw new Error("Missing Pool Address Provider address in ACL Manager") 
        }
        return [poolProvider]
    }
  });