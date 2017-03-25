
# password-validator

[![npm version](https://badge.fury.io/js/password-validator.svg)](https://www.npmjs.com/package/password-validator) [![Build Status](https://travis-ci.org/tarunbatra/password-validator.svg?branch=master)](https://travis-ci.org/tarunbatra/password-validator)

## Install
`npm install password-validator`

## Use
```js
var passwordValidator = require('password-validator');

// Create a schema
var schema = new passwordValidator();

// Add properties to it
schema
.isMin(8)           // Minimum length 8
.isMax(100)         // Maximum length 100
.has().uppercase()  // Must have uppercase letters
.has().lowercase()  // Must have lowercase letters
.has().digits()     // Must have digits
.not().spaces();    // Should not have spaces

// Validate against a password string
console.log(schema.validate('validPASS123'));
// => true
console.log(schema.validate('invalidPASS'));
// => false

// Get a full list of rules which failed
console.log(schema.validate('joke', { list: true }));
// => [ 'isMin', 'uppercase', 'digits' ]

```

## Validations
Validations supported as of now are:

|     Rules      |               Descriptions                                       |
|:---------------|:-----------------------------------------------------------------|
|**digits()**    | specifies password must include digits                           |
|**letters()**   | specifies password must include letters                          |
|**lowercase()** | specifies password must include lowercase letters                |
|**uppercase()** | specifies password must include uppercase letters                |
|**symbols()**   | specifies password must include symbols                          |
|**spaces()**    | specifies password must include spaces                           |
|**isMin(len)**  | specifies minimum length                                         |
|**isMax(len)**  | specifies maximum length                                         |
|**not()**       | inverts the result of validations applied next                   |
|**has([regex])**| inverts the effect of _**not()**_ and applies a regex (optional) |

## Options
The following options can be passed to `validate` method:
* `list` - If set, validate method returns a list of rules which failed instead of true/false.

## API
* [API Reference](https://tarunbatra.github.io/password-validator/PasswordSchema.html)

## License
[MIT License](http://choosealicense.com/licenses/mit/)
