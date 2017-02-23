/**
 * Generic method to test regex
 *
 * @private
 * @param {string} regex - regex to test
 *                           with password
 */

function _process(regex) {
  if (this.valid) {
    this.valid = new RegExp(regex).test(this.password) === this.positive;
  }
  return this;
}

module.exports = {

  /**
   * Method to invert the next validations
   */
  not: function not() {
    this.positive = false;
    return this;
  },

  /**
   * Method to invert the effects of not()
   *
   * @param {RegExp} symbol - characters which should not be present
   */
  has: function has(symbol) {
    this.positive = true;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return this;
  },

  /**
   * Method to specify a minimum length
   *
   * @param {number} num - minimum length
   */
  isMin: function isMin(num) {
    if (this.valid) {
      this.valid = this.password.length >= num;
    }
    return this;
  },

  /**
   * Method to specify a maximum length
   *
   * @param {number} num - maximum length
   */
  isMax: function isMax(num) {
    if (this.valid) {
      this.valid = this.password.length <= num;
    }
    return this;
  },

  /**
   * Method to validate the presense of digits
   */
  digits: function digits() {
    return _process.call(this, /\d+/);
  },

  /**
   * Method to validate the presense of letters
   */
  letters: function letters() {
    return _process.call(this, /[a-zA-Z]+/);
  },

  /**
   * Method to validate the presense of uppercase letters
   */
  uppercase: function uppercase() {
    return _process.call(this, /[A-Z]+/);
  },

  /**
   * Method to validate the presense of lowercase letters
   */
  lowercase: function lowercase() {
    return _process.call(this, /[a-z]+/);
  },

  /**
   * Method to validate the presense of symbols
   */
  symbols: function symbols() {
    return _process.call(this, /[`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\\|;:'",<.>\/\?]+/);
  },

  /**
   * Method to validate the presense of space
   */
  spaces: function spaces() {
    return _process.call(this, /[\s]+/);
  }
};
