/**
 * Number of bytes in a Kilobyte.
 * @const
 * @type {number}
 */
export const bytesPerKb = 1024;

/**
 * Convert bytes to megabytes.
 * @param {number} bytes - The number of bytes.
 * @return {number} The equivalent number of megabytes.
 */
export function bytesToMb(bytes) {
  return bytes / bytesPerKb / bytesPerKb;
}

/**
 * Convert bytes to gigabytes.
 * @param {number} bytes - The number of bytes.
 * @return {number} The equivalent number of gigabytes.
 */
export function bytesToGb(bytes) {
  return bytes / bytesPerKb / bytesPerKb / bytesPerKb;
}

/**
 * Convert megabytes to bytes.
 * @param {number} mb - The number of megabytes.
 * @return {number} The equivalent number of bytes.
 */
export function mbToBytes(mb) {
  return mb * bytesPerKb * bytesPerKb;
}

/**
 * Convert megabytes to gigabytes.
 * @param {number} mb - The number of megabytes.
 * @return {number} The equivalent number of gigabytes.
 */
export function mbToGb(mb) {
  return mb / bytesPerKb;
}

/**
 * Convert gigabytes to bytes.
 * @param {number} gb - The number of gigabytes.
 * @return {number} The equivalent number of bytes.
 */
export function gbToBytes(gb) {
  return gb * bytesPerKb * bytesPerKb * bytesPerKb;
}

/**
 * Convert gigabytes to megabytes.
 * @param {number} gb - The number of gigabytes.
 * @return {number} The equivalent number of megabytes.
 */
export function gbToMb(gb) {
  return gb * bytesPerKb;
}
