/**
 * generateId
 * Produces a random 8-character hexadecimal string.
 * @param {number} [length=10]
 * @returns {string}
 */
export function generateId(length = 12) {
  const minHexChars = 2; // Minimum number of characters required for a valid hex digit
  const maxBytes = 65536; // Maximum number of random bytes available
  const maxHexChars = maxBytes * 2; // Each byte corresponds to 2 hex characters

  if (length < minHexChars) {
    // If the length is too small, generate a random number instead
    const randomHex = Math.floor(Math.random() * Math.pow(16, minHexChars))
      .toString(16).padStart(minHexChars, "0");
    return randomHex;
  }

  if (length > maxHexChars) {
    throw new Error(
      `Requested length exceeds the maximum allowable (${maxHexChars} characters).`,
    );
  }

  const bytes = new Uint8Array(length / 2);
  crypto.getRandomValues(bytes);

  const hexString = Array.from(
    bytes,
    (byte) => byte.toString(16).padStart(2, "0"),
  ).join("");

  return hexString;
}

/**
 * generateIdOfSize.
 * @param {number} size
 * @returns {string}
 */
export function generateIdOfSize(size) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  for (var str = "", i = 0; i < size; i += 1) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
