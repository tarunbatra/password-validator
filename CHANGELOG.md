# Changelog
This changelog document tracks the changes in the project API since `v2.1.2`.

This project adheres to [semver](http://semver.org/).

## [4.1.0](https://github.com/tarunbatra/password-validator/releases/tag/v4.1.0)
* Allowed currency symbols other than dollar in [#16](https://github.com/tarunbatra/password-validator/pull/16)

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
