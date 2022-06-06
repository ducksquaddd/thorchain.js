var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Network } from "@xchainjs/xchain-client";
import { Client as ThorClient } from "@xchainjs/xchain-thorchain";
import { THORChain, assetToBase, baseToAsset, AssetRuneNative, assetAmount, } from "@xchainjs/xchain-util";
var ThorChain = /** @class */ (function () {
    function ThorChain(_a) {
        var _b = _a.network, network = _b === void 0 ? Network.Mainnet : _b, phrase = _a.phrase, chainIds = _a.chainIds;
        this.chain = THORChain;
        this.client = new ThorClient({
            network: network,
            phrase: phrase,
            chainIds: chainIds,
        });
    }
    ThorChain.prototype.getClient = function () {
        return this.client;
    };
    Object.defineProperty(ThorChain.prototype, "getAddress", {
        get: function () {
            return this.client.getAddress();
        },
        enumerable: false,
        configurable: true
    });
    ThorChain.prototype.getBalance = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var bal, assetAmount_1, addy, balance, assetAmount_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!address) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.getBalance(address).catch(function (err) {
                                return "invalid address";
                            })];
                    case 1:
                        bal = _a.sent();
                        if (bal === "invalid address") {
                            return [2 /*return*/, new Error("Invalid address")];
                        }
                        // @ts-ignore
                        if (bal.length === 0) {
                            return [2 /*return*/, {
                                    base: "0",
                                    asset: "0",
                                }];
                        }
                        assetAmount_1 = baseToAsset(bal[0].amount).amount();
                        return [2 /*return*/, {
                                // @ts-ignore
                                base: bal[0].amount.amount().toString(),
                                asset: assetAmount_1.toString(),
                            }];
                    case 2:
                        addy = this.getAddress;
                        return [4 /*yield*/, this.client.getBalance(addy).catch(function (err) {
                                return "invalid address";
                            })];
                    case 3:
                        balance = _a.sent();
                        if (balance === "invalid address") {
                            return [2 /*return*/, new Error("Invalid address")];
                        }
                        if (balance.length === 0) {
                            return [2 /*return*/, {
                                    base: "0",
                                    asset: "0",
                                }];
                        }
                        assetAmount_2 = baseToAsset(balance[0].amount).amount();
                        return [2 /*return*/, {
                                //@ts-ignore
                                base: balance[0].amount.amount().toString(),
                                asset: assetAmount_2.toString(),
                            }];
                }
            });
        });
    };
    ThorChain.prototype.assetToBase = function (amount) {
        if (isNaN(amount)) {
            return new Error("Amount is not a number");
        }
        // @ts-ignore
        return assetToBase(assetAmount(amount, 8));
    };
    ThorChain.prototype.baseToAsset = function (amount) {
        return baseToAsset(amount);
    };
    ThorChain.prototype.transfer = function (baseAmount, receiver, memo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!memo) {
                            memo = "";
                        }
                        return [4 /*yield*/, this.client.transfer({
                                // @ts-ignore
                                amount: baseAmount,
                                recipient: receiver,
                                memo: memo,
                                asset: AssetRuneNative,
                                walletIndex: 0,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ThorChain;
}());
export { ThorChain };
//# sourceMappingURL=thorchain.js.map