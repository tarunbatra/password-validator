var _ = require('underscore');

var _process = function(regex) {
  if (this.valid) {
    this.valid = new RegExp(regex).test(this.password) == this.positive;
  }
  return this;
};

var Schema = function(pwd) {
  this.password = pwd;
  this.valid = true;
  this.positive = true;
  return this;
};

Schema.prototype.validate = function() {
  return this.valid;
};

Schema.prototype.not = function() {
  this.positive = false;
  return this;
};

Schema.prototype.has = function(symbol) {
  this.positive = true;
  if(symbol) {
    return _process.call(this, symbol);
  }
  return this;
};

Schema.prototype.isMin = function(num) {
  if(this.valid) {
    this.valid = this.password.length >= num;
  }
  return this;
};

Schema.prototype.isMax = function(num) {
  if(this.valid) {
    this.valid = this.password.length <= num;
  }
  return this;
}

Schema.prototype.digits = function() {
  return _process.call(this, /\d+/);
};

Schema.prototype.letters = function() {
  return _process.call(this, /[a-zA-Z]+/);
};

Schema.prototype.uppercase = function() {
  return _process.call(this, /[A-Z]+/);
};

Schema.prototype.lowercase = function() {
  return _process.call(this, /[a-z]+/);
};

Schema.prototype.symbols = function() {
  return _process.call(this, /[`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\\|;:'",<.>\/\?]+/);
};

Schema.prototype.space = function() {
  return _process.call(this, /[\s]+/);
};

module.exports = Schema;
