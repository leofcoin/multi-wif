import base58check from '@vandeurenglenn/base58check'
import typedArraySmartConcat from '@vandeurenglenn/typed-array-smart-concat'
import typedArraySmartDeconcat  from '@vandeurenglenn/typed-array-smart-deconcat'

/**
 * <version><codec><privateKey>
 */
type encodedMultiwif = string

/**
 * { version, codec, privateKey }
 */
type decodedMultiWif = {
  version: number,
  codec: number,
  privateKey: Uint8Array
}

const decode = async (multiWif: encodedMultiwif, expectedVersion?: number, expectedCodec?: number): Promise<decodedMultiWif> => {
  const { data } = await base58check.decode(multiWif)
  let [version, codec, privateKey] = typedArraySmartDeconcat(data)
  version = Number(new TextDecoder().decode(version))
  codec = Number(new TextDecoder().decode(codec))

  if (expectedVersion && version !== expectedVersion) throw new Error(`invalid version: expected ${expectedVersion} but got ${version}`)
  if (expectedCodec && codec !== expectedCodec) throw new Error(`invalid codec: expected ${expectedCodec} but got ${codec}`)
  return { version, codec, privateKey}
}

export default {
  encode: (version: number, codec: number, privateKey: Uint8Array): Promise<encodedMultiwif> => {    
    return base58check.encode(typedArraySmartConcat([
			new TextEncoder().encode(version.toString()),
			new TextEncoder().encode(codec.toString()),
			privateKey
		]));    
  },
  decode,
  isMultiWif: async (multiWif: encodedMultiwif) => {
    try {
      const { version, codec, privateKey } = await decode(multiWif)
      if (version === undefined) return false
      if (codec === undefined) return false
      if (privateKey === undefined) return false
      if (privateKey && privateKey.length !==  32) return false
    } catch {
      return false
    }
    return true    
  }
} 