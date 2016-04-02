var _ = require('underscore');

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

/**
 * Constructor to create a password-validator object
 *
 * @params: {string} pwd - password to validate
 */
var Schema = function(pwd) {
  this.password = pwd;
  this.valid = true;
  this.positive = true;
  return this;
};

/**
 * Method to validate the password against schema
 */
Schema.prototype.validate = function() {
  return this.valid;
};

/**
 * Method to invert the next validations
 */
Schema.prototype.not = function() {
  this.positive = false;
  return this;
};

/**
 * Method to invert the effects of not()
 */
Schema.prototype.has = function(symbol) {
  this.positive = true;
  if(symbol) {
    return _process.call(this, symbol);
  }
  return this;
};

/**
 * Method to specify a minimum length
 *
 * @params: num - minimum length
 */
Schema.prototype.isMin = function(num) {
  if(this.valid) {
    this.valid = this.password.length >= num;
  }
  return this;
};

/**
 * Method to specify a maximum length
 *
 * @params: num - maximum length
 */
Schema.prototype.isMax = function(num) {
  if(this.valid) {
    this.valid = this.password.length <= num;
  }
  return this;
}

/**
 * Method to validate the presense of digits
 */
Schema.prototype.digits = function() {
  return _process.call(this, /\d+/);
};

/**
 * Method to validate the presense of letters
 */
Schema.prototype.letters = function() {
  return _process.call(this, /[a-zA-Z]+/);
};

/**
 * Method to validate the presense of uppercase letters
 */
Schema.prototype.uppercase = function() {
  return _process.call(this, /[A-Z]+/);
};

/**
 * Method to validate the presense of lowercase letters
 */
Schema.prototype.lowercase = function() {
  return _process.call(this, /[a-z]+/);
};

/**
 * Method to validate the presense of symbols
 */
Schema.prototype.symbols = function() {
  return _process.call(this, /[`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\\|;:'",<.>\/\?]+/);
};

/**
 * Method to validate the presense of space
 */
Schema.prototype.space = function() {
  return _process.call(this, /[\s]+/);
};

module.exports = Schema;
