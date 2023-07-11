/**
 * carryRatio.
 * @param {number} value
 * @param {number} biggestValue
 * @param {number} actualLength
 * @return {number} The proportional share of a ratio
 * @example
 * // calculate the proportional share of the 40/300 ratio from 100:
 * carryRatio(40, 300, 100) // 13.333333333333332
 */
export function carryRatio(value, biggestValue, actualLength) {
  return (value / biggestValue) * actualLength;
}
