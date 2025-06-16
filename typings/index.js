/* eslint-disable no-unused-vars */
var lib = require('./lib');
var error = require('./constants').error;
var getValidationMessage = require('./validationMessages');
/**
 * Validates that a number is a valid length (positive number)
 *
 * @private
 * @param {number} num - Number to validate
 */
function _validateLength(num) {
    var len = Number(num);
    if (isNaN(len) || !Number.isInteger(len) || len < 1) {
        throw new Error(error.length);
    }
}
/**
 * Tests a validation and return the result
 *
 * @private
 * @param {string} property - Property to validate
 * @returns {boolean} Boolean value indicting the validity
 *           of the password against the property
 */
function _isPasswordValidFor(property) {
    return lib[property.method].apply(this, property.arguments);
}
/**
 * Registers the properties of a password-validation schema object
 *
 * @private
 * @param {string} method - Property name
 * @param {array} arguments - arguments for the func property
 * @returns {PasswordValidator}
 */
function _register(method, args, description) {
    // Add property to the schema
    this.properties.push({ method: method, arguments: args, description: description });
    return this;
}
var PasswordValidator = /** @class */ (function () {
    /**
     * Creates a password-validator schema
     *
     * @constructor
     */
    function PasswordValidator() {
        this.properties = [];
    }
    /**
     * Method to validate the password against schema
     *
     * @param {string} pwd - password to validate
     * @param {object} [options] - optional options to configure validation
     * @param {boolean} [options.list] - asks for a list of validation
     *           failures instead of just true/false
     * @param {boolean} [options.details] - asks for more details about
     *           failed validations including arguments, and error messages
     * @param {string} [options.language] - Default en-Us - pt-Br
     * @returns {boolean|array} Boolean value indicting the validity
     *           of the password as per schema, if 'options.list' or
     *           'options.details' is not set. Otherwise, it returns an
     *           array of property names which failed validations
     */
    PasswordValidator.prototype.validate = function (pwd, options) {
        var _this = this;
        this.list = Boolean(options && options.list);
        this.details = Boolean(options && options.details);
        this.language = String(options && options.language);
        this.password = String(pwd);
        this.positive = true;
        if (this.list || this.details) {
            return this.properties.reduce(function (errorList, property) {
                // Applies all validations defined in lib one by one
                if (!_isPasswordValidFor.call(_this, property)) {
                    // If the validation for a property fails,
                    // add it to the error list
                    var detail = property.method;
                    // If the details option was provided,
                    // return a rich object including validation message
                    if (_this.details) {
                        detail = { validation: property.method };
                        if (property.arguments && property.arguments[0]) {
                            detail.arguments = property.arguments[0];
                        }
                        if (!_this.positive && property.method !== 'not') {
                            detail.inverted = true;
                        }
                        var description = property.arguments && property.arguments[1];
                        var validationMessage = description || getValidationMessage(property.method, detail.arguments, detail.inverted, _this.language);
                        detail.message = validationMessage;
                    }
                    return errorList.concat(detail);
                }
                return errorList;
            }, []);
        }
        return this.properties.every(_isPasswordValidFor.bind(this));
    };
    /**
     * Rule to mandate the presence of letters in the password
     *
     * @param {number} [count] - minimum number of letters required
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.letters = function (count, description) {
        count && _validateLength(count);
        return _register.call(this, 'letters', arguments);
    };
    /**
     * Rule to mandate the presence of digits in the password
     *
     * @param {number} [count] - minimum number of digits required
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.digits = function (count, description) {
        count && _validateLength(count);
        return _register.call(this, 'digits', arguments);
    };
    /**
     * Rule to mandate the presence of symbols in the password
     *
     * @param {number} [count] - minimum number of symbols required
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.symbols = function (count, description) {
        count && _validateLength(count);
        return _register.call(this, 'symbols', arguments);
    };
    /**
     * Rule to specify a minimum length of the password
     *
     * @param {number} num - minimum length
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.min = function (num, description) {
        _validateLength(num);
        return _register.call(this, 'min', arguments);
    };
    /**
     * Rule to specify a maximum length of the password
     *
     * @param {number} num - maximum length
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.max = function (num, description) {
        _validateLength(num);
        return _register.call(this, 'max', arguments);
    };
    /**
     * Rule to mandate the presence of lowercase letters in the password
     *
     * @param {number} [count] - minimum number of lowercase letters required
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.lowercase = function (count, description) {
        count && _validateLength(count);
        return _register.call(this, 'lowercase', arguments);
    };
    /**
     * Rule to mandate the presence of uppercase letters in the password
     *
     * @param {number} [count] - minimum number of uppercase letters required
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.uppercase = function (count, description) {
        count && _validateLength(count);
        return _register.call(this, 'uppercase', arguments);
    };
    /**
     * Rule to mandate the presence of space in the password
     * It can be used along with 'not' to not allow spaces
     * in the password
     *
     * @param {number} [count] - minimum number of spaces required
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.spaces = function (count, description) {
        count && _validateLength(count);
        return _register.call(this, 'spaces', arguments);
    };
    /**
     * Rule to invert the effects of 'not'
     * Apart from that, 'has' is also used
     * to make the api readable and chainable
     *
     * @param {string|RegExp} [pattern] - pattern to match
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.has = function (pattern, description) {
        return _register.call(this, 'has', arguments);
    };
    /**
     * Rule to invert the next applied rules.
     * All the rules applied after 'not' will have opposite effect,
     * until 'has' rule is applied
     *
     * @param {string|RegExp} [pattern] - pattern to not match
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.not = function (pattern, description) {
        return _register.call(this, 'not', arguments);
    };
    /**
     * Rule to invert the effects of 'not'
     * Apart from that, 'is' is also used
     * to make the api readable and chainable
     *
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.is = function () {
        return _register.call(this, 'is', arguments);
    };
    /**
     * Rule to whitelist words to be used as password
     *
     * @param {array} list - list of values allowed
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.oneOf = function (list, description) {
        return _register.call(this, 'oneOf', arguments);
    };
    /**
     * Insert a plugin function into the validation chain
     *
     * @param {Plugin} fn  - A plugin function
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    PasswordValidator.prototype.usingPlugin = function (fn, description) {
        if (typeof fn !== 'function') {
            throw new Error(error.invalidPlugin);
        }
        return _register.call(this, 'usingPlugin', arguments);
    };
    return PasswordValidator;
}());
module.exports = PasswordValidator;
/**
 * @callback Plugin
 * @param password Password injected by the library
 */
