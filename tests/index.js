expect = require('chai').expect;
var error = require('../src/constants').error;
var Schema = require('../src/index');

describe('password-validator',function() {
  var schema;
  var valid;

  describe('validate', function() {

    beforeEach(function() {
      schema = new Schema();
    });

    describe('the parameter is invalid', function() {

      it('should throw error', function(done) {
        try {
          valid = schema.validate();
        } catch (err) {
          expect(err.message).to.be.equal(error.password);
          done();
        }
      });
    });

    describe('the parameter is valid', function() {

      beforeEach(function() {
        schema.has('p');
      });

      it('should return result of validation', function() {
        expect(schema.validate('top')).to.be.true;
        expect(schema.validate('tod')).to.be.false;
      });
    });

    describe('options', function() {
      beforeEach(function() {
        schema.has('p').isMin(8);
      });
      describe('list option is set', function () {

        it('should return array of validation failures', function() {
          expect(schema.validate('topclass', { list: true }) instanceof Array).to.be.true;
          expect(schema.validate('topclass', { list: true })[0]).to.be.undefined;
          expect(schema.validate('todclass', { list: true }) instanceof Array).to.be.true;
          expect(schema.validate('tod', { list: true })[0]).to.be.equal('has');
          expect(schema.validate('tod', { list: true })[1]).to.be.equal('isMin');
          expect(schema.validate('tod', { list: true })[2]).to.be.undefined;
        });
      });
    });
  });

  describe('has', function() {

    describe('called without params', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.has();
        valid = schema.validate('something');
      });

      it('should set positive as true', function() {
        expect(schema.positive).to.be.true;
      });
    });

    describe('called with params', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.has('t{5,}');
        valid = schema.validate('qwerty');
      });

      it('should set positive as true', function() {
        expect(schema.positive).to.be.true;
      });
      it('should apply the param as regex', function() {
        expect(valid).to.be.false;
      })
    });
  });

  describe('not',function() {

    describe('called without params', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.not();
        valid = schema.validate('something');
      });

      it('should set positive as false', function() {
        expect(schema.positive).to.be.false;
      });
    });

    describe('called with params', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.not('t{5,}');
        valid = schema.validate('qwerty');
      });

      it('should set positive as false', function() {
        expect(schema.positive).to.be.false;
      });
      it('should apply the param as regex', function() {
        expect(valid).to.be.true;
      })
    });
  });

  describe('isMin', function() {

    describe('the length is invalid', function() {

      beforeEach(function() {
        schema = new Schema();
      });

      it('should throw error', function(done) {
        try{
          schema.isMin();
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.isMin(10);
        valid = schema.validate('qwerty');
      });

      it('should return false on validation', function() {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.isMin(10);
        valid = schema.validate('1234567890');
      });

      it('should return true on validation', function() {
        expect(valid).to.be.true;
      });
    });
  });

  describe('isMax', function() {

    describe('the length is invalid', function() {

      beforeEach(function() {
        schema = new Schema();
      });

      it('should throw error', function(done) {
        try{
          schema.isMax();
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.isMax(10);
        valid = schema.validate('1234567890qwerty');
      });

      it('should return false on validation', function() {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.isMax(10);
        valid = schema.validate('1234567890');
      });

      it('should return true on validation', function() {
        expect(valid).to.be.true;
      });
    });
  });

  describe('digits', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.digits();
        valid = schema.validate('qwerty');
      });

      it('should return false on validation', function() {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.digits();
        valid = schema.validate('1234567890');
      });

      it('should return true on validation', function() {
        expect(valid).to.be.true;
      });
    });
  });

  describe('letters', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.letters();
        valid = schema.validate('1234');
      });

      it('should return false on validation', function() {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.letters();
        valid = schema.validate('letters');
      });

      it('should return true on validation', function() {
        expect(valid).to.be.true;
      });
    });
  });

  describe('lowercase', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.lowercase();
        valid = schema.validate('1234CAPS');
      });

      it('should return false on validation', function() {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.lowercase();
        valid = schema.validate('lettersCAPS');
      });

      it('should return true on validation', function() {
        expect(valid).to.be.true;
      });
    });
  });

  describe('uppercase', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.uppercase();
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', function() {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.uppercase();
        valid = schema.validate('lettersCAPS');
      });

      it('should return true on validation', function() {
        expect(valid).to.be.true;
      });
    });
  });

  describe('symbols', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.symbols();
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', function() {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.symbols();
        valid = schema.validate('letters&CAPS');
      });

      it('should return true on validation', function() {
        expect(valid).to.be.true;
      });
    });
  });

  describe('space', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.spaces();
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', function() {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema();
        schema.spaces();
        valid = schema.validate('letters &CAPS');
      });

      it('should return true on validation', function() {
        expect(valid).to.be.true;
      });
    });
  });
});
