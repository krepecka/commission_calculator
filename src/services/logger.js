function logError(message) {
  console.log(`Error: ${message}`);
}

function log(message) {
  console.log(message);
}

module.exports = {
  error: logError,
  out: log
};
