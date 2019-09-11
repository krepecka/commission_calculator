const { TRANS_TYPES } = require("./transactionTypes");
const { USER_TYPES } = require("./userTypes");

const { CASH_IN, CASH_OUT } = TRANS_TYPES;

const defaultCommission = {
  [USER_TYPES.NATURAL]: {
    [CASH_IN]: {
      minFlat: 0,
      maxFlat: 3,
      percentage: 0.03,
      weekLimit: 0
    },
    [CASH_OUT]: {
      minFlat: 0,
      maxFlat: Infinity,
      percentage: 0.3,
      weekLimit: 800
    }
  },
  [USER_TYPES.JURIDICAL]: {
    [CASH_IN]: {
      minFlat: 0,
      maxFlat: 4,
      percentage: 0.03,
      weekLimit: 0
    },
    [CASH_OUT]: {
      minFlat: 0.5,
      maxFlat: Infinity,
      percentage: 0.3,
      weekLimit: 0
    }
  }
};

module.exports = defaultCommission;
