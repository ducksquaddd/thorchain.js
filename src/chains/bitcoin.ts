/* YOU WILL FIND ALOT OF TS-IGNORE's THROUGHOUT THIS PROJECT. YOU CAN FIX THEM IF YOU WANT I DONT REALLY CARE */

import { TxHash, Network } from "@xchainjs/xchain-client";
import { Client as BitClient } from "@xchainjs/xchain-bitcoin";
import {
  baseAmount,
  Chain,
  THORChain,
  assetToBase,
  baseToAsset,
  BTCChain,
  AssetBTC,
  assetAmount,
  AssetAmount,
} from "@xchainjs/xchain-util";

export interface IBitcoin {
  getClient(): BitClient;
  //   deposit(tx: DepositParam): Promise<TxHash>;
}

export class Bitcoin implements IBitcoin {
  chain: Chain;
  client: BitClient;
  constructor({
    network = Network.Mainnet,
    phrase,
  }: {
    network?: Network;
    phrase: string;
  }) {
    this.chain = BTCChain;
    this.client = new BitClient({
      network,
      phrase,
    });
  }
  getClient(): BitClient {
    return this.client;
  }
  get getAddress() {
    return this.client.getAddress();
  }

  async getBalance(address?: string) {
    if (address) {
      let bal = await this.client.getBalance(address).catch((err) => {
        return "invalid address";
      });
      if (bal === "invalid address") {
        return new Error("Invalid address");
      }
      // @ts-ignore
      let assetAmount = baseToAsset(bal[0].amount).amount();
      return {
        // @ts-ignore
        base: bal[0].amount.amount().toString(),
        asset: assetAmount.toString(),
      };
    } else {
      let addy = this.getAddress;
      let balance = await this.client.getBalance(addy).catch((err) => {
        return "invalid address";
      });
      if (balance === "invalid address") {
        return new Error("Invalid address");
      }
      // @ts-ignore

      let assetAmount = baseToAsset(balance[0].amount).amount();
      return {
        // @ts-ignore

        base: balance[0].amount.amount().toString(),
        asset: assetAmount.toString(),
      };
    }
  }

  assetToBase(amount: any): AssetAmount | Error {
    if (isNaN(amount)) {
      return new Error("Amount is not a number");
    }
    // @ts-ignore
    return assetToBase(assetAmount(amount, 8));
  }

  baseToAsset(amount: any): AssetAmount {
    return baseToAsset(amount);
  }
  async transfer(
    baseAmount: any,
    receiver: string,
    memo?: string
  ): Promise<TxHash> {
    if (!memo) {
      memo = "";
    }
    const { fast, fastest, average } = await this.client.getFeeRates();

    const txid = await this.client.transfer({
      asset: AssetBTC,
      recipient: receiver,
      amount: baseAmount,
      memo: memo,
      feeRate: fast,
    });
    return txid;
  }
}
