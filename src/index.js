const logger = require("./services/logger");
const readJson = require("./services/fileReader").readJson;
const ratesAndLimits = require("./services/ratesAndLimits");
const calculateCommission = require("./services/commissionCalculator");

async function main() {
  if (process.argv.length < 3) {
    exitWithError("File path argument is required");
  }

  const fileName = process.argv[2];
  let transactions;

  await ratesAndLimits.fetchLatestRates();

  try {
    transactions = await readJson(fileName);
  } catch (e) {
    exitWithError(e);
  }

  transactions.forEach(transaction => {
    const commission = calculateCommission(transaction);
    logger.out(commission.toFixed(2));
  });
}

function exitWithError(message) {
  logger.error(message);
  process.exit(1);
}

main();
