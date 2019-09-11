const moment = require("moment");

class WeeklyTransactionStore {
  constructor() {
    this._userWeeklyAmount = {};
    this._date = {
      year: 1900,
      week: 0
    };
  }

  getWeekAmountSoFar(userId, transactionDate, operation) {
    if (this._isNewWeek(transactionDate)) {
      this._reset();
    }

    const user = this._userWeeklyAmount[userId] || {};
    const currentAmount = user[operation] || 0;

    return currentAmount;
  }

  addAmountToWeek(userId, operation, transactionAmount) {
    let user = this._userWeeklyAmount[userId] || {};

    const currentAmount = user[operation] || 0;
    user[operation] = currentAmount + transactionAmount;
    this._userWeeklyAmount[userId] = user;
  }

  _reset() {
    this._userWeeklyAmount = {};
  }

  _isNewWeek(date) {
    const transactionDate = moment(date);

    const week = transactionDate.isoWeek();
    const year = transactionDate.year();

    if (year !== this._date.year || week !== this._date.week) {
      this._date = {
        year: year,
        week: week
      };

      return true;
    }

    return false;
  }
}

module.exports = new WeeklyTransactionStore();
