export interface Property {
    method: string;
    arguments: string[];
}

export declare class PasswordValidator {

    properties: Property[];

    /**
     * Validate that the password matches the given constraints.
     * This should only be called after all constraints have been defined.
     *
     * @param password the password to validate
     */
    validate(password: string): boolean;

    /**
     * Validate that the password matches the given constraints.
     * This should only be called after all constraints have been defined.
     *
     * @param password the password to validate
     * @param options an object that contains options for the validate method
     * @param options.list boolean to indicate if an array of properties that do not match should be returned. Default `false`.
     */
    validate(password: string, options?: { list: true; }): string[] | boolean;

    /**
     * inverts the effect of not() and applies an optional regex
     *
     * @param regex optional RegExp string or RegExp object to match against
     */
    not(regex?: string | RegExp): PasswordValidator;

    /**
     * inverts the result of validations applied next and checks that password does not match an optional RegExp string or RegExp object
     *
     * @param regex optional RegExp string or RegExp object to match against
     */
    has(regex?: string | RegExp): PasswordValidator;

    /**
     * inverts the effect of not()
     */
    is(): PasswordValidator;

    /**
     * specifies password must include digits
     */
    digits(): PasswordValidator;

    /**
     * specifies password must include letters
     */
    letters(): PasswordValidator;

    /**
     * specifies password must include lowercase letters
     */
    lowercase(): PasswordValidator;

    /**
     * specifies password must include uppercase letters
     */
    uppercase(): PasswordValidator;

    /**
     * specifies password must include symbols
     */
    symbols(): PasswordValidator;

    /**
     * specifies password must include spaces
     */
    spaces(): PasswordValidator;

    /**
     * specifies minimum length
     *
     * @param length the minimum length of the password
     */
    min(length: number): PasswordValidator;

    /**
     * specifies maximum length
     * @param length the maximum length of the password
     */
    max(length: number): PasswordValidator;

    /**
     * specifies the whitelisted values
     * @param list one of the values a password must match (or must not match if not() is applied)
     */
    oneOf(list: string[]): PasswordValidator;

}
