import { expect } from 'chai';
import { error } from '../src/constants';
import { _isPasswordValidFor, PasswordValidator as Schema } from '../src/index';

describe('password-validator', () => {
  var schema;
  var valid;

  describe('validate', () => {

    beforeEach(() => {
      schema = new Schema();
    });

    describe('the parameter is invalid', () => {

      it('should throw error', (done) => {
        try {
          valid = schema.validate();
        } catch (err) {
          expect(err.message).to.be.equal(error.password);
          done();
        }
      });
    });

    describe('the parameter is valid', () => {

      beforeEach(() => {
        schema.has('p');
      });

      it('should return result of validation', () => {
        expect(schema.validate('top')).to.be.true;
        expect(schema.validate('tod')).to.be.false;
      });
    });

    describe('the password is empty string', () => {

      beforeEach(() => {
        schema.has('');
      });

      it('should return result of validation', () => {
        expect(schema.validate('')).to.be.true;
      });
    });

    describe('options', () => {
      beforeEach(() => {
        schema.has('p').min(8);
      });
      describe('list option is set', () => {

        it('should return array of validation failures', () => {
          expect(schema.validate('topclass', { list: true }) instanceof Array).to.be.true;
          expect(schema.validate('topclass', { list: true })[0]).to.be.undefined;
          expect(schema.validate('todclass', { list: true }) instanceof Array).to.be.true;
          expect(schema.validate('tod', { list: true })[0]).to.be.equal('has');
          expect(schema.validate('tod', { list: true })[1]).to.be.equal('min');
          expect(schema.validate('tod', { list: true })[2]).to.be.undefined;
        });
      });
    });
  });

  describe('has', () => {

    describe('called without params', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.has();
        valid = schema.validate('something');
      });

      it('should set positive as true', () => {
        expect(schema.positive).to.be.true;
      });
    });

    describe('called with params', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.has('t{5,}');
        valid = schema.validate('qwerty');
      });

      it('should set positive as true', () => {
        expect(schema.positive).to.be.true;
      });
      it('should apply the param as regex', () => {
        expect(valid).to.be.false;
      })
    });
  });

  describe('is', () => {
    beforeEach(() => {
      schema = new Schema();
      schema.is();
      valid = schema.validate('something');
    });

    it('should set positive as true', () => {
      expect(schema.positive).to.be.true;
    });
  });

  describe('not', () => {

    describe('called without params', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.not();
        valid = schema.validate('something');
      });

      it('should set positive as false', () => {
        expect(schema.positive).to.be.false;
      });
    });

    describe('called with params', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.not('t{5,}');
        valid = schema.validate('qwerty');
      });

      it('should set positive as false', () => {
        expect(schema.positive).to.be.false;
      });
      it('should apply the param as regex', () => {
        expect(valid).to.be.true;
      })
    });
  });

  describe('min', () => {

    describe('the length is invalid', () => {

      beforeEach(() => {
        schema = new Schema();
      });

      it('should throw error', (done) => {
        try {
          schema.min();
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });

    describe('the password fails the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.min(10);
        valid = schema.validate('qwerty');
      });

      it('should return false on validation', () => {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.min(10);
        valid = schema.validate('1234567890');
      });

      it('should return true on validation', () => {
        expect(valid).to.be.true;
      });
    });
  });

  describe('max', () => {

    describe('the length is invalid', () => {

      beforeEach(() => {
        schema = new Schema();
      });

      it('should throw error', (done) => {
        try {
          schema.max();
        } catch (err) {
          expect(err.message).to.be.equal(error.length);
          done();
        }
      });
    });

    describe('the password fails the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.max(10);
        valid = schema.validate('1234567890qwerty');
      });

      it('should return false on validation', () => {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.max(10);
        valid = schema.validate('1234567890');
      });

      it('should return true on validation', () => {
        expect(valid).to.be.true;
      });
    });
  });

  describe('digits', () => {

    describe('the password fails the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.digits();
        valid = schema.validate('qwerty');
      });

      it('should return false on validation', () => {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.digits();
        valid = schema.validate('1234567890');
      });

      it('should return true on validation', () => {
        expect(valid).to.be.true;
      });
    });
  });

  describe('letters', () => {

    describe('the password fails the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.letters();
        valid = schema.validate('1234');
      });

      it('should return false on validation', () => {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.letters();
        valid = schema.validate('letters');
      });

      it('should return true on validation', () => {
        expect(valid).to.be.true;
      });
    });
  });

  describe('lowercase', () => {

    describe('the password fails the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.lowercase();
        valid = schema.validate('1234CAPS');
      });

      it('should return false on validation', () => {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.lowercase();
        valid = schema.validate('lettersCAPS');
      });

      it('should return true on validation', () => {
        expect(valid).to.be.true;
      });
    });
  });

  describe('uppercase', () => {

    describe('the password fails the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.uppercase();
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', () => {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.uppercase();
        valid = schema.validate('lettersCAPS');
      });

      it('should return true on validation', () => {
        expect(valid).to.be.true;
      });
    });
  });

  describe('symbols', () => {

    describe('the password fails the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.symbols();
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', () => {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.symbols();
        valid = schema.validate('letters&CAPS');
      });

      it('should return true on validation', () => {
        expect(valid).to.be.true;
      });
    });
  });

  describe('space', () => {

    describe('the password fails the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.spaces();
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', () => {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.spaces();
        valid = schema.validate('letters &CAPS');
      });

      it('should return true on validation', () => {
        expect(valid).to.be.true;
      });
    });
  });

  describe('oneOf', () => {

    describe('the password fails the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.oneOf(['this']);
        valid = schema.validate('1234lower');
      });

      it('should return false on validation', () => {
        expect(valid).to.be.false;
      });
    });

    describe('the password clears the valdiation', () => {

      beforeEach(() => {
        schema = new Schema();
        schema.oneOf('this');
        valid = schema.validate('this');
      });

      it('should return true on validation', () => {
        expect(valid).to.be.true;
      });
    });
  });
});
