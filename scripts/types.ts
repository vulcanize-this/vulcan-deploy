import { Signer } from '@ethersproject/abstract-signer'

export interface DeploymentState {

}

export type DeploymentConfig = {
    signer: Signer;
}