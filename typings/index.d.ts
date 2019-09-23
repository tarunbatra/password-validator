declare module 'password-validator' {
  interface ValidateOptions {
    list: boolean;
  }

  class PasswordValidator {
    validate(password: string, options?: ValidateOptions): boolean | string[];

    letters(): this;
    digits(): this;
    symbols(): this

    min(num: number): this;
    max(num: number): this;

    lowercase(): this;
    uppercase(): this;

    spaces(): this;

    has(symbol?: RegExp): this;
    not(symbol?: RegExp): this;
    is(): this;
    oneOf(list: string[]): this;
  }

  export = PasswordValidator;
}
