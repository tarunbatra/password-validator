export = PasswordValidator;

declare class PasswordValidator {
  /**
   * Creates a password-validator schema
   *
   * @constructor
   */
  constructor();
  /**
   * Rule to mandate the presence of digits in the password
   */
  digits(): any;
  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'has' is also used
   * to make the api readable and chainable
   */
  has(): any;
  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'is' is also used
   * to make the api readable and chainable
   */
  is(): any;
  /**
   * Rule to mandate the presence of letters in the password
   */
  letters(): any;
  /**
   * Rule to mandate the presence of lowercase letters in the password
   */
  lowercase(): any;
  /**
   * Rule to specify a maximum length of the password
   *
   * @param {number} num - maximum length
   */
  max(num: number): any;
  /**
   * Rule to specify a minimum length of the password
   *
   * @param {number} num - minimum length
   */
  min(num: number): any;
  /**
   * Rule to invert the next applied rules.
   * All the rules applied after 'not' will have opposite effect,
   * until 'has' rule is applied
   */
  not(): any;
  /**
   * Rule to whitelist words to be used as password
   *
   * @param {array} list - list of values allowed
   */
  oneOf(list: string[]): any;
  /**
   * Rule to mandate the presence of space in the password
   * It can be used along with 'not' to not allow spaces
   * in the password
   */
  spaces(): any;
  /**
   * Rule to mandate the presence of symbols in the password
   */
  symbols(): any;
  /**
   * Rule to mandate the presence of uppercase letters in the password
   */
  uppercase(): any;
  /**
   * Method to validate the password against schema
   *
   * @param {string} pwd - password to validate
   * @param {object} options - optional options to configure validation
   * @param {boolean} [options.list] - asks for a list of validation
   *           failures instead of just true/false
   * @return {boolean|array} Boolean value indicting the validity
   *           of the password as per schema, if 'options.list'
   *           is not set. Otherwise, it returns an array of
   *           property names which failed validations
   */
  validate(pwd: string, options?: { list: boolean }): boolean;
}
