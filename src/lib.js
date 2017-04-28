/**
 * Generic method to test regex
 *
 * @private
 * @param {string} regex - regex to test
 *                           with password
 */
var regex = require('./constants').regex;

function _process(regexp) {
  return new RegExp(regexp).test(this.password) === this.positive;
}

module.exports = {

  /**
   * Method to invert the next validations
   *
   * @param {RegExp} [symbol] - custom Regex which should not be present
   */
  not: function not(symbol) {
    this.positive = false;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },

  /**
   * Method to invert the effects of not()
   *
   * @param {RegExp} [symbol] - custom Regex which should be present
   */
  has: function has(symbol) {
    this.positive = true;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },

  /**
   * Method to specify a minimum length
   *
   * @param {number} num - minimum length
   */
  isMin: function isMin(num) {
    return this.password.length >= num;
  },

  /**
   * Method to specify a maximum length
   *
   * @param {number} num - maximum length
   */
  isMax: function isMax(num) {
    return this.password.length <= num;
  },

  /**
   * Method to validate the presense of digits
   */
  digits: function digits() {
    return _process.call(this, regex.digits);
  },

  /**
   * Method to validate the presense of letters
   */
  letters: function letters() {
    return _process.call(this, regex.letters);
  },

  /**
   * Method to validate the presense of uppercase letters
   */
  uppercase: function uppercase() {
    return _process.call(this, regex.uppercase);
  },

  /**
   * Method to validate the presense of lowercase letters
   */
  lowercase: function lowercase() {
    return _process.call(this, regex.lowercase);
  },

  /**
   * Method to validate the presense of symbols
   */
  symbols: function symbols() {
    return _process.call(this, regex.symbols);
  },

  /**
   * Method to validate the presense of space
   */
  spaces: function spaces() {
    return _process.call(this, regex.spaces);
  }
};
