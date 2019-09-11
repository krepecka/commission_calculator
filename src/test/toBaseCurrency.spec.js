const { expect } = require("chai");
const sinon = require("sinon");
const toBaseCurrency = require("../utils/toBaseCurrency");

const currencyRatioMap = require("../utils/currencyRatioMap");

describe("inBaseCurrency", () => {
  it("should threat EUR as base", () => {
    expect(toBaseCurrency(100, "EUR")).to.equal(100);
  });

  xit("should take into account currencyRatioMap", () => {
    const amountUSD = 100;
    sinon.stub(currencyRatioMap, "ratioMap").returns({ EUR: 1, USD: 0.1 });

    const usdToEur = toBaseCurrency(amountUSD, "USD");
    expect(usdToEur).to.equal(10);
  });
});
