import { IExchangeratesapiParams, IExchangeratesapiRates, IExchangeratesapiTimeseriesRates } from "@ittkm/exchangeratesapi";
export declare type IExchangeratesapiOldParams = IExchangeratesapiParams;
export interface IExchangeratesapiOldResponse {
    base: string;
    date: string;
    rates: IExchangeratesapiRates;
}
export interface IExchangeratesapiOldHistoryParams {
    start_at: string;
    end_at: string;
    base?: string;
    symbols?: string | string[];
}
export interface IExchangeratesapiOldHistoryResponse {
    base: string;
    rates: IExchangeratesapiTimeseriesRates;
}
export declare class exchangeratesapiWrapper {
    constructor(ACCESS_KEY: string);
    latest(params?: IExchangeratesapiOldParams): Promise<IExchangeratesapiOldResponse>;
    historical(params: IExchangeratesapiOldParams): Promise<IExchangeratesapiOldResponse>;
    history(params: IExchangeratesapiOldHistoryParams): Promise<IExchangeratesapiOldHistoryResponse>;
}
export default exchangeratesapiWrapper;
