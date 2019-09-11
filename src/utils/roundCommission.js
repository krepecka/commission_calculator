function roundCommission(value, precision = 2) {
  const order = Math.pow(10, precision);
  return Number(Math.ceil(value * order) / order);
}

module.exports = roundCommission;
