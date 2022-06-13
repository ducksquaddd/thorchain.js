/* YOU WILL FIND ALOT OF TS-IGNORE's THROUGHOUT THIS PROJECT. YOU CAN FIX THEM IF YOU WANT I DONT REALLY CARE */

import { TxHash, Network, Fees } from "@xchainjs/xchain-client";
import {
  baseAmount,
  Chain,
  BTCChain,
  THORChain,
  baseToAsset,
  assetToBase,
  assetAmount,
  AssetAmount,
  BaseAmount,
} from "@xchainjs/xchain-util";

import { Chains, Transfer } from "./types";

/* All chains */
import { ThorChain } from "../chains/thorchain";
import { Bitcoin } from "../chains/bitcoin";

export interface IClient {
  chains: typeof Chains;
  network: string;

  thor: ThorChain;
  btc: Bitcoin;

  transfer(chain: Chain, transferObj: Transfer): Promise<TxHash>;
}

export class client implements IClient {
  private phrase: string;

  readonly chains = Chains;

  readonly network: Network;

  thor: ThorChain;

  btc: Bitcoin;

  constructor({
    network = Network.Mainnet,
    phrase = "",
  }: {
    network?: Network;
    phrase?: string;
  }) {
    this.network = network;
    this.phrase = phrase;

    // create chain clients
    this.thor = new ThorChain({
      network,
      phrase,
      chainIds: {
        testnet: "thorchain-testnet-v2",
        stagenet: "thorchain-stagenet-v2",
        mainnet: "thorchain-mainnet-v1",
      },
    });
    this.btc = new Bitcoin({ network, phrase });
    // this.bch = new BchChain({ network, phrase })
  }

  getChainClient = (chain: Chain) => {
    if (chain === THORChain) return this.thor;
    if (chain === BTCChain) return this.btc;
    // if (chain === BCHChain) return this.bch

    return null;
  };

  getAddressByChain = async (chain: Chain): Promise<string> => {
    const chainClient = this.getChainClient(chain);

    if (!chainClient) throw new Error("invalid chain");

    try {
      const wallet = chainClient.getAddress;
      return wallet;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getBalanceByChain = async (
    chain: Chain,
    address?: string
  ): Promise<Object> => {
    const chainClient = this.getChainClient(chain);
    if (!chainClient) throw new Error("invalid chain");
    try {
      if (address) {
        const balance = await chainClient.getBalance(address);
        return balance;
      } else {
        const balance = await chainClient.getBalance();
        return balance;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getFees = (chain: Chain): Promise<Fees> => {
    const chainClient = this.getChainClient(chain);
    if (!chainClient) throw new Error("invalid chain");

    return chainClient.getClient().getFees();
  };

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

  transfer = async (chain: Chain, transferObj: Transfer): Promise<TxHash> => {
    const chainClient = this.getChainClient(chain);
    if (!chainClient) throw new Error("invalid chain");
    try {
      const tx = await chainClient.transfer(
        transferObj.amount,
        transferObj.recipient,
        transferObj.memo
      );
      return tx;
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
