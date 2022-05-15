var expect = require('chai').expect;
var error = require('../src/constants').error;
var Schema = require('../src/index');

describe('password-validator', function () {
  var schema;
  var valid;

  describe('validate', function () {

    beforeEach(function () {
      schema = new Schema();
    });

    describe('the parameter is invalid', function () {

      it('should stringify it', function () {
        valid = schema.validate();
        expect(typeof schema.password).to.be.equal('string');
        expect(valid).to.be.true;
      });
    });

    describe('the parameter is valid', function () {

      beforeEach(function () {
        schema.has('p');
      });

      it('should return result of validation', function () {
        expect(schema.validate('top')).to.be.true;
        expect(schema.validate('tod')).to.be.false;
      });
    });

    describe('the password is empty string', function () {

      beforeEach(function () {
        schema.has('');
      });

      it('should return result of validation', function () {
        expect(schema.validate('')).to.be.true;
      });
    });

    describe('options', function () {
      beforeEach(function () {
        schema.has('p').not().uppercase().min(8);
      });
      describe('list option is set', function () {

        it('should return array of validation failures', function () {
          expect(schema.validate('topclass', { list: true }) instanceof Array).to.be.true;
          expect(schema.validate('topclass', { list: true })[0]).to.be.undefined;
          expect(schema.validate('todclass', { list: true }) instanceof Array).to.be.true;
          expect(schema.validate('tod', { list: true })[0]).to.be.equal('has');
          expect(schema.validate('tod', { list: true })[1]).to.be.equal('min');
          expect(schema.validate('tod', { list: true })[2]).to.be.undefined;
        });
      });

      describe('details option was set', function () {

        it('should return correct error messages in the list', function () {
          var res = schema.validate('TOPCLASS123ABC', { details: true });
          expect(res).to.have.lengthOf(2);
          expect(res[0].validation).to.be.equal('has');
          expect(res[0].arguments).to.be.equal('p');
          expect(res[0].message).to.be.equal('The string should have pattern \'p\'');
          expect(res[0].inverted).to.be.undefined;
          expect(res[1].validation).to.be.equal('uppercase');
          expect(res[1].arguments).to.be.undefined;
          expect(res[1].inverted).to.be.true;
          expect(res[1].message).to.be.equal('The string should not have uppercase letters');
        });
      });
    });

    describe('description is provided', function () {
      beforeEach(function () {
        schema
          .has('p', 'should have p')
          .not().uppercase(null, 'no uppercase allowed')
          .min(80, 'more than 80 chars please');
      });

      it('should return the description as validation message', function () {
        var res = schema.validate('TOPCLASS123ABC', { details: true });
        expect(res[0].message).to.be.equal('should have p');
        expect(res[1].message).to.be.equal('no uppercase allowed');
        expect(res[2].message).to.be.equal('more than 80 chars please');
      });
    });
  });

  describe('has', function () {

    describe('called without params', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.has();
        valid = schema.validate('something');
      });

      it('should set positive as true', function () {
        expect(schema.positive).to.be.true;
      });
    });

    describe('called with params', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.has('t{5,}');
        valid = schema.validate('qwerty');
      });

      it('should set positive as true', function () {
        expect(schema.positive).to.be.true;
      });
      it('should apply the param as regex', function () {
        expect(valid).to.be.false;
      });
    });
  });

  describe('is', function () {
    beforeEach(function () {
      schema = new Schema();
      schema.is();
      valid = schema.validate('something');
    });

    it('should set positive as true', function () {
      expect(schema.positive).to.be.true;
    });
  });

  describe('not', function () {

    describe('called without params', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.not();
        valid = schema.validate('something');
      });

      it('should set positive as false', function () {
        expect(schema.positive).to.be.false;
      });
    });

    describe('called with params', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.not('t{5,}');
        valid = schema.validate('qwerty');
      });

      it('should set positive as false', function () {
        expect(schema.positive).to.be.false;
      });
      it('should apply the param as regex', function () {
        expect(valid).to.be.true;
      });
    });

    describe('called with count and clear the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.not().spaces(2);
        valid = schema.validate('qwert y');
      });

      it('should set positive as false', function () {
        expect(schema.positive).to.be.false;
      });
      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('called with count and fail the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.not().spaces(2);
        valid = schema.validate('q wert y');
      });

      it('should set positive as false', function () {
        expect(schema.positive).to.be.false;
      });
      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });
  });

  describe('min', function () {

    describe('the length is invalid', function () {

      beforeEach(function () {
        schema = new Schema();
      });

      it('should throw error', function (done) {
        try {
          schema.min();
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });

    describe('the password fails the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.min(10);
        valid = schema.validate('qwerty');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.min(10);
        valid = schema.validate('1234567890');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });
  });

  describe('max', function () {

    describe('the length is invalid', function () {

      beforeEach(function () {
        schema = new Schema();
      });

      it('should throw error', function (done) {
        try {
          schema.max();
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });

    describe('the password fails the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.max(10);
        valid = schema.validate('1234567890qwerty');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.max(10);
        valid = schema.validate('1234567890');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });
  });

  describe('digits', function () {

    describe('the password fails the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.digits();
        valid = schema.validate('qwerty');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password fails the validation of 3 digits', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.digits(3);
        valid = schema.validate('q1w2erty');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.digits();
        valid = schema.validate('1234567890');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('the password clears the validation of 3 digits', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.digits(3);
        valid = schema.validate('q1w2e3rty');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('the count is invalid', function () {

      beforeEach(function () {
        schema = new Schema();
      });

      it('should throw error', function (done) {
        try {
          schema.digits('invalid');
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });


    describe('used with not', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.not().digits();
      });

      it('should return false if digit is present', function () {
        valid = schema.validate('1234567890');
        expect(valid).to.be.false;
      });

      it('should return true if digit is not present', function () {
        valid = schema.validate('qwerty');
        expect(valid).to.be.true;
      });
    });
  });

  describe('letters', function () {

    describe('the password fails the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.letters();
        valid = schema.validate('1234');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password fails the validation of 3 letters', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.letters(3);
        valid = schema.validate('1a2B34');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.letters();
        valid = schema.validate('letters');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('the password clears the validation of 3 letters', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.letters(3);
        valid = schema.validate('1a2b2c3');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('used with not', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.not().letters();
      });

      it('should return false if letter is present', function () {
        valid = schema.validate('letters');
        expect(valid).to.be.false;
      });

      it('should return true if letter is not present', function () {
        valid = schema.validate('1234');
        expect(valid).to.be.true;
      });
    });

    describe('the count is invalid', function () {

      beforeEach(function () {
        schema = new Schema();
      });

      it('should throw error', function (done) {
        try {
          schema.letters('invalid');
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });
  });

  describe('lowercase', function () {

    describe('the password fails the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.lowercase();
        valid = schema.validate('1234CAPS');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password fails the validation 5 lowercase letters', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.lowercase(5);
        valid = schema.validate('1234caps');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.lowercase();
        valid = schema.validate('lettersCAPS');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('the password clears the validation of 5 lowercase letters', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.lowercase(5);
        valid = schema.validate('LeTTeRsLoWeR');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('used with not', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.not().lowercase();
      });

      it('should return false if lowercase is present', function () {
        valid = schema.validate('lettersCAPS');
        expect(valid).to.be.false;
      });

      it('should return true if lowercase is not present', function () {
        valid = schema.validate('1234CAPS');
        expect(valid).to.be.true;
      });
    });

    describe('the count is invalid', function () {

      beforeEach(function () {
        schema = new Schema();
      });

      it('should throw error', function (done) {
        try {
          schema.lowercase('invalid');
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });
  });

  describe('uppercase', function () {

    describe('the password fails the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.uppercase();
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password fails the validation of 5 uppercase letters', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.uppercase(5);
        valid = schema.validate('1234CAPS');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.uppercase();
        valid = schema.validate('lettersCAPS');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('the password clears the validation of 5 uppercase letters', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.uppercase(5);
        valid = schema.validate('LeTTerCapS');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('used with not', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.not().uppercase();
      });

      it('should return false if uppercase is present', function () {
        valid = schema.validate('lettersCAPS');
        expect(valid).to.be.false;
      });

      it('should return true if uppercase is not present', function () {
        valid = schema.validate('letters');
        expect(valid).to.be.true;
      });
    });

    describe('the count is invalid', function () {

      beforeEach(function () {
        schema = new Schema();
      });

      it('should throw error', function (done) {
        try {
          schema.uppercase('invalid');
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });
  });

  describe('symbols', function () {

    describe('the password fails the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.symbols();
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password fails the validation of 3 symbols', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.symbols(3);
        valid = schema.validate('12!34&lower');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.symbols();
        valid = schema.validate('letters&CAPS');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('the password clears the validation of 3 symbols', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.symbols(3);
        valid = schema.validate('let1t!ers&CAPS?');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('currency symbols other than dollar are used', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.symbols();
        valid = schema.validate('letters£CAPS');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('used with not', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.not().symbols();
      });

      it('should return false if symbol is present', function () {
        valid = schema.validate('letters&CAPS');
        expect(valid).to.be.false;
      });

      it('should return true if symbol is not present', function () {
        valid = schema.validate('1234lower');
        expect(valid).to.be.true;
      });
    });

    describe('the count is invalid', function () {

      beforeEach(function () {
        schema = new Schema();
      });

      it('should throw error', function (done) {
        try {
          schema.symbols('invalid');
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });
  });

  describe('space', function () {

    describe('the password fails the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.spaces();
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password fails the validation of 3 spaces', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.spaces(3);
        valid = schema.validate('12 34low er');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.spaces();
        valid = schema.validate('letters &CAPS');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('the password clears the validation of 3 spaces', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.spaces(3);
        valid = schema.validate('le tte rs &CAPS');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('used with not', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.not().spaces();
      });

      it('should return false if space is present', function () {
        valid = schema.validate('letters &CAPS');
        expect(valid).to.be.false;
      });

      it('should return true if space is not present', function () {
        valid = schema.validate('letters&CAPS');
        expect(valid).to.be.true;
      });
    });

    describe('the count is invalid', function () {

      beforeEach(function () {
        schema = new Schema();
      });

      it('should throw error', function (done) {
        try {
          schema.spaces('invalid');
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });

  });

  describe('oneOf', function () {

    describe('the password fails the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.oneOf([ 'this' ]);
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.oneOf([ 'this' ]);
        valid = schema.validate('this');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });

    describe('used with not', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.not().oneOf([ 'this' ]);
      });

      it('should return false if said password is used', function () {
        valid = schema.validate('this');
        expect(valid).to.be.false;
      });

      it('should return true if said password is not used', function () {
        valid = schema.validate('that');
        expect(valid).to.be.true;
      });
    });
  });

  describe('usingPlugin', function () {
    describe('the password fails the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.usingPlugin(function plugin(pwd) {
          return pwd.startsWith('abcd');
        });
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });
    describe('the password clears the validation', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.usingPlugin(function plugin(pwd) {
          return pwd.startsWith('1234');
        });
        valid = schema.validate('1234lower');
      });

      it('should return true on validation', function () {
        expect(valid).to.be.true;
      });
    });
    describe('the plugin throws error', function () {

      beforeEach(function () {
        schema = new Schema();
        schema.usingPlugin(function plugin() {
          throw new Error('Unexpected error');
        });
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', function () {
        expect(valid).to.be.false;
      });
    });
    describe('the plugin is invalid', function () {

      beforeEach(function () {
        schema = new Schema();
      });

      it('should throw error', function (done) {
        try {
          schema.usingPlugin(null);
        } catch (err) {
          expect(err.message).to.be.equal(error.invalidPlugin);
          done();
        }
      });
    });
  });
});
