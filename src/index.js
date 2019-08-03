var lib = require('./lib');
var error = require('./constants').error;

/**
 * Validates that a number is a valid length (positive number)
 *
 * @private
 * @param {number} num - Number to validate
 */
function _validateLength(num) {
  if (isNaN(Number(num))) {
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

class PasswordValidator {
  /**
   * Creates a password-validator schema
   *
   * @constructor
   */
  constructor() {
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
  validate(pwd, options) {
    this.list = Boolean(options && options.list);
    this.password = String(pwd);

    this.positive = true;

    if (this.list) {
      return this.properties.reduce((errorList, property) => {
        // Applies all validations defined in lib one by one
        if (!_isPasswordValidFor.call(this, property)) {
          // If the validation for a property fails,
          // add it to the error list
          return errorList.concat(property.method);
        }
        return errorList;
      }, []);
    }
    return this.properties.every(_isPasswordValidFor.bind(this));
  }

  /**
   * Rule to mandate the presence of letters in the password
   */
  letters() {
    return _register.call(this, 'letters', arguments);
  }

  /**
   * Rule to mandate the presence of digits in the password
   */
  digits() {
    return _register.call(this, 'digits', arguments);
  }

  /**
   * Rule to mandate the presence of symbols in the password
   */
  symbols() {
    return _register.call(this, 'symbols', arguments);
  }

  /**
   * Rule to specify a minimum length of the password
   *
   * @param {number} num - minimum length
   */
  min(num) {
    _validateLength(num);
    return _register.call(this, 'min', arguments);
  }

  /**
   * Rule to specify a maximum length of the password
   *
   * @param {number} num - maximum length
   */
  max(num) {
    _validateLength(num);
    return _register.call(this, 'max', arguments);
  }

  /**
   * Rule to mandate the presence of lowercase letters in the password
   */
  lowercase() {
    return _register.call(this, 'lowercase', arguments);
  }

  /**
   * Rule to mandate the presence of uppercase letters in the password
   */
  uppercase() {
    return _register.call(this, 'uppercase', arguments);
  }

  /**
   * Rule to mandate the presence of space in the password
   * It can be used along with 'not' to not allow spaces
   * in the password
   */
  spaces() {
    return _register.call(this, 'spaces', arguments);
  }

  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'has' is also used
   * to make the api readable and chainable
   */
  has() {
    return _register.call(this, 'has', arguments);
  }

  /**
   * Rule to invert the next applied rules.
   * All the rules applied after 'not' will have opposite effect,
   * until 'has' rule is applied
   */
  not() {
    return _register.call(this, 'not', arguments);
  }

  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'is' is also used
   * to make the api readable and chainable
   */
  is() {
    return _register.call(this, 'is', arguments);
  }

  /**
   * Rule to whitelist words to be used as password
   *
   * @param {array} list - list of values allowed
   */
  oneOf() {
    return _register.call(this, 'oneOf', arguments);
  }
}

module.exports = PasswordValidator;
