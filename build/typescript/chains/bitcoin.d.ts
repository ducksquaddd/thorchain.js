import { TxHash, Network } from "@xchainjs/xchain-client";
import { Client as BitClient } from "@xchainjs/xchain-bitcoin";
import { Chain, AssetAmount } from "@xchainjs/xchain-util";
export interface IBitcoin {
    getClient(): BitClient;
}
export declare class Bitcoin implements IBitcoin {
    chain: Chain;
    client: BitClient;
    constructor({ network, phrase, }: {
        network?: Network;
        phrase: string;
    });
    getClient(): BitClient;
    get getAddress(): string;
    getBalance(address?: string): Promise<Error | {
        base: any;
        asset: string;
    }>;
    assetToBase(amount: any): AssetAmount | Error;
    baseToAsset(amount: any): AssetAmount;
    transfer(baseAmount: any, receiver: string, memo?: string): Promise<TxHash>;
}
