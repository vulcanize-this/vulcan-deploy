import { Signer } from "@ethersproject/abstract-signer";
import { BigNumber } from "@ethersproject/bignumber";

export interface DeploymentState {
  PoolAddressesProviderRegistry?: string;
  SupplyLogic?: string;
  BorrowLogic?: string;
  LiquidationLogic?: string;
  EModeLogic?: string;
  BridgeLogic?: string;
  ConfiguratorLogic?: string;
  FlashLoanLogic?: string;
  PoolLogic?: string;
}

export type DeploymentConfig = {
  signer: Signer;
  gasPrice: BigNumber | undefined;
  owner?: string;
};
