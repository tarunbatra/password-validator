var lib = require('./lib');
var error = require('./constants').error;

/**
 * Validates that a number is a valid length (positive number)
 *
 * @private
 * @param {number} num - Number to validate
 */
function _validateLength(num) {
  if (!num || typeof num !== 'number' || num < 0) {
    throw new Error(error.length);
  }
}

/**
 * Tests a validation and return the result
 *
 * @private
 * @param {string} property - Property to validate
 * @return {boolean} Boolean value indicting the validity
 *           of the password against the property
 */
function _isPasswordValidFor(property) {
  return lib[property.method].apply(this, property.arguments);
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
function PasswordValidator() {
  // Initialize a schema with no properties defined
  this.properties = [];
}

/**
 * Method to validate the password against schema
 *
 * @param {string} pwd - password to valdiate
 * @param {object} options - optional options to configure validation
 * @param {boolean} [options.list] - asks for a list of validation
 *           failures instead of just true/false
 * @return {boolean|array} Boolean value indicting the validity
 *           of the password as per schema, if 'options.list'
 *           is not set. Otherwise, it returns an array of
 *           property names which failed validations
 */
PasswordValidator.prototype.validate = function (pwd, options) {
  // Checks if pwd is invalid
  if (typeof pwd !== 'string') {
    throw new Error(error.password);
  }

  // Sets password string
  this.password = pwd;

  // Sets that no inversion takes place by default
  this.positive = true;

  var _this = this;

  if (options && options.list === true) {
    return this.properties.reduce(function (errorList, property) {
      // Applies all validations defined in lib one by one
      if (!_isPasswordValidFor.call(_this, property)) {
        // If the validation for a property fails,
        // add it to the error list
        return errorList.concat(property.method);
      }
      return errorList;
    }, []);
  }

  // Returns the result of the validations
  return this.properties.every(function (property) {
    // Applies all validations defined in lib one by one
    return _isPasswordValidFor.call(_this, property);
  });
};

/**
 * Rule to invert the next applied rules.
 * All the rules applied after 'not' will have opposite effect,
 * until 'has' rule is applied
 */
PasswordValidator.prototype.not = function not() {
  return _register.call(this, 'not', arguments);
};

/**
 * Rule to invert the effects of 'not'
 * Apart from that, 'has' is also used
 * to make the api readable and chainable
 */
PasswordValidator.prototype.has = function has() {
  return _register.call(this, 'has', arguments);
};

/**
 * Rule to invert the effects of 'not'
 * Apart from that, 'is' is also used
 * to make the api readable and chainable
 */
PasswordValidator.prototype.is = function is() {
  return _register.call(this, 'is', arguments);
};

/**
 * Rule to specify a minimum length of the password
 *
 * @param {number} num - minimum length
 */
PasswordValidator.prototype.min = function min(num) {
  _validateLength(num);
  return _register.call(this, 'min', arguments);
};

/**
 * Rule to specify a maximum length of the password
 *
 * @param {number} num - maximum length
 */
PasswordValidator.prototype.max = function max(num) {
  _validateLength(num);
  return _register.call(this, 'max', arguments);
};

/**
 * Rule to mendate the presense of digits in the password
 */
PasswordValidator.prototype.digits = function digits() {
  return _register.call(this, 'digits', arguments);
};

/**
 * Rule to mendate the presense of letters in the password
 */
PasswordValidator.prototype.letters = function letters() {
  return _register.call(this, 'letters', arguments);
};

/**
 * Rule to mendate the presense of uppercase letters in the password
 */
PasswordValidator.prototype.uppercase = function uppercase() {
  return _register.call(this, 'uppercase', arguments);
};

/**
 * Rule to mendate the presense of lowercase letters in the password
 */
PasswordValidator.prototype.lowercase = function lowercase() {
  return _register.call(this, 'lowercase', arguments);
};

/**
 * Rule to mendate the presense of symbols in the password
 */
PasswordValidator.prototype.symbols = function symbols() {
  return _register.call(this, 'symbols', arguments);
};

/**
 * Rule to mendate the presense of space in the password
 * It can be used along with 'not' to not allow spaces
 * in the password
 */
PasswordValidator.prototype.spaces = function spaces() {
  return _register.call(this, 'spaces', arguments);
};

/**
 * Rule to whitelist words to be used as password
 *
 * @param {array} list - list of values allowed
 */
PasswordValidator.prototype.oneOf = function oneOf() {
  return _register.call(this, 'oneOf', arguments);
};

module.exports = PasswordValidator;
