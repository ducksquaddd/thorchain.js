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
import { Network, } from "@xchainjs/xchain-client";
import { BTCChain, THORChain, baseToAsset, assetToBase, assetAmount, } from "@xchainjs/xchain-util";
import { Chains } from "./types";
/* All chains */
import { ThorChain } from "../chains/thorchain";
import { Bitcoin } from "../chains/bitcoin";
var client = /** @class */ (function () {
    function client(_a) {
        var _b = _a.network, network = _b === void 0 ? Network.Mainnet : _b, _c = _a.phrase, phrase = _c === void 0 ? "" : _c;
        var _this = this;
        this.chains = Chains;
        this.getChainClient = function (chain) {
            if (chain === THORChain)
                return _this.thor;
            if (chain === BTCChain)
                return _this.btc;
            // if (chain === BCHChain) return this.bch
            return null;
        };
        this.getAddressByChain = function (chain) { return __awaiter(_this, void 0, void 0, function () {
            var chainClient, wallet;
            return __generator(this, function (_a) {
                chainClient = this.getChainClient(chain);
                if (!chainClient)
                    throw new Error("invalid chain");
                try {
                    wallet = chainClient.getAddress;
                    return [2 /*return*/, wallet];
                }
                catch (error) {
                    return [2 /*return*/, Promise.reject(error)];
                }
                return [2 /*return*/];
            });
        }); };
        this.getBalanceByChain = function (chain, address) { return __awaiter(_this, void 0, void 0, function () {
            var chainClient, balance, balance, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chainClient = this.getChainClient(chain);
                        if (!chainClient)
                            throw new Error("invalid chain");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        if (!address) return [3 /*break*/, 3];
                        return [4 /*yield*/, chainClient.getBalance(address)];
                    case 2:
                        balance = _a.sent();
                        return [2 /*return*/, balance];
                    case 3: return [4 /*yield*/, chainClient.getBalance()];
                    case 4:
                        balance = _a.sent();
                        return [2 /*return*/, balance];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.getFees = function (chain) {
            var chainClient = _this.getChainClient(chain);
            if (!chainClient)
                throw new Error("invalid chain");
            return chainClient.getClient().getFees();
        };
        this.transfer = function (chain, transferObj) { return __awaiter(_this, void 0, void 0, function () {
            var chainClient, tx, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        chainClient = this.getChainClient(chain);
                        if (!chainClient)
                            throw new Error("invalid chain");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, chainClient.transfer(transferObj.amount, transferObj.recipient, transferObj.memo)];
                    case 2:
                        tx = _a.sent();
                        return [2 /*return*/, tx];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_2)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.network = network;
        this.phrase = phrase;
        // create chain clients
        this.thor = new ThorChain({
            network: network,
            phrase: phrase,
            chainIds: {
                testnet: "thorchain-testnet-v2",
                stagenet: "thorchain-stagenet-v2",
                mainnet: "thorchain-mainnet-v1",
            },
        });
        this.btc = new Bitcoin({ network: network, phrase: phrase });
        // this.bch = new BchChain({ network, phrase })
    }
    client.prototype.assetToBase = function (amount) {
        if (isNaN(amount)) {
            return new Error("Amount is not a number");
        }
        // @ts-ignore
        return assetToBase(assetAmount(amount, 8));
    };
    client.prototype.baseToAsset = function (amount) {
        return baseToAsset(amount);
    };
    return client;
}());
export { client };
//# sourceMappingURL=sdk.js.map