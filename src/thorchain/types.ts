import {
  BTCChain,
  BNBChain,
  THORChain,
  ETHChain,
  LTCChain,
  BaseAmount,
  // BCHChain,
} from "@xchainjs/xchain-util";

export const Chains = {
  BTCChain,
  //   BNBChain,
  THORChain,
  //   ETHChain,
  //   LTCChain,
  // BCHChain,
};

export type Transfer = {
  recipient: string;
  amount: BaseAmount;
  memo?: string;
};
