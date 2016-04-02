# password-validator [![npm version](https://badge.fury.io/js/password-validator.svg)](https://www.npmjs.com/package/password-validator)

## Install
`npm install password-validator`

## Use

```
var pwdSchema = require('password-validator');

var pwd = new pwdSchema('validPASS')
          .isMin(8).has().uppercase().lowercase();
console.log(pwd.validate()); // true
```

# Validations
Validations supported as of now are:
* **digits()** - specifies password must include digits
* **letters()** - specifies password must include letters
* **lowercase()** - specifies password must include lowercase letters
* **uppercase()** - specifies password must include uppercase letters
* **symbols()** - specifies password must include symbols
* **space()** - specifies password must include spaces
* **isMin()** - specifies minimum length
* **isMax()** - specifies maximum length
* **not()** - inverts the result of validations applied next
* **has()** - inverts the effect of _**not()**_

# License
[MIT License](http://choosealicense.com/licenses/mit/)