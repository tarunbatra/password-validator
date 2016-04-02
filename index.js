var _ = require('underscore');

var Schema = function(pwd) {
  this.password = pwd;
  this.valid = true;
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

Schema.prototype.hasDigits = function(min, max) {
  if(this.valid) {

  }
  return this;
};

Schema.prototype.hasDigits = function(min, max) {
  if(this.valid) {
    
  }
  return this;
};

Schema.prototype.hasDigits = function(min, max) {
  if(this.valid) {
    
  }
  return this;
};

var schema = new Schema('meraPassword').isMin(50).isMax(20)
console.log(schema);