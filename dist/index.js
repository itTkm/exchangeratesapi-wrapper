"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeratesapiWrapper = void 0;
const exchangeratesapi_1 = require("@ittkm/exchangeratesapi");
let api;
class exchangeratesapiWrapper {
    constructor(ACCESS_KEY) {
        if (!ACCESS_KEY) {
            throw new Error("You have not supplied an API Access Key. Please get your API Access Key at https://exchangeratesapi.io/");
        }
        api = new exchangeratesapi_1.default(ACCESS_KEY);
    }
    async latest(params) {
        return await this.historical({
            date: "latest",
            base: params ? params.base : undefined,
            symbols: params ? params.symbols : undefined,
        });
    }
    async historical(params) {
        const response = await api.historical(params);
        return {
            base: response.base,
            date: response.date,
            rates: response.rates,
        };
    }
    async history(params) {
        const requestParam = {
            start_date: params.start_at,
            end_date: params.end_at,
            base: params.base,
            symbols: params.symbols,
        };
        const response = await api.timeseries(requestParam);
        return {
            base: response.base,
            rates: response.rates,
        };
    }
}
exports.exchangeratesapiWrapper = exchangeratesapiWrapper;
exports.default = exchangeratesapiWrapper;
