import exchangeratesapi, {
  IExchangeratesapiParams,
  IExchangeratesapiRates,
  IExchangeratesapiTimeseriesParams,
  IExchangeratesapiTimeseriesRates,
} from "@ittkm/exchangeratesapi";

let api: exchangeratesapi;

export type IExchangeratesapiOldParams = IExchangeratesapiParams;

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

export class exchangeratesapiWrapper {
  constructor(ACCESS_KEY: string) {
    if (!ACCESS_KEY) {
      throw new Error(
        "You have not supplied an API Access Key. Please get your API Access Key at https://exchangeratesapi.io/"
      );
    }
    api = new exchangeratesapi(ACCESS_KEY);
  }

  public async latest(
    params?: IExchangeratesapiOldParams
  ): Promise<IExchangeratesapiOldResponse> {
    return await this.historical({
      date: "latest",
      base: params ? params.base : undefined,
      symbols: params ? params.symbols : undefined,
    });
  }

  public async historical(
    params: IExchangeratesapiOldParams
  ): Promise<IExchangeratesapiOldResponse> {
    const response = await api.historical(params);
    return {
      base: response.base,
      date: response.date,
      rates: response.rates,
    };
  }

  public async history(
    params: IExchangeratesapiOldHistoryParams
  ): Promise<IExchangeratesapiOldHistoryResponse> {
    const requestParam: IExchangeratesapiTimeseriesParams = {
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

export default exchangeratesapiWrapper;
