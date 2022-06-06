/* YOU WILL FIND ALOT OF TS-IGNORE's THROUGHOUT THIS PROJECT. YOU CAN FIX THEM IF YOU WANT I DONT REALLY CARE */

import { TxHash, Balance, Network } from "@xchainjs/xchain-client";
import { Client as ThorClient, ChainIds } from "@xchainjs/xchain-thorchain";
import {
  baseAmount,
  Chain,
  THORChain,
  assetToBase,
  baseToAsset,
  AssetRuneNative,
  assetAmount,
  AssetAmount,
  BaseAmount,
} from "@xchainjs/xchain-util";

export interface IThorChain {
  getClient(): ThorClient;
  //   deposit(tx: DepositParam): Promise<TxHash>;
}

// Abandon all hope, ye who enter here.

export class ThorChain implements IThorChain {
  chain: Chain;
  client: ThorClient;
  constructor({
    network = Network.Mainnet,
    phrase,
    chainIds,
  }: {
    network?: Network;
    phrase: string;
    chainIds: ChainIds;
  }) {
    this.chain = THORChain;
    this.client = new ThorClient({
      network,
      phrase,
      chainIds,
    });
  }
  getClient(): ThorClient {
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
      if (bal.length === 0) {
        return {
          base: "0",
          asset: "0",
        };
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
      if (balance.length === 0) {
        return {
          base: "0",
          asset: "0",
        };
      }
      //@ts-ignore
      let assetAmount = baseToAsset(balance[0].amount).amount();
      return {
        //@ts-ignore

        base: balance[0].amount.amount().toString(),
        asset: assetAmount.toString(),
      };
    }
  }

  assetToBase(amount: number): AssetAmount | Error {
    if (isNaN(amount)) {
      return new Error("Amount is not a number");
    }
    // @ts-ignore
    return assetToBase(assetAmount(amount, 8));
  }

  baseToAsset(amount: BaseAmount): AssetAmount {
    return baseToAsset(amount);
  }

  async transfer(
    baseAmount: BaseAmount,
    receiver: string,
    memo?: string
  ): Promise<TxHash> {
    if (!memo) {
      memo = "";
    }
    return await this.client.transfer({
      amount: baseAmount,
      recipient: receiver,
      memo: memo,
      asset: AssetRuneNative,
      walletIndex: 0,
    });
  }
}
