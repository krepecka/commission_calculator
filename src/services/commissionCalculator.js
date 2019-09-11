const toBaseCurrency = require("../utils/toBaseCurrency");
const roundCommission = require("../utils/roundCommission");

const commissionRates = require("./ratesAndLimits").commission;
const weeklyStore = require("./weeklyTransactionStore");

function calculateCommission(transaction) {
  const operation = transaction.operation,
    userType = transaction.user_type,
    transactionType = transaction.type;
  const amountInBase = toBaseCurrency(operation.amount, operation.currency);

  const { percentage, minFlat, maxFlat, weekLimit } = commissionRates[userType][
    transactionType
  ];

  const weeklyTransactionAmount = weeklyStore.getWeekAmountSoFar(
    transaction.user_id,
    transaction.date,
    transactionType
  );

  weeklyStore.addAmountToWeek(
    transaction.user_id,
    transactionType,
    amountInBase
  );

  const limitAlreadyExceeded = weeklyTransactionAmount > weekLimit;

  // when limit is already exceeded - we treat it as if there was no limit
  const amountAfterFreeLimit = limitAlreadyExceeded
    ? amountInBase
    : weeklyTransactionAmount + amountInBase - weekLimit;

  const commission = roundCommission(amountAfterFreeLimit * (percentage / 100));

  const minCapped = Math.max(commission, minFlat);
  const maxCapped = Math.min(minCapped, maxFlat);

  return maxCapped;
}

module.exports = calculateCommission;
