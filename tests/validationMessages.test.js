var expect = require('chai').expect;
const validationMessages = require('../src/validationMessages');

describe('validationMessages', () => {
  describe('min', () => {
    it('should return correct message', () => {
      let result = validationMessages('min', 8, false);
      expect(result).to.be.equal('The string should have a minimum length of 8 characters');
    });
    it('should return correct message if used with not', () => {
      let result = validationMessages('min', 18, true);
      expect(result).to.be.equal('The string should have a maximum length of 18 characters');
    });
  });
  describe('max', () => {
    it('should return correct message', () => {
      let result = validationMessages('max', 8, false);
      expect(result).to.be.equal('The string should have a maximum length of 8 characters');
    });
    it('should return correct message if used with not', () => {
      let result = validationMessages('max', 18, true);
      expect(result).to.be.equal('The string should have a minimum length of 18 characters');
    });
  });
  describe('letters', () => {
    it('should return correct message', () => {
      let result = validationMessages('letters', 8, false);
      expect(result).to.be.equal('The string should have a minimum of 8 letters');
    });
    it('should return correct message if used with not', () => {
      let result = validationMessages('letters', 18, true);
      expect(result).to.be.equal('The string should have a maximum of 18 letters');
    });
    it('should return correct message if used without arguments', () => {
      let result = validationMessages('letters', undefined, false);
      expect(result).to.be.equal('The string should have a minimum of 1 letter');
    });
    it('should return correct message if used with not and without arguments', () => {
      let result = validationMessages('letters', undefined, true);
      expect(result).to.be.equal('The string should not have letters');
    });
  });
  describe('digits', () => {
    it('should return correct message', () => {
      let result = validationMessages('digits', 8, false);
      expect(result).to.be.equal('The string should have a minimum of 8 digits');
    });
    it('should return correct message if used with not', () => {
      let result = validationMessages('digits', 18, true);
      expect(result).to.be.equal('The string should have a maximum of 18 digits');
    });
    it('should return correct message if used without arguments', () => {
      let result = validationMessages('digits', undefined, false);
      expect(result).to.be.equal('The string should have a minimum of 1 digit');
    });
    it('should return correct message if used with not and without arguments', () => {
      let result = validationMessages('digits', undefined, true);
      expect(result).to.be.equal('The string should not have digits');
    });
  });
  describe('uppercase', () => {
    it('should return correct message', () => {
      let result = validationMessages('uppercase', 8, false);
      expect(result).to.be.equal('The string should have a minimum of 8 uppercase letters');
    });
    it('should return correct message if used with not', () => {
      let result = validationMessages('uppercase', 18, true);
      expect(result).to.be.equal('The string should have a maximum of 18 uppercase letters');
    });
    it('should return correct message if used without arguments', () => {
      let result = validationMessages('uppercase', undefined, false);
      expect(result).to.be.equal('The string should have a minimum of 1 uppercase letter');
    });
    it('should return correct message if used with not and without arguments', () => {
      let result = validationMessages('uppercase', undefined, true);
      expect(result).to.be.equal('The string should not have uppercase letters');
    });
  });
  describe('lowercase', () => {
    it('should return correct message', () => {
      let result = validationMessages('lowercase', 8, false);
      expect(result).to.be.equal('The string should have a minimum of 8 lowercase letters');
    });
    it('should return correct message if used with not', () => {
      let result = validationMessages('lowercase', 18, true);
      expect(result).to.be.equal('The string should have a maximum of 18 lowercase letters');
    });
    it('should return correct message if used without arguments', () => {
      let result = validationMessages('lowercase', undefined, false);
      expect(result).to.be.equal('The string should have a minimum of 1 lowercase letter');
    });
    it('should return correct message if used with not and without arguments', () => {
      let result = validationMessages('lowercase', undefined, true);
      expect(result).to.be.equal('The string should not have lowercase letters');
    });
  });
  describe('symbols', () => {
    it('should return correct message', () => {
      let result = validationMessages('symbols', 8, false);
      expect(result).to.be.equal('The string should have a minimum of 8 symbols');
    });
    it('should return correct message if used with not', () => {
      let result = validationMessages('symbols', 18, true);
      expect(result).to.be.equal('The string should have a maximum of 18 symbols');
    });
    it('should return correct message if used without arguments', () => {
      let result = validationMessages('symbols', undefined, false);
      expect(result).to.be.equal('The string should have a minimum of 1 symbol');
    });
    it('should return correct message if used with not and without arguments', () => {
      let result = validationMessages('symbols', undefined, true);
      expect(result).to.be.equal('The string should not have symbols');
    });
  });
  describe('spaces', () => {
    it('should return correct message', () => {
      let result = validationMessages('spaces', 8, false);
      expect(result).to.be.equal('The string should have a minimum of 8 spaces');
    });
    it('should return correct message if used with not', () => {
      let result = validationMessages('spaces', 18, true);
      expect(result).to.be.equal('The string should have a maximum of 18 spaces');
    });
    it('should return correct message if used without arguments', () => {
      let result = validationMessages('spaces', undefined, false);
      expect(result).to.be.equal('The string should have a minimum of 1 space');
    });
    it('should return correct message if used with not and without arguments', () => {
      let result = validationMessages('spaces', undefined, true);
      expect(result).to.be.equal('The string should not have spaces');
    });
  });
  describe('oneOf', () => {
    it('should return correct message', () => {
      let result = validationMessages('oneOf', [ '123', 'abc', 'def' ], false);
      expect(result).to.be.equal('The string should be one of 123, abc and def');
    });
    it('should return correct message', () => {
      let result = validationMessages('oneOf', [ '123', 'abc', 'def' ], true);
      expect(result).to.be.equal('The string should not be one of 123, abc and def');
    });
    it('should return correct message if the array has one elementa', () => {
      let result = validationMessages('oneOf', [ '123' ], false);
      expect(result).to.be.equal('The string should be 123');
    });
    it('should return correct message if the array has one element and used with not', () => {
      let result = validationMessages('oneOf', [ '123' ], true);
      expect(result).to.be.equal('The string should not be 123');
    });
  });
  describe('has', () => {
    it('should return correct message', () => {
      let result = validationMessages('has', 8, false);
      expect(result).to.be.equal('The string should have pattern \'8\'');
    });
    it('should return correct message if used with not', () => {
      let result = validationMessages('has', 18, true);
      expect(result).to.be.equal('The string should not have pattern \'18\'');
    });
  });
  describe('not', () => {
    it('should return correct message', () => {
      let result = validationMessages('not', 8, false);
      expect(result).to.be.equal('The string should not have pattern \'8\'');
    });
    it('should return correct message if used with not', () => {
      let result = validationMessages('not', 18, true);
      expect(result).to.be.equal('The string should have pattern \'18\'');
    });
  });
  describe('usingPlugin', () => {
    const customPlugin = () => {}
    it('should return correct message', () => {
      let result = validationMessages('usingPlugin', customPlugin, false);
      expect(result).to.be.equal('The string should not violate customPlugin');
    });
    it('should return correct message if used with not', () => {
      let result = validationMessages('usingPlugin', customPlugin, true);
      expect(result).to.be.equal('The string should violate customPlugin');
    });
    it('should return correct message if used with an anyonymous function', () => {
      let result = validationMessages('usingPlugin', () => {}, false);
      expect(result).to.be.equal('The string should not violate plugin');
    });
    it('should return correct message if used with not and an anyonymous function', () => {
      let result = validationMessages('usingPlugin', () => {}, true);
      expect(result).to.be.equal('The string should violate plugin');
    });
  });
});
