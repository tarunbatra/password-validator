
[![npm version](https://badge.fury.io/js/password-validator.svg)](https://www.npmjs.com/package/password-validator) [![Build Status](https://travis-ci.org/tarunbatra/password-validator.svg?branch=master)](https://travis-ci.org/tarunbatra/password-validator)

# password-validator

## Install
`npm install password-validator`

## Use

```
var passwordValidator = require('password-validator');

// create a schema
var schema = new passwordValidator();

// add properties to it
schema.isMin(8).has().uppercase().lowercase();

// validate against a password string
console.log(schema.validate('validPASS')); // true
console.log(schema.validate('invalidpassword')); //false *no caps*
```

# Validations
Validations supported as of now are:
* **digits()** - specifies password must include digits
* **letters()** - specifies password must include letters
* **lowercase()** - specifies password must include lowercase letters
* **uppercase()** - specifies password must include uppercase letters
* **symbols()** - specifies password must include symbols
* **spaces()** - specifies password must include spaces
* **isMin(len)** - specifies minimum length
* **isMax(len)** - specifies maximum length
* **not()** - inverts the result of validations applied next
* **has([regex])** - inverts the effect of _**not()**_ and applies a regex (optional)

# License
[MIT License](http://choosealicense.com/licenses/mit/)