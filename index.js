var _ = require('underscore');
var internals = require('./internals');
var config = require('./config');

/**
 * Validates that a number is a valid length (positive number)
 *
 * @params: {number} num - Number to validate
 */
_validateLength = function(num) {
  if(!num || typeof num != 'number' || num < 0) {
    throw new Error(config.error.length);
  }
};

/**
 * Registers the properties of a password-validation schema object
 *
 * @params: {string} func - Property name
 * @params: {array} args - arguments for the func property
 */
var _register = function(func, args) {
  // Add property to the schema
  this.properties.push({ method: func, arguments: args });
  return this;
};

/**
 * Constructor to create a password-validator object
 */
var Schema = function() {
  // Initialize a schema with no properties defined
  this.properties = [];
  return this;
};

/**
 * Method to validate the password against schema
 *
 * @params: {string} pwd - password to valdiate
 */
Schema.prototype.validate = function(pwd) {
  // Checks if pwd is invalid
  if(!pwd || typeof pwd != 'string') {
    throw new Error(config.error.password);
  }

  // Sets password string
  this.password = pwd;

  // Sets that no inversion takes place by default
  this.positive = true;

  // A password without any validation check is valid by default
  this.valid = true;

  var self = this;

  // Sets valid property after applying all validations
  _.reduce(self.properties, function(valid, property) {
    // Applies all validations defined in internals one by one
    return internals[property.method].apply(self, property.arguments);
  }, self.valid);

  return this.valid;
};

/**
 * Method to invert the next validations
 */
Schema.prototype.not = function() {
  return _register.call(this, 'not', arguments);
};

/**
 * Method to invert the effects of not()
 */
Schema.prototype.has = function() {
  return _register.call(this, 'has', arguments);
};

/**
 * Method to specify a minimum length
 *
 * @params: num - minimum length
 */
Schema.prototype.isMin = function(num) {
  _validateLength(num);
  return _register.call(this, 'isMin', arguments);
};

/**
 * Method to specify a maximum length
 *
 * @params: num - maximum length
 */
Schema.prototype.isMax = function(num) {
  _validateLength(num);
  return _register.call(this, 'isMax', arguments);
}

/**
 * Method to validate the presense of digits
 */
Schema.prototype.digits = function() {
  return _register.call(this, 'digits', arguments);
};

/**
 * Method to validate the presense of letters
 */
Schema.prototype.letters = function() {
 return _register.call(this, 'letters', arguments);
};

/**
 * Method to validate the presense of uppercase letters
 */
Schema.prototype.uppercase = function() {
  return _register.call(this, 'uppercase', arguments);
};

/**
 * Method to validate the presense of lowercase letters
 */
Schema.prototype.lowercase = function() {
  return _register.call(this, 'lowercase', arguments);
};

/**
 * Method to validate the presense of symbols
 */
Schema.prototype.symbols = function() {
  return _register.call(this, 'symbols', arguments);
};

/**
 * Method to validate the presense of space
 */
Schema.prototype.spaces = function() {
return _register.call(this, 'spaces', arguments);
};

module.exports = Schema;
