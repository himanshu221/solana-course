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
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
function getBalance(account) {
    return __awaiter(this, void 0, void 0, function* () {
        let pbKey;
        try {
            pbKey = new web3_js_1.PublicKey(account);
        }
        catch (e) {
            console.error(e.message);
            return;
        }
        const connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com", "confirmed");
        const balance = yield connection.getBalance(pbKey);
        console.log(`Account balance for ${pbKey} : ${balance / web3_js_1.LAMPORTS_PER_SOL}`);
    });
}
getBalance("gacMrsrxNisAhCfgsUAVbwmTC3w9nJB6NychLAnTQFv");
