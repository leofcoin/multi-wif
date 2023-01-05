import multi from './index.js'

const version = 1

const codec = 0x1F1

const encoded = multi.encode(version, codec, new Uint8Array(32))
console.log(encoded);
console.log(`# can encode: ${encoded === 'n7xYcjPaJquLZhLkacZSqVPcAsJ8ERmWXW1HmsdUaNvLUM8FaTGB'}`);

const decoded = multi.decode(encoded, version, codec)
console.log(`# can decode: ${decoded.version === version && decoded.codec === codec && decoded.privateKey?.length === 32}`);

const isMultiWif = multi.isMultiWif(encoded)
console.log(`# can check if multiWif: ${isMultiWif}`);

