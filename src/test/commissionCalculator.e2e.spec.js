const { expect } = require("chai");
const calculator = require("../services/commissionCalculator");

describe("commissionCalculator", () => {
  it("should treat monday and sunday as the same week", () => {
    const transactions = [
      {
        date: "2019-09-09",
        user_id: 1,
        user_type: "natural",
        type: "cash_out",
        operation: { amount: 800.0, currency: "EUR" }
      },
      {
        date: "2019-09-15",
        user_id: 1,
        user_type: "natural",
        type: "cash_out",
        operation: { amount: 1000.0, currency: "EUR" }
      }
    ];

    const expectedResult = [0, (1000 * 0.3) / 100];

    transactions.forEach((tran, index) => {
      const commission = calculator(tran);

      expect(commission).to.equal(expectedResult[index]);
    });
  });
});
