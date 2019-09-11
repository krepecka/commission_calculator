const { ratioMap } = require("./currencyRatioMap");

function toBaseCurrency(amountInCurrency, currency) {
  const ratio = ratioMap[currency] || 1;
  return amountInCurrency * ratio;
}

module.exports = toBaseCurrency;
