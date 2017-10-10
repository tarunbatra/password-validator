import { regex } from './constants';
import { PasswordValidator } from './index';

/**
 * Generic method to test regex
 *
 * @private
 * @param {string} regex - regex to test
 *                           with password
 */
function _process(regexp: string | RegExp) {
  return new RegExp(regexp).test(this.password) === this.positive;
}



/**
 * Method to invert the next validations
 *
 * @param {RegExp} [symbol] - custom Regex which should not be present
 */
export function not(symbol: RegExp | string) {
  this.positive = false;
  if (symbol) {
    return _process.apply(this, symbol);
  }
  return true;
};

/**
 * Method to invert the effects of not()
 *
 * @param {RegExp} [symbol] - custom Regex which should be present
 */
export function has(symbol: RegExp | string) {
  this.positive = true;
  if (symbol) {
    return _process.apply(this, symbol);
  }
  return true;
};

/**
 * Method to invert the effects of not() and
 * to make the api readable and chainable
 *
 */
export function is() {
  this.positive = true;
  return true;
};

/**
 * Method to specify a minimum length
 *
 * @param {number} num - minimum length
 */
export function min(num) {
  return this.password.length >= num;
};

/**
 * Method to specify a maximum length
 *
 * @param {number} num - maximum length
 */
export function max(num) {
  return this.password.length <= num;
};

/**
 * Method to validate the presense of digits
 */
export function digits() {
  return _process.call(this, regex.digits);
};

/**
 * Method to validate the presense of letters
 */
export function letters() {
  return _process.call(this, regex.letters);
};

/**
 * Method to validate the presense of uppercase letters
 */
export function uppercase() {
  return _process.call(this, regex.uppercase);
};

/**
 * Method to validate the presense of lowercase letters
 */
export function lowercase() {
  return _process.call(this, regex.lowercase);
};

/**
 * Method to validate the presense of symbols
 */
export function symbols() {
  return _process.call(this, regex.symbols);
};

/**
 * Method to validate the presense of space
 */
export function spaces() {
  return _process.call(this, regex.spaces);
};

/**
 * Method to provide pre-defined values for password
 *
 * @param {array} list - list of values allowed
 */
export function oneOf(list) {
  return list.indexOf(this.password) >= 0 === this.positive;
};
