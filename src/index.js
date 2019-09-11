const logger = require("./services/logger");
const readJson = require("./services/fileReader").readJson;
const ratesAndLimits = require("./services/ratesAndLimits");

async function main() {
  if (process.argv.length < 3) {
    exitWithError("File path argument is required");
  }

  const fileName = process.argv[2];
  let jsonContent;

  await ratesAndLimits.fetchLatestRates();
  console.log(ratesAndLimits.commission);

  try {
    jsonContent = await readJson(fileName);
    logger.out(jsonContent);
  } catch (e) {
    exitWithError(e);
  }
}

function exitWithError(message) {
  logger.error(message);
  process.exit(1);
}

main();
