[![logo][logo-image]][logo-url]

[![npm version][npm-image]][npm-url]
[![npm downloads][downloads-image]][npm-url]
[![build status][travis-image]][travis-url]
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

## Rules
Rules supported as of now are:

|     Rules            |               Descriptions                                                                                                       |
|:---------------------|:---------------------------------------------------------------------------------------------------------------------------------|
|**digits([count])**   | specifies password must include digits (optionally provide count paramenter to specify at least n digits)                        |
|**letters([count])**  | specifies password must include letters (optionally provide count paramenter to specify at least n letters)                      |
|**lowercase([count])**| specifies password must include lowercase letters (optionally provide count paramenter to specify at least n lowercase letters)  |
|**uppercase([count])**| specifies password must include uppercase letters (optionally provide count paramenter to specify at least n uppercase letters)  |
|**symbols([count])**  | specifies password must include symbols (optionally provide count paramenter to specify at least n symbols)                      |
|**spaces([count])**   | specifies password must include spaces (optionally provide count paramenter to specify at least n spaces)                        |
|**min(len)**          | specifies minimum length                                                                                                         |
|**max(len)**          | specifies maximum length                                                                                                         |
|**oneOf(list)**       | specifies the whitelisted values                                                                                                 |
|**not([regex])**      | inverts the result of validations applied next                                                                                   |
|**is()**              | inverts the effect of _**not()**_                                                                                                |
|**has([regex])**      | inverts the effect of _**not()**_ and applies a regex (optional)                                                                 |

## Options
The following options can be passed to `validate` method:
* `list` - If set, validate method returns a list of rules which failed instead of true/false.

## Character Support
This package comes with a basic support for many common charsets. Eventhough it can not be fully relied upon regarding every language and sign there is. If you see something missing please consider contributing it via a pull request.

Supported Letters:
* [Basic Latin](https://www.unicode.org/charts/PDF/U0000.pdf)
* [Latin-1 Supplement](https://www.unicode.org/charts/PDF/U0080.pdf)
* [Latin Extended-A](https://www.unicode.org/charts/PDF/U0100.pdf)
* [Latin Extended-B](https://www.unicode.org/charts/PDF/U0180.pdf)
* [Latin Extended Additional](https://www.unicode.org/charts/PDF/U1E00.pdf)
* [Greek and Coptic](https://www.unicode.org/charts/PDF/U0370.pdf)
* [Greek Extended](https://www.unicode.org/charts/PDF/U1F00.pdf)
* [Cyrillic](https://www.unicode.org/charts/PDF/U0400.pdf)
* [CJK](https://www.unicode.org/charts/PDF/U4E00.pdf)



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
[travis-image]:https://img.shields.io/travis/tarunbatra/password-validator.svg?logo=travis&style=flat-square
[travis-url]:https://travis-ci.org/tarunbatra/password-validator
[downloads-image]: https://img.shields.io/npm/dt/password-validator.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/tarunbatra/password-validator
[codecov-image]: https://img.shields.io/codecov/c/gh/tarunbatra/password-validator?logo=codecov&style=flat-square
