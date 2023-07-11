/**
 * lerp.
 * Linear Interpolation: This method is monotonic only when v0 * v1 < 0.
 * Lerping between same values might not produce the same value
 *
 *     console.log(lerp(10, 20, 0.6)); // 16
 *     console.log(lerp(20, 10, 0.6)); // 14
 *     console.log(lerp(20, 10, -0.6)); // 26
 *
 * @param {number} v0
 * @param {number} v1
 * @param {number} t
 * some
 * @returns {number}
 * another
 */
export function lerp(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
}
