const exchangeratesapi = require("@ittkm/exchangeratesapi-wrapper").default;

require("dotenv").config();
const API_KEY = process.env.API_KEY ? process.env.API_KEY : "";

exchangeratesapiWrapperSamples();

async function exchangeratesapiWrapperSamples() {
  // Initialize with your API Key
  const api = new exchangeratesapi(API_KEY);

  /**
   * Latest Rates (with default settings)
   *  - Source Currency: EUR
   *  - Symbols: All symbols
   *  - Compatible:
   *    GET https://api.exchangeratesapi.io/latest
   */
  console.dir(await api.latest());

  /**
   * Latest Rates (with Parameters)
   *  - Source Currency: USD
   *  - Symbols: GBP, JPY, EUR
   *  - Compatible:
   *    GET https://api.exchangeratesapi.io/latest?base=USD&symbols=GBP,JPY,EUR
   */
  const latestParameters = {
    base: "USD",
    symbols: ["GBP", "JPY", "EUR"],
  };
  console.dir(await api.latest(latestParameters));

  /**
   * Historical Rates
   *  - Date: 2013-12-24
   *  - Source Currency: GBP
   *  - Symbols: USD, CAD, EUR
   *  - Compatible:
   *    GET https://api.exchangeratesapi.io/2013-12-24?base=GBP&symbols=USD,CAD,EUR
   */
  const historicalParameters = {
    date: "2013-12-24",
    base: "GBP",
    symbols: ["USD", "CAD", "EUR"],
  };
  console.dir(await api.historical(historicalParameters));

  /**
   * Time-Series (with minimum options)
   *  - Symbols: All symbols
   *  - Compatible:
   *    GET https://api.exchangeratesapi.io/history?start_at=2012-05-01&end_at=2012-05-03
   */
  console.dir(
    await api.history({
      start_at: "2012-05-01",
      end_at: "2012-05-03",
    })
  );

  /**
   * Time-Series (with limit currencies)
   *  - Source Currency: EUR
   *  - Symbols: USD, AUD, CAD
   *  - Compatible:
   *    GET https://api.exchangeratesapi.io/history?start_at=2012-05-01&end_at=2012-05-03&base=EUR&symbols=USD,AUD,CAD
   */
  const timeseriesParameters = {
    start_at: "2012-05-01",
    end_at: "2012-05-03",
    base: "EUR",
    symbols: ["USD", "AUD", "CAD"],
  };
  console.dir(await api.history(timeseriesParameters));
}
