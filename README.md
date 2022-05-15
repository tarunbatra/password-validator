[![logo][logo-image]][logo-url]

[![npm version][npm-image]][npm-url]
[![npm downloads][downloads-image]][npm-url]
![gh action build status][gh_build-url]
[![coverage status][codecov-image]][codecov-url]

## Install
`npm install password-validator`

## Usage
```js
var passwordValidator = require('password-validator');

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

// Validate against a password string
console.log(schema.validate('validPASS123'));
// => true
console.log(schema.validate('invalidPASS'));
// => false

// Get a full list of rules which failed
console.log(schema.validate('joke', { list: true }));
// => [ 'min', 'uppercase', 'digits' ]

```

## Advanced usage
### Details about failed validations
Sometimes just knowing that the password validation failed or what failed is not enough and it is important too get more context. In those cases, `details` option can be used to get more details about what failed.

```js
console.log(schema.validate('joke', { details: true }));
```
The above code will output:
```js
[
  {
    validation: 'min',
    arguments: 8,
    message: 'The string should have a minimum length of 8 characters'
  },
  {
    validation: 'uppercase',
    message: 'The string should have a minimum of 1 uppercase letter'
  },
  {
    validation: 'digits',
    arguments: 2,
    message: 'The string should have a minimum of 2 digits'
  }
]
```
### Custom validation messages
The validation messages can be overriden by providing a description of the validation. For example:
```js
schema.not().uppercase(8, 'maximum 8 chars in CAPS please')
```
The above validation, on failure, should return the following object:
```js
  {
    validation: 'min',
    arguments: 8,
    inverted: true,
    message: 'maximum 8 chars in CAPS please'
  },
```

### Plugins
Plugin functions can be added to the password validator schema for custom password validation going beyond the rules provided here. For example:
```js
var validator = require('validator');
var passwordValidator = require('password-validator');

var schema = new passwordValidator()
    .min(3, 'Password too small')
    .usingPlugin(validator.isEmail, 'Password should be an email');

schema.validate('not-an-email', { details: true })
// [{ validation: 'usingPlugin', arguments: [Function: isEmail], message: 'Password should be an email' }]
```

## Rules
Rules supported as of now are:

|     Rules            |               Descriptions                                                                                                       |
|:---------------------|:---------------------------------------------------------------------------------------------------------------------------------|
|**digits([count], [description])**   | specifies password must include digits (optionally provide count paramenter to specify at least n digits)                        |
|**letters([count], [description])**  | specifies password must include letters (optionally provide count paramenter to specify at least n letters)                      |
|**lowercase([count], [description])**| specifies password must include lowercase letters (optionally provide count paramenter to specify at least n lowercase letters)  |
|**uppercase([count], [description])**| specifies password must include uppercase letters (optionally provide count paramenter to specify at least n uppercase letters)  |
|**symbols([count], [description])**  | specifies password must include symbols (optionally provide count paramenter to specify at least n symbols)                      |
|**spaces([count], [description])**   | specifies password must include spaces (optionally provide count paramenter to specify at least n spaces)                        |
|**min(len, [description])**          | specifies minimum length                                                                                                         |
|**max(len, [description])**          | specifies maximum length                                                                                                         |
|**oneOf(list)**                      | specifies the whitelisted values                                                                                                 |
|**not([regex], [description])**      | inverts the result of validations applied next                                                                                   |
|**is()**                             | inverts the effect of _**not()**_                                                                                                |
|**has([regex], [description])**      | inverts the effect of _**not()**_ and applies a regex (optional)                                                                 |
|**usingPlugin(fn, [description])**   | Executes custom function and include its result in password validation                                                           |

## Options
The following options can be passed to `validate` method:
* `list` - If set, validate method returns a list of rules which failed instead of true/false.

## Resources
* API Reference
  - [latest](https://tarunbatra.github.io/password-validator)
  - [others](https://github.com/tarunbatra/password-validator/wiki/API-Reference)
* [Wiki](https://github.com/tarunbatra/password-validator/wiki)
* [Changelog](https://github.com/tarunbatra/password-validator/blob/master/CHANGELOG.md)

For APIs of other older versions, head to Wiki.

## License
[MIT License](https://choosealicense.com/licenses/mit/)


[logo-image]: https://res.cloudinary.com/tbking/image/upload/v1490803400/password-validator/logo.png
[logo-url]: https://tarunbatra.github.io/password-validator
[npm-image]: https://img.shields.io/npm/v/password-validator.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/password-validator
[downloads-image]: https://img.shields.io/npm/dt/password-validator.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/tarunbatra/password-validator
[codecov-image]: https://img.shields.io/codecov/c/gh/tarunbatra/password-validator?logo=codecov&style=flat-square
[gh_build-url]: https://img.shields.io/github/workflow/status/tarunbatra/password-validator/build-ci?style=flat-square&logo=github
