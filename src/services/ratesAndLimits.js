const axios = require("axios");
const logger = require("./logger");
const { USER_TYPES } = require("../constants/userTypes");
const { TRANS_TYPES } = require("../constants/transactionTypes");
const defaultCommission = require("../constants/defaultCommission");

const baseUrl = "http://private-38e18c-uzduotis.apiary-mock.com/config";

class RatesAndLimits {
  constructor() {
    this._commission = Object.assign({}, defaultCommission);
  }

  get commission() {
    return this._commission;
  }

  fetchLatestRates() {
    const cashIn = axios
      .get(baseUrl + "/cash-in")
      .then(response => this.setCashIn(response.data));

    const cashOutNatural = axios
      .get(baseUrl + "/cash-out/natural")
      .then(response => this.setCashOutNatural(response.data));

    const cashOurJuridical = axios
      .get(baseUrl + "/cash-out/juridical")
      .then(response => this.setCashOutJuridical(response.data));

    const promise = Promise.all([
      cashIn,
      cashOutNatural,
      cashOurJuridical
    ]).catch(error => {
      logger.out(
        `There was an error fetching rates: ${error.message}. Default rates will be used`
      );
    });

    return promise;
  }

  setCashIn(data) {
    const percentage = Number(data.percents);
    const maxFlat = Number(data.max && data.max.amount);

    const naturalUser = this._commission[USER_TYPES.NATURAL][
      TRANS_TYPES.CASH_IN
    ];
    const juridicalUser = this._commission[USER_TYPES.JURIDICAL][
      TRANS_TYPES.CASH_IN
    ];

    if (isNumber(percentage)) {
      naturalUser.percentage = percentage;
      juridicalUser.percentage = percentage;
    }

    if (isNumber(maxFlat)) {
      naturalUser.maxFlat = maxFlat;
      juridicalUser.maxFlat = maxFlat;
    }
  }

  setCashOutNatural(data) {
    const percentage = Number(data.percents);
    const weekLimit = Number(data.week_limit && data.week_limit.amount);

    const naturalUser = this._commission[USER_TYPES.NATURAL][
      TRANS_TYPES.CASH_OUT
    ];

    if (isNumber(percentage)) {
      naturalUser.percentage = percentage;
    }

    if (isNumber(weekLimit)) {
      naturalUser.weekLimit = weekLimit;
    }
  }

  setCashOutJuridical(data) {
    const percentage = Number(data.percents);
    const minFlat = Number(data.min && data.min.amount);

    const juridicalUser = this._commission[USER_TYPES.JURIDICAL][
      TRANS_TYPES.CASH_OUT
    ];

    if (isNumber(percentage)) {
      juridicalUser.percentage = percentage;
    }

    if (isNumber(minFlat)) {
      juridicalUser.minFlat = minFlat;
    }
  }
}

const isNumber = candidate => !isNaN(Number(candidate));

module.exports = new RatesAndLimits();
