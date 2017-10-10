import { error } from './constants';
import * as lib from './lib';
import { Property } from './types';

/**
 * Validates that a number is a valid length (positive number)
 *
 * @private
 * @param {number} num - Number to validate
 */
export function _validateLength(num) {
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
export function _isPasswordValidFor(context: PasswordValidator, property: Property) {
  return lib[property.method].call(context, property.args);
}

/**
 * Creates a password-validator schema
 *
 * @constructor
 */
export default class PasswordValidator {
  // Initialize a schema with no properties defined
  properties: Property[] = [];
  password: string;
  public positive: boolean = true;

  /**
   * Registers the properties of a password-validation schema object
   *
   * @private
   * @param {string} func - Property name
   * @param {array} args - arguments for the func property
   */
  private _register(func: string, ...args: any[]) {
    // Add property to the schema
    this.properties.push({ method: func, args: args });
    return this;
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
  validate(pwd: string, list = false) {
    // Checks if pwd is invalid
    if (typeof pwd !== 'string') {
      throw new Error(error.password);
    }

    // Sets password string
    this.password = pwd;

    // Sets that no inversion takes place by default
    this.positive = true;


    if (list === true) {
      return this.properties.reduce((errorList, property) => {
        // Applies all validations defined in lib one by one
        if (!_isPasswordValidFor(this, property)) {
          // If the validation for a property fails,
          // add it to the error list
          return errorList.concat(property.method);
        }
        return errorList;
      }, []);
    }

    // Returns the result of the validations
    return this.properties.every((property) => {
      // Applies all validations defined in lib one by one
      return _isPasswordValidFor(this, property);
    });
  }

  /**
   * Rule to invert the next applied rules.
   * All the rules applied after 'not' will have opposite effect,
   * until 'has' rule is applied
   */
  not(regexp?: RegExp | string) {
    return this._register('not', regexp);
  };

  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'has' is also used
   * to make the api readable and chainable
   */
  has(regexp?: RegExp | string) {
    return this._register('has', regexp);
  };

  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'is' is also used
   * to make the api readable and chainable
   */
  is() {
    return this._register('is');
  };

  /**
   * Rule to specify a minimum length of the password
   *
   * @param {number} num - minimum length
   */
  min(num: number) {
    _validateLength(num);
    return this._register('min', [num]);
  };


  /**
   * Rule to specify a maximum length of the password
   *
   * @param {number} num - maximum length
   */
  max(num: number) {
    _validateLength(num);
    return this._register('max', [num]);
  };

  /**
   * Rule to mendate the presense of digits in the password
   */
  digits() {
    return this._register('digits');
  };


  /**
   * Rule to mendate the presense of letters in the password
   */
  letters() {
    return this._register('letters');
  };

  /**
   * Rule to mendate the presense of uppercase letters in the password
   */
  uppercase() {
    return this._register('uppercase');
  };

  /**
   * Rule to mendate the presense of lowercase letters in the password
   */
  lowercase() {
    return this._register('lowercase');
  };

  /**
   * Rule to mendate the presense of symbols in the password
   */
  symbols() {
    return this._register('symbols');
  };

  /**
   * Rule to mendate the presense of space in the password
   * It can be used along with 'not' to not allow spaces
   * in the password
   */
  spaces(...args: string[]) {
    return this._register('spaces', args);
  };

  /**
   * Rule to whitelist words to be used as password
   *
   * @param {array} list - list of values allowed
   */
  oneOf(args: string[]) {
    return this._register('oneOf', args);
  };
}
