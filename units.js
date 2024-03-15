/**
 * Number of bytes in a Kilobyte.
 * @const
 * @type {number}
 */
export const BYTES_PER_KB = 1024;

/**
 * Convert bytes to megabytes.
 * @param {number} bytes - The number of bytes.
 * @return {number} The equivalent number of megabytes.
 */
export function bytesToMb(bytes) {
  return bytes / BYTES_PER_KB / BYTES_PER_KB;
}

/**
 * Convert bytes to gigabytes.
 * @param {number} bytes - The number of bytes.
 * @return {number} The equivalent number of gigabytes.
 */
export function bytesToGb(bytes) {
  return bytes / BYTES_PER_KB / BYTES_PER_KB / BYTES_PER_KB;
}

/**
 * Convert megabytes to bytes.
 * @param {number} mb - The number of megabytes.
 * @return {number} The equivalent number of bytes.
 */
export function mbToBytes(mb) {
  return mb * BYTES_PER_KB * BYTES_PER_KB;
}

/**
 * Convert megabytes to gigabytes.
 * @param {number} mb - The number of megabytes.
 * @return {number} The equivalent number of gigabytes.
 */
export function mbToGb(mb) {
  return mb / BYTES_PER_KB;
}

/**
 * Convert gigabytes to bytes.
 * @param {number} gb - The number of gigabytes.
 * @return {number} The equivalent number of bytes.
 */
export function gbToBytes(gb) {
  return gb * BYTES_PER_KB * BYTES_PER_KB * BYTES_PER_KB;
}

/**
 * Convert gigabytes to megabytes.
 * @param {number} gb - The number of gigabytes.
 * @return {number} The equivalent number of megabytes.
 */
export function gbToMb(gb) {
  return gb * BYTES_PER_KB;
}
