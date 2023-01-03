import multi from './index.js'

const version = 1

const codec = 0x1F1

const encoded = await multi.encode(version, codec, new Uint8Array(32))
console.log(`# can encode: ${encoded === '2C9tyWGYtDahT8qhJ4SpfKaNLEWoMF7L5vA7NZ1nKJ3pBpiDPRVbah4W6Z9xzM'}`);

const decoded = await multi.decode(encoded, version, codec)
console.log(`# can decode: ${decoded.version === version && decoded.codec === codec && decoded.privateKey?.length === 32}`);

const isMultiWif = await multi.isMultiWif(encoded)
console.log(`# can check if multiWif: ${isMultiWif}`);

