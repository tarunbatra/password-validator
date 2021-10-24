export = PasswordValidator;
declare class PasswordValidator {
    properties: any[];
    /**
     * Method to validate the password against schema
     *
     * @param {string} pwd - password to validate
     * @param {object} [options] - optional options to configure validation
     * @param {boolean} [options.list] - asks for a list of validation
     *           failures instead of just true/false
     * @return {boolean|array} Boolean value indicting the validity
     *           of the password as per schema, if 'options.list'
     *           is not set. Otherwise, it returns an array of
     *           property names which failed validations
     */
    validate(pwd: string, options?: {
        list?: boolean;
    }): boolean | any[];
    list: boolean;
    password: string;
    positive: boolean;
    /**
     * Rule to mandate the presence of letters in the password
     *
     * @param {number} [count] - minimum number of letters required
     */
    letters(count?: number, ...args: any[]): any;
    /**
     * Rule to mandate the presence of digits in the password
     *
     * @param {number} [count] - minimum number of digits required
     */
    digits(count?: number, ...args: any[]): any;
    /**
     * Rule to mandate the presence of symbols in the password
     *
     * @param {number} [count] - minimum number of symbols required
     */
    symbols(count?: number, ...args: any[]): any;
    /**
     * Rule to specify a minimum length of the password
     *
     * @param {number} num - minimum length
     */
    min(num: number, ...args: any[]): any;
    /**
     * Rule to specify a maximum length of the password
     *
     * @param {number} num - maximum length
     */
    max(num: number, ...args: any[]): any;
    /**
     * Rule to mandate the presence of lowercase letters in the password
     *
     * @param {number} [count] - minimum number of lowercase letters required
     */
    lowercase(count?: number, ...args: any[]): any;
    /**
     * Rule to mandate the presence of uppercase letters in the password
     *
     * @param {number} [count] - minimum number of uppercase letters required
     */
    uppercase(count?: number, ...args: any[]): any;
    /**
     * Rule to mandate the presence of space in the password
     * It can be used along with 'not' to not allow spaces
     * in the password
     *
     * @param {number} [count] - minimum number of spaces required
     */
    spaces(count?: number, ...args: any[]): any;
    /**
     * Rule to invert the effects of 'not'
     * Apart from that, 'has' is also used
     * to make the api readable and chainable
     */
    has(...args: any[]): any;
    /**
     * Rule to invert the next applied rules.
     * All the rules applied after 'not' will have opposite effect,
     * until 'has' rule is applied
     */
    not(...args: any[]): any;
    /**
     * Rule to invert the effects of 'not'
     * Apart from that, 'is' is also used
     * to make the api readable and chainable
     */
    is(...args: any[]): any;
    /**
     * Rule to whitelist words to be used as password
     *
     * @param {array} list - list of values allowed
     */
    oneOf(...args: any[]): any;
}
