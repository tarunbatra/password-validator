var lib = require('./lib');
var config = require('./config');

/**
 * Validates that a number is a valid length (positive number)
 *
 * @private
 * @param {number} num - Number to validate
 */
function _validateLength(num) {
  if (!num || typeof num !== 'number' || num < 0) {
    throw new Error(config.error.length);
  }
}

/**
 * Registers the properties of a password-validation schema object
 *
 * @private
 * @param {string} func - Property name
 * @param {array} args - arguments for the func property
 */
function _register(func, args) {
  // Add property to the schema
  this.properties.push({ method: func, arguments: args });
  return this;
}

/**
 * Creates a password-validator schema
 *
 * @constructor
 */
function PasswordSchema() {
  // Initialize a schema with no properties defined
  this.properties = [];
  return this;
}

/**
 * Method to validate the password against schema
 *
 * @param {string} pwd - password to valdiate
 * @return {boolean} Boolean value indicting the validity
 *           of the password as per schema
 */
PasswordSchema.prototype.validate = function (pwd) {
  // Checks if pwd is invalid
  if (!pwd || typeof pwd !== 'string') {
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
  self.properties.reduce(function (valid, property) {
    // Applies all validations defined in lib one by one
    return lib[property.method].apply(self, property.arguments);
  }, self.valid);

  return this.valid;
};

/**
 * Rule to invert the next applied rules.
 * All the rules applied after 'not' will have opposite effect,
 * until 'has' rule is applied
 */
PasswordSchema.prototype.not = function not() {
  return _register.call(this, 'not', arguments);
};

/**
 * Rule to invert the effects of 'not'
 * Apart from that, 'has' is also used
 * for decoratvie purposes
 */
PasswordSchema.prototype.has = function has() {
  return _register.call(this, 'has', arguments);
};

/**
 * Rule to specify a minimum length of the password
 *
 * @param {number} num - minimum length
 */
PasswordSchema.prototype.isMin = function (num) {
  _validateLength(num);
  return _register.call(this, 'isMin', arguments);
};

/**
 * Rule to specify a maximum length of the password
 *
 * @param {number} num - maximum length
 */
PasswordSchema.prototype.isMax = function (num) {
  _validateLength(num);
  return _register.call(this, 'isMax', arguments);
};

/**
 * Rule to mendate the presense of digits in the password
 */
PasswordSchema.prototype.digits = function digits() {
  return _register.call(this, 'digits', arguments);
};

/**
 * Rule to mendate the presense of letters in the password
 */
PasswordSchema.prototype.letters = function letters() {
  return _register.call(this, 'letters', arguments);
};

/**
 * Rule to mendate the presense of uppercase letters in the password
 */
PasswordSchema.prototype.uppercase = function uppercase() {
  return _register.call(this, 'uppercase', arguments);
};

/**
 * Rule to mendate the presense of lowercase letters in the password
 */
PasswordSchema.prototype.lowercase = function lowercase() {
  return _register.call(this, 'lowercase', arguments);
};

/**
 * Rule to mendate the presense of symbols in the password
 */
PasswordSchema.prototype.symbols = function symbols() {
  return _register.call(this, 'symbols', arguments);
};

/**
 * Rule to mendate the presense of space in the password
 * It can be used along with 'not' to not allow spaces
 * in the password
 */
PasswordSchema.prototype.spaces = function spaces() {
  return _register.call(this, 'spaces', arguments);
};

module.exports = PasswordSchema;
