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
     * @param {boolean} [options.details] - asks for more details about
     *           failed validations including arguments, and error messages
     * @returns {boolean|array} Boolean value indicting the validity
     *           of the password as per schema, if 'options.list' or
     *           'options.details' is not set. Otherwise, it returns an
     *           array of property names which failed validations
     */
    validate(pwd: string, options?: {
        list?: boolean;
        details?: boolean;
    }): boolean | any[];
    list: boolean;
    details: boolean;
    password: string;
    positive: boolean;
    /**
     * Rule to mandate the presence of letters in the password
     *
     * @param {number} [count] - minimum number of letters required
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    letters(count?: number, description?: string, ...args: any[]): PasswordValidator;
    /**
     * Rule to mandate the presence of digits in the password
     *
     * @param {number} [count] - minimum number of digits required
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    digits(count?: number, description?: string, ...args: any[]): PasswordValidator;
    /**
     * Rule to mandate the presence of symbols in the password
     *
     * @param {number} [count] - minimum number of symbols required
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    symbols(count?: number, description?: string, ...args: any[]): PasswordValidator;
    /**
     * Rule to specify a minimum length of the password
     *
     * @param {number} num - minimum length
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    min(num: number, description?: string, ...args: any[]): PasswordValidator;
    /**
     * Rule to specify a maximum length of the password
     *
     * @param {number} num - maximum length
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    max(num: number, description?: string, ...args: any[]): PasswordValidator;
    /**
     * Rule to mandate the presence of lowercase letters in the password
     *
     * @param {number} [count] - minimum number of lowercase letters required
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    lowercase(count?: number, description?: string, ...args: any[]): PasswordValidator;
    /**
     * Rule to mandate the presence of uppercase letters in the password
     *
     * @param {number} [count] - minimum number of uppercase letters required
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    uppercase(count?: number, description?: string, ...args: any[]): PasswordValidator;
    /**
     * Rule to mandate the presence of space in the password
     * It can be used along with 'not' to not allow spaces
     * in the password
     *
     * @param {number} [count] - minimum number of spaces required
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    spaces(count?: number, description?: string, ...args: any[]): PasswordValidator;
    /**
     * Rule to invert the effects of 'not'
     * Apart from that, 'has' is also used
     * to make the api readable and chainable
     *
     * @param {string|RegExp} [pattern] - pattern to match
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    has(pattern?: string | RegExp, description?: string, ...args: any[]): PasswordValidator;
    /**
     * Rule to invert the next applied rules.
     * All the rules applied after 'not' will have opposite effect,
     * until 'has' rule is applied
     *
     * @param {string|RegExp} [pattern] - pattern to not match
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    not(pattern?: string | RegExp, description?: string, ...args: any[]): PasswordValidator;
    /**
     * Rule to invert the effects of 'not'
     * Apart from that, 'is' is also used
     * to make the api readable and chainable
     *
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    is(...args: any[]): PasswordValidator;
    /**
     * Rule to whitelist words to be used as password
     *
     * @param {array} list - list of values allowed
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    oneOf(list: any[], description?: string, ...args: any[]): PasswordValidator;
    /**
     * Insert a plugin function into the validation chain
     *
     * @param {Plugin} fn  - A plugin function
     * @param {string} [description] - description of the validation
     * @returns {PasswordValidator} instance of PasswordValidator schema
     */
    usingPlugin(fn: Plugin, description?: string, ...args: any[]): PasswordValidator;
}
declare namespace PasswordValidator {
    export { Plugin };
}
type Plugin = (password: any) => any;
