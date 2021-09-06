# Free wrapper for old API of exchangeratesapi.io

[![npm version](https://img.shields.io/npm/v/@ittkm/exchangeratesapi-wrapper.svg)](https://www.npmjs.com/package/@ittkm/exchangeratesapi-wrapper)
[![npm downloads](https://img.shields.io/npm/dt/@ittkm/exchangeratesapi-wrapper)](https://www.npmjs.com/package/@ittkm/exchangeratesapi-wrapper)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](./LICENSE)
[![Build Status](https://travis-ci.com/itTkm/exchangeratesapi-wrapper.svg?branch=main)](https://travis-ci.com/itTkm/exchangeratesapi-wrapper)
[![Coverage Status](https://coveralls.io/repos/github/itTkm/exchangeratesapi-wrapper/badge.svg?branch=main)](https://coveralls.io/github/itTkm/exchangeratesapi-wrapper?branch=main)

This is a wrapper that is compatible with the old API of the [Exchangerates API](https://exchangeratesapi.io/).

Exchangerates API ( https://exchangeratesapi.io/ ) became a registration system from April 2021, and the following functions can not be used without a paid subscription.

- Source Currency Switching
- Currency Conversion
- Time-Frame Queries

In addition, the API specifications and responses have changed in the new API.

With this package, you can get a response that is compatible with the old API.

If you want to get the same response as the paid features above using the new free API key, use [@ittkm/exchangeratesapi](https://www.npmjs.com/package/@ittkm/exchangeratesapi).

## Installation

```bash
# via npm
npm install --save @ittkm/exchangeratesapi-wrapper

# via yarn
yarn add @ittkm/exchangeratesapi-wrapper
```

## Usage

```js
import exchangeratesapi from "@ittkm/exchangeratesapi-wrapper";
// // or
// const exchangeratesapi = require("@ittkm/exchangeratesapi-wrapper").default;

// Please get your API Access Key at https://exchangeratesapi.io/
// and then replace here
const API_KEY = "1234567890abcdefghijklmnopqrstuv";

async function exchangeratesapiWrapperSamples() {
  // Initialize with your API Key
  const api = new exchangeratesapi(API_KEY);

  // Call the API you want to run
  const exchangeRates = await api.latest();
  console.dir(exchangeRates);
}
```

## Sample calls

Here are some examples:

```js
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
```

## Response

The format of the response is compatible with the old Exchangerates API.

See the [archived documentation](https://web.archive.org/web/20210328014153/https://exchangeratesapi.io/) for details.

## Examples

After having cloned this repository, run the following commands:

```bash
# Please define your API Access Key on the '.env' file
cp .env.example .env
vi .env

# Initialize the example project
cd example/ && npm install

# Excecute example
npm run import-sample
# # or
# npm run require-sample
```

## License

This library is licensed under the [MIT License](./LICENSE).
