/**
 * Generic method to test regex
 *
 * @params: {string} regex - regex to test
 *                           with password
 */

var _process = function(regex) {
  if (this.valid) {
    this.valid = new RegExp(regex).test(this.password) == this.positive;
  }
  return this;
};

module.exports = {

  /**
   * Method to invert the next validations
   */
  not: function() {
    this.positive = false;
    return this;
  },

  /**
   * Method to invert the effects of not()
   *
   * @params: symbol - characters which should not be present
   */
  has: function(symbol) {
    this.positive = true;
    if(symbol) {
      return _process.call(this, symbol);
    }
    return this;
  },

  /**
   * Method to specify a minimum length
   *
   * @params: num - minimum length
   */
  isMin: function(num) {
    if(this.valid) {
      this.valid = this.password.length >= num;
    }
    return this;
  },

  /**
   * Method to specify a maximum length
   *
   * @params: num - maximum length
   */
  isMax: function(num) {
    if(this.valid) {
      this.valid = this.password.length <= num;
    }
    return this;
  },

  /**
   * Method to validate the presense of digits
   */
  digits: function() {
    return _process.call(this, /\d+/);
  },

  /**
   * Method to validate the presense of letters
   */
  letters: function() {
    return _process.call(this, /[a-zA-Z]+/);
  },

  /**
   * Method to validate the presense of uppercase letters
   */
  uppercase: function() {
    return _process.call(this, /[A-Z]+/);
  },

  /**
   * Method to validate the presense of lowercase letters
   */
  lowercase: function() {
    return _process.call(this, /[a-z]+/);
  },

  /**
   * Method to validate the presense of symbols
   */
  symbols: function() {
    return _process.call(this, /[`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\\|;:'",<.>\/\?]+/);
  },

  /**
   * Method to validate the presense of space
   */
  spaces: function() {
    return _process.call(this, /[\s]+/);
  }
};
