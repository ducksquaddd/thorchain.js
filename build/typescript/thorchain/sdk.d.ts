import { TxHash, Network, Fees } from "@xchainjs/xchain-client";
import { Chain, AssetAmount, BaseAmount } from "@xchainjs/xchain-util";
import { Chains } from "./types";
import { ThorChain } from "../chains/thorchain";
import { Bitcoin } from "../chains/bitcoin";
declare type Transfer = {
    recipient: string;
    amount: string;
    memo?: string;
};
export interface IClient {
    chains: typeof Chains;
    network: string;
    thor: ThorChain;
    btc: Bitcoin;
    transfer(chain: Chain, transferObj: Transfer): Promise<TxHash>;
}
export declare class client implements IClient {
    private phrase;
    readonly chains: {
        BTCChain: Chain;
        THORChain: Chain;
    };
    readonly network: Network;
    thor: ThorChain;
    btc: Bitcoin;
    constructor({ network, phrase, }: {
        network?: Network;
        phrase?: string;
    });
    getChainClient: (chain: Chain) => ThorChain | Bitcoin | null;
    getAddressByChain: (chain: Chain) => Promise<string>;
    getBalanceByChain: (chain: Chain, address?: string | undefined) => Promise<Object>;
    getFees: (chain: Chain) => Promise<Fees>;
    assetToBase(amount: any): AssetAmount | Error;
    baseToAsset(amount: BaseAmount): AssetAmount;
    transfer: (chain: Chain, transferObj: Transfer) => Promise<TxHash>;
}
export {};
