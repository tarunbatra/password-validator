# Changelog
This changelog document tracks the changes in the project API since `v2.1.2`.

This project adheres to [semver](https://semver.org/).

## [5.1.2](https://github.com/tarunbatra/password-validator/releases/tag/v5.1.2)
* Generate correct types to fix issue [#18](https://github.com/tarunbatra/password-validator/issues/18)

## [5.1.1](https://github.com/tarunbatra/password-validator/releases/tag/v5.1.1)
* Update dev dependencies
* Improve validate method type

## [5.1.0](https://github.com/tarunbatra/password-validator/releases/tag/v5.1.0)
* Added optional `count` argument to define minimum count required for attributes. See [#39](https://github.com/tarunbatra/password-validator/issues/39).
* Added support for `§` and `±` in symbols
* Updated dev-dependencies versions due to CVEs

## [5.0.3](https://github.com/tarunbatra/password-validator/releases/tag/v5.0.3)
* Add types

## [5.0.2](https://github.com/tarunbatra/password-validator/releases/tag/v5.0.2)
* Fixed issue [#28](https://github.com/tarunbatra/password-validator/issues/28) where `uppercase` and `lowercase` validations did not respect `not`.

## [5.0.1](https://github.com/tarunbatra/password-validator/releases/tag/v5.0.1)
* Used ES6 classes internally
* Dropped support for node versions below 8

## [4.1.2](https://github.com/tarunbatra/password-validator/releases/tag/v4.1.2)
* Support non-english lanugaes for `lowercase` and`uppercase` rules [#24](https://github.com/tarunbatra/password-validator/pull/24)

## [4.1.1](https://github.com/tarunbatra/password-validator/releases/tag/v4.1.1)
* Allowed currency symbols other than dollar in [#16](https://github.com/tarunbatra/password-validator/pull/16) and [#17](https://github.com/tarunbatra/password-validator/pull/17)

## [4.0.0](https://github.com/tarunbatra/password-validator/releases/tag/v4.0.0)
* Allowed empty strings as passwords in [#9](https://github.com/tarunbatra/password-validator/pull/9)

## [3.0.0](https://github.com/tarunbatra/password-validator/releases/tag/v3.0.0)
* Added rule `oneOf` to the schema
* Added `is` method to make schema more readable
* Renamed `PasswordSchema` class to `PasswordValidator`

## [2.2.0](https://github.com/tarunbatra/password-validator/releases/tag/v2.2.0)
* Added `list` option to the validate method.
* Code optimizations.

## [2.1.2](https://github.com/tarunbatra/password-validator/releases/tag/v2.1.2)
* Fixed issue [#3](https://github.com/tarunbatra/password-validator/issues/3) relating to file loading in frontend environment.
* Removed underscore as dependency.
