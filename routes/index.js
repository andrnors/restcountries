var express = require("express");
var router = express.Router();

/**
 * Returns a list of countries in provided region
 * sorted (Ascending - Descending) on Name and Currency
 * @param region
 * @return {name, currency} List of object
 */
router.get("/region/:region", async function (req, res, next) {
  const { region } = req.params;

  const result = await fetchData(
    `/region/${region}?fields=name,currencies`,
    next
  );

  if (result?.status > 200) {
    return res.status(result.status).send(result.message);
  }

  const data = result
    ?.map((country) => {
      const currency = Object.keys(country.currencies).map(
        (currencyCode) => currencyCode
      )[0]; // assuming we just need one currency per country

      return {
        name: country.name.common,
        currency,
      };
    })
    .sort(
      (c1, c2) =>
        c1.name.localeCompare(c2.name, "no") ||
        c1.currency.localeCompare(c2.currency, "no")
    );
  return res.status(200).json(data);
});

/**
 * Returns a list of world currencies with countries
 * using the given currency
 * @return {
 *  currency, countries
 * }
 */
router.get("/all", async function (req, res, next) {
  const data = await fetchData("/all?fields=currencies,name");

  const currenciesMap = {};
  data.forEach((country) => {
    const currencyCode = Object.keys(country.currencies).map(
      (currencyCode) => currencyCode
    )[0];

    if (currenciesMap[currencyCode]) {
      currenciesMap[currencyCode].push(country.name.common);
    } else {
      currenciesMap[currencyCode] = [country.name.common];
    }
  });

  const response = Object.entries(currenciesMap).map(
    ([currency, countries]) => ({
      currency,
      countries,
    })
  );

  res.json(response);
});

module.exports = router;

async function fetchData(path) {
  const baseUrl = "https://restcountries.com/v3.1";
  const response = await fetch(`${baseUrl}${path}`);
  return response.json();
}
