declare module 'password-validator' {
  interface ValidateOptions {
    list: boolean;
  }

  class PasswordValidator {
    validate(password: string, options: { list:true }): string[];
    validate(password: string, options?: ValidateOptions): boolean | string[];

    letters(count?: number): this;
    digits(count?: number): this;
    symbols(count?: number): this

    min(num: number): this;
    max(num: number): this;

    lowercase(count?: number): this;
    uppercase(count?: number): this;

    spaces(count?: number): this;

    has(symbol?: RegExp): this;
    not(symbol?: RegExp): this;
    is(): this;
    oneOf(list: string[]): this;
  }

  export = PasswordValidator;
}
