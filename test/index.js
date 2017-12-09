/* eslint no-unused-vars: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint no-undef: 0 */
'use strict';

const chai = require('chai');
const CryptoObject = require('../index.js');

const should = chai.should();
const expect = chai.expect;

describe('Basic functionality & logic flow', () => {
  it(`Should instantiate`, () => {
    const cryptoObject = new CryptoObject({
      key: '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
      iv: '60iP0h6vJoEaarvg',
      keys: ['foo']
    });
    expect(cryptoObject).to.be.ok;
  });

  it('Should throw an exception if no key is provided', () => {
    expect(() => new CryptoObject()).to.throw();
  });

  it('Should throw an exception if no iv is provided', () => {
    expect(() => new CryptoObject({key: '3zTvzr3p67VC61jmV54rIYu1545x4TlY'})).to.throw();
  });

  it('Should throw an exception if no keys are provided', () => {
    expect(() => new CryptoObject({key: '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
      iv: '60iP0h6vJoEaarvg'})).to.throw();
  });

  it('Should only encrypt specified keys', () => {
    const cryptoObject = new CryptoObject({
      key: '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
      iv: '60iP0h6vJoEaarvg',
      keys: ['foo1', 'foo3']
    });

    const plainObject = {
      foo1: 'bar',
      foo2: '',
      foo3: 'baz',
      foo4: 123
    };

    const cipherObject = cryptoObject.encrypt(plainObject);
    const decryptedObject = cryptoObject.decrypt(cipherObject);

    cipherObject.should.be.an('Object');
    cipherObject.should.have.keys(Object.keys(plainObject));

    cipherObject.foo1.should.not.equal(plainObject.foo1);
    cipherObject.foo2.should.equal(plainObject.foo2);
    cipherObject.foo3.should.not.equal(plainObject.foo3);
    cipherObject.foo4.should.equal(plainObject.foo4);

    cipherObject.should.not.deep.equal(plainObject);
    cipherObject.should.not.deep.equal(decryptedObject);
    decryptedObject.should.deep.equal(plainObject);
  });

  it('Should not decrypt if decryption key is different than encryption key', () => {
    let cryptoObject = {};

    const plainObject = {
      foo: 'bar'
    };

    cryptoObject = new CryptoObject({
      key: '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
      iv: '60iP0h6vJoEaarvg',
      keys: ['foo']
    });
    const cipherObject = cryptoObject.encrypt(plainObject);

    cryptoObject = new CryptoObject({
      key: '3zTvzr3p67VC61jmV54rIYu1545x4Tl1',
      iv: '60iP0h6vJoEaarvg',
      keys: ['foo']
    });
    const decryptedObject = cryptoObject.decrypt(cipherObject);

    cipherObject.should.be.an('Object');
    decryptedObject.should.be.an('Object');

    cipherObject.should.not.deep.equal(plainObject);
    cipherObject.should.not.deep.equal(decryptedObject);

    decryptedObject.should.not.deep.equal(plainObject);
  });

  it('Should not decrypt if decryption iv is different than encryption iv', () => {
    let cryptoObject = {};

    const plainObject = {
      foo: 'bar'
    };

    cryptoObject = new CryptoObject({
      key: '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
      iv: '60iP0h6vJoEaarvg',
      keys: ['foo']
    });
    const cipherObject = cryptoObject.encrypt(plainObject);

    cryptoObject = new CryptoObject({
      key: '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
      iv: '60iP0h6vJoEaarvz',
      keys: ['foo']
    });
    const decryptedObject = cryptoObject.decrypt(cipherObject);

    cipherObject.should.be.an('Object');
    decryptedObject.should.be.an('Object');

    cipherObject.should.not.deep.equal(plainObject);
    cipherObject.should.not.deep.equal(decryptedObject);

    decryptedObject.should.not.deep.equal(plainObject);
  });
});

describe('Tolerance of plaintext', () => {
  it('Should encrypt alphanumeric key values', () => {
    const cryptoObject = new CryptoObject({
      key: '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
      iv: '60iP0h6vJoEaarvg',
      keys: ['foo']
    });

    const plainObject = {
      foo: 'bar'
    };

    const cipherObject = cryptoObject.encrypt(plainObject);
    const decryptedObject = cryptoObject.decrypt(cipherObject);

    cipherObject.should.be.an('Object');
    decryptedObject.should.be.an('Object');

    cipherObject.should.not.deep.equal(plainObject);
    cipherObject.should.not.deep.equal(decryptedObject);

    decryptedObject.should.deep.equal(plainObject);
  });

  it('Should encrypt non-ASCII key values - (Arabic Text)', () => {
    const cryptoObject = new CryptoObject({
      key: '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
      iv: '60iP0h6vJoEaarvg',
      keys: ['foo']
    });

    const plainObject = {
      foo: 'اعهااايووواعععت'
    };

    const cipherObject = cryptoObject.encrypt(plainObject);
    const decryptedObject = cryptoObject.decrypt(cipherObject);

    cipherObject.should.be.an('Object');
    decryptedObject.should.be.an('Object');

    cipherObject.should.not.deep.equal(plainObject);
    cipherObject.should.not.deep.equal(decryptedObject);

    decryptedObject.should.deep.equal(plainObject);
  });

  it('Should encrypt long key values - (> 1500 chars)', () => {
    const cryptoObject = new CryptoObject({
      key: '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
      iv: '60iP0h6vJoEaarvg',
      keys: ['foo']
    });

    const plainObject = {
      foo: ''
    };

    for (let i = 0; i < 1500; i++) {
      plainObject.foo += 'bar-baz';
    }

    const cipherObject = cryptoObject.encrypt(plainObject);
    const decryptedObject = cryptoObject.decrypt(cipherObject);

    cipherObject.should.be.an('Object');
    decryptedObject.should.be.an('Object');

    cipherObject.should.not.deep.equal(plainObject);
    cipherObject.should.not.deep.equal(decryptedObject);

    decryptedObject.should.deep.equal(plainObject);
  });
});
