var expect = require('chai').expect;
var Schema = require('../index');

describe('password-validator',function() {
  var schema;

  describe('has', function() {

    describe('called without params', function() {

      beforeEach(function() {
        schema = new Schema('qwerty');
        schema.has();
      });

      it('should set positive as true', function() {
        expect(schema.positive).to.be.true;
      });
    });

    describe('called with params', function() {

      beforeEach(function() {
        schema = new Schema('qwerty');
        schema.has('t{5,}');
      });

      it('should set positive as true', function() {
        expect(schema.positive).to.be.true;
      });
      it('should apply the param as regex', function() {
        expect(schema.validate()).to.be.false;
      })
    });
  });

  describe('not',function() {

    beforeEach(function() {
      schema = new Schema('qwerty');
      schema.not();
    });

    it('should set positive as false', function() {
      expect(schema.positive).to.be.false;
    });
  });
  
  describe('isMin', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('qwerty');
        schema.isMin(10);
      });

      it('should return false on validation', function() {
        expect(schema.validate()).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('1234567890');
        schema.isMin(10);
      });

      it('should return true on validation', function() {
        expect(schema.validate()).to.be.true;
      });
    });
  });

  describe('isMax', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('1234567890qwerty');
        schema.isMax(10);
      });

      it('should return false on validation', function() {
        expect(schema.validate()).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('1234567890');
        schema.isMax(10);
      });

      it('should return true on validation', function() {
        expect(schema.validate()).to.be.true;
      });
    });
  });

  describe('digits', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('qwerty');
        schema.digits();
      });

      it('should return false on validation', function() {
        expect(schema.validate()).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('1234567890');
        schema.digits();
      });

      it('should return true on validation', function() {
        expect(schema.validate()).to.be.true;
      });
    });
  });

  describe('letters', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('1234');
        schema.letters();
      });

      it('should return false on validation', function() {
        expect(schema.validate()).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('letters');
        schema.letters();
      });

      it('should return true on validation', function() {
        expect(schema.validate()).to.be.true;
      });
    });
  });

  describe('lowercase', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('1234CAPS');
        schema.lowercase();
      });

      it('should return false on validation', function() {
        expect(schema.validate()).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('lettersCAPS');
        schema.lowercase();
      });

      it('should return true on validation', function() {
        expect(schema.validate()).to.be.true;
      });
    });
  });

  describe('uppercase', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('1234lower');
        schema.uppercase();
      });

      it('should return false on validation', function() {
        expect(schema.validate()).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('lettersCAPS');
        schema.uppercase();
      });

      it('should return true on validation', function() {
        expect(schema.validate()).to.be.true;
      });
    });
  });

  describe('symbols', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('1234lower');
        schema.symbols();
      });

      it('should return false on validation', function() {
        expect(schema.validate()).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('letters&CAPS');
        schema.symbols();
      });

      it('should return true on validation', function() {
        expect(schema.validate()).to.be.true;
      });
    });
  });

  describe('space', function() {

    describe('the password fails the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('1234lower');
        schema.space();
      });

      it('should return false on validation', function() {
        expect(schema.validate()).to.be.false;
      });
    });

    describe('the password clears the valdiation', function() {

      beforeEach(function() {
        schema = new Schema('letters &CAPS');
        schema.space();
      });

      it('should return true on validation', function() {
        expect(schema.validate()).to.be.true;
      });
    });
  });
});