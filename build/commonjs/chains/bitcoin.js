"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bitcoin = void 0;
var xchain_client_1 = require("@xchainjs/xchain-client");
var xchain_bitcoin_1 = require("@xchainjs/xchain-bitcoin");
var xchain_util_1 = require("@xchainjs/xchain-util");
var Bitcoin = /** @class */ (function () {
    function Bitcoin(_a) {
        var _b = _a.network, network = _b === void 0 ? xchain_client_1.Network.Mainnet : _b, phrase = _a.phrase;
        this.chain = xchain_util_1.BTCChain;
        this.client = new xchain_bitcoin_1.Client({
            network: network,
            phrase: phrase,
        });
    }
    Bitcoin.prototype.getClient = function () {
        return this.client;
    };
    Object.defineProperty(Bitcoin.prototype, "getAddress", {
        get: function () {
            return this.client.getAddress();
        },
        enumerable: false,
        configurable: true
    });
    Bitcoin.prototype.getBalance = function (address) {
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
                        assetAmount_1 = (0, xchain_util_1.baseToAsset)(bal[0].amount).amount();
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
                        assetAmount_2 = (0, xchain_util_1.baseToAsset)(balance[0].amount).amount();
                        return [2 /*return*/, {
                                // @ts-ignore
                                base: balance[0].amount.amount().toString(),
                                asset: assetAmount_2.toString(),
                            }];
                }
            });
        });
    };
    Bitcoin.prototype.assetToBase = function (amount) {
        if (isNaN(amount)) {
            return new Error("Amount is not a number");
        }
        // @ts-ignore
        return (0, xchain_util_1.assetToBase)((0, xchain_util_1.assetAmount)(amount, 8));
    };
    Bitcoin.prototype.baseToAsset = function (amount) {
        return (0, xchain_util_1.baseToAsset)(amount);
    };
    Bitcoin.prototype.transfer = function (baseAmount, receiver, memo) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, fast, fastest, average, txid;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!memo) {
                            memo = "";
                        }
                        return [4 /*yield*/, this.client.getFeeRates()];
                    case 1:
                        _a = _b.sent(), fast = _a.fast, fastest = _a.fastest, average = _a.average;
                        return [4 /*yield*/, this.client.transfer({
                                asset: xchain_util_1.AssetBTC,
                                recipient: receiver,
                                amount: baseAmount,
                                memo: memo,
                                feeRate: fast,
                            })];
                    case 2:
                        txid = _b.sent();
                        return [2 /*return*/, txid];
                }
            });
        });
    };
    return Bitcoin;
}());
exports.Bitcoin = Bitcoin;
//# sourceMappingURL=bitcoin.js.map