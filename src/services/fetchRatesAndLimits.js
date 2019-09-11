function fetchRatesAndLimits() {
  return new Promise(r => {
    setTimeout(() => r(), 2000);
  });
}

module.exports = fetchRatesAndLimits;
