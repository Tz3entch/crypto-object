const CryptoObject = require('./index.js');
var crypto = require('crypto');

const cryptoObject = new CryptoObject({
  key: '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
  iv: '60iP0h6vJoEaarty', // The encryption password - Required
  keys: ['foo', 'bar'] // Which object keys to encrypt - Required
});

var encr = cryptoObject.encrypt({foo: 'hello', bar: 'world', id: 'x-001'})
// `{ foo: '1a29e0e604', bar: '0523fee60f', id: 'x-001' }`
console.log(encr);

var decr = cryptoObject.decrypt({ foo: 'f1ccb1b097', bar: 'eec6afb09c', id: 'x-001' })
// `{ foo: 'hello', bar: 'world', id: 'x-001' }`
console.log(decr)
