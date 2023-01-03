/**
 * <version><codec><privateKey>
 */
type encodedMultiwif = string;
/**
 * { version, codec, privateKey }
 */
type decodedMultiWif = {
    version: number;
    codec: number;
    privateKey: Uint8Array;
};
declare const _default: {
    encode: (version: number, codec: number, privateKey: Uint8Array) => Promise<encodedMultiwif>;
    decode: (multiWif: encodedMultiwif, expectedVersion?: number, expectedCodec?: number) => Promise<decodedMultiWif>;
};
export default _default;
