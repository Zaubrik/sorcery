/**
/**
 * generateId.
 * @returns {string}
 */
export function generateId() {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
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
