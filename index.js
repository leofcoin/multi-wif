import base58 from '@vandeurenglenn/base58';
import typedArraySmartConcat from '@vandeurenglenn/typed-array-smart-concat';
import typedArraySmartDeconcat from '@vandeurenglenn/typed-array-smart-deconcat';

const decode = (multiWif, expectedVersion, expectedCodec) => {
    const decoded = base58.decode(multiWif);
    let [version, codec, privateKey] = typedArraySmartDeconcat(decoded);
    version = Number(new TextDecoder().decode(version));
    codec = Number(new TextDecoder().decode(codec));
    if (expectedVersion && version !== expectedVersion)
        throw new Error(`invalid version: expected ${expectedVersion} but got ${version}`);
    if (expectedCodec && codec !== expectedCodec)
        throw new Error(`invalid codec: expected ${expectedCodec} but got ${codec}`);
    return { version, codec, privateKey };
};
var index = {
    encode: (version, codec, privateKey) => {
        return base58.encode(typedArraySmartConcat([
            new TextEncoder().encode(version.toString()),
            new TextEncoder().encode(codec.toString()),
            privateKey
        ]));
    },
    decode,
    isMultiWif: (multiWif) => {
        try {
            const { version, codec, privateKey } = decode(multiWif);
            if (version === undefined)
                return false;
            if (codec === undefined)
                return false;
            if (privateKey === undefined)
                return false;
            if (privateKey && privateKey.length !== 32)
                return false;
        }
        catch {
            return false;
        }
        return true;
    }
};

export { index as default };
