import exchangeratesapi, {
  IExchangeratesapiOldHistoryParams,
  IExchangeratesapiOldParams,
} from "../src/index";

require("dotenv").config();
const API_KEY = process.env.API_KEY ? process.env.API_KEY : "";

const DEFAULT_BASE = "EUR";

/**
 * Constructor
 */
describe("Constructor", (): void => {
  test("should throw error with empty API key.", async (): Promise<void> => {
    expect(() => new exchangeratesapi("")).toThrow();
  });

  test("should not throw error with API key.", async (): Promise<void> => {
    expect(() => new exchangeratesapi(API_KEY)).not.toThrow();
  });
});

/**
 * latest API
 */
describe("latest API", (): void => {
  const api = new exchangeratesapi(API_KEY);
  test("in case of no options", async (): Promise<void> => {
    const response = await api.latest();
    expect(response.base === DEFAULT_BASE);
  });

  test("in case of exists options", async (): Promise<void> => {
    const params: IExchangeratesapiOldParams = {
      base: "USD",
      symbols: "JPY",
    };
    const response = await api.latest(params);
    expect(response.base === DEFAULT_BASE);
  });
});

/**
 * historical API
 */
describe("historical API", (): void => {
  const api = new exchangeratesapi(API_KEY);

  test(`base is '${DEFAULT_BASE}' if not defined`, async (): Promise<void> => {
    const response = await api.historical({});
    expect(response.base === DEFAULT_BASE);
  });

  test("in case of base defined, and symbols included base symbol", async (): Promise<void> => {
    const base = "USD";
    const params: IExchangeratesapiOldParams = {
      date: "2013-12-24",
      base: base,
      symbols: ["JPY", "EUR"],
    };
    const response = await api.historical(params);
    expect(response.base === base);
  });
});

/**
 * history API
 */
describe("history API", (): void => {
  const api = new exchangeratesapi(API_KEY);

  test("in case of minimum options", async (): Promise<void> => {
    const params: IExchangeratesapiOldHistoryParams = {
      start_at: "2012-05-01",
      end_at: "2012-05-03",
    };
    const response = await api.history(params);
    expect(response.base === DEFAULT_BASE);
  });

  test("incase of base and array symbols", async (): Promise<void> => {
    const base = "USD";
    const params: IExchangeratesapiOldHistoryParams = {
      start_at: "2012-05-01",
      end_at: "2012-05-03",
      base: base,
      symbols: ["JPY", "EUR"],
    };
    const response = await api.history(params);
    expect(response.base === base);
  });
});
