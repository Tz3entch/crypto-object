# crypto-object
> Encrypt Objects in Node.js, using built-in [Crypto][1].
> Uses AES 256(CTR mode)

[![Build Status](https://travis-ci.org/Euthor/crypto-object.svg?branch=master)](https://travis-ci.org/Euthor/crypto-object)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

## Usage

```bash
$ npm i --save https://github.com/Euthor/crypto-object.git
```

```javascript
const CryptoObject = require('crypto-object');

const cryptoObject = new CryptoObject({
  key: '3zTvzr3p67VC61jmV54rIYu1545x4TlY', // The encryption key (password) - Required
  iv: '60iP0h6vJoEaarvg' // The initialization vector (must have 16 bytes length) - Required
  keys: ['foo', 'bar'] // Which object keys to encrypt - Required
});

cryptoObject.encrypt({foo: 'hello', bar: 'world', id: 'x-001'})
// `{ foo: 'f1ccb1b097', bar: 'eec6afb09c', id: 'x-001' }`

cryptoObject.decrypt({ foo: 'f1ccb1b097', bar: 'eec6afb09c', id: 'x-001' })
// `{ foo: 'hello', bar: 'world', id: 'x-001' }`
```

## Run the tests

```bash
$ npm install -g mocha
$ npm test
```

## Contributing?

```bash
# Always run the linter & fix code style before pushing
$ npm run lint
```

## Authors

- Nicholas Kyriakides, [@nicholaswmin][2]

## Owners

- [Euthor][3]

## License

> The MIT License

[1]: https://nodejs.org/api/crypto.html
[2]: https://github.com/nicholaswmin
[3]: https://github.com/Euthor
