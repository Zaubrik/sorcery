const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Encodes as `string` into a `Uint8Array`.
 * @param {string} str
 * @returns {Uint8Array}
 */
export function encode(str) {
  return encoder.encode(str);
}

/**
 * Decodes as `Uint8Array` into a `string`.
 * @param {Uint8Array} str
 * @returns {string}
 */
export function decode(str) {
  return decoder.decode(str);
}
