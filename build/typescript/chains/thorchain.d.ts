import { TxHash, Network } from "@xchainjs/xchain-client";
import { Client as ThorClient, ChainIds } from "@xchainjs/xchain-thorchain";
import { Chain, AssetAmount } from "@xchainjs/xchain-util";
export interface IThorChain {
    getClient(): ThorClient;
}
export declare class ThorChain implements IThorChain {
    chain: Chain;
    client: ThorClient;
    constructor({ network, phrase, chainIds, }: {
        network?: Network;
        phrase: string;
        chainIds: ChainIds;
    });
    getClient(): ThorClient;
    get getAddress(): string;
    getBalance(address?: string): Promise<Error | {
        base: any;
        asset: string;
    }>;
    assetToBase(amount: any): AssetAmount | Error;
    baseToAsset(amount: any): AssetAmount;
    transfer(baseAmount: string, receiver: string, memo?: string): Promise<TxHash>;
}
