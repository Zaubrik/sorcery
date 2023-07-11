import { isSingle } from "./collections/length.js";
import { is2DArray } from "./type.js";
import { reduce } from "./arrays/aggregation.js";
import { single } from "./collections/single_access.js";

/**
 * unique.
 * @template I
 * @param {I[]} arr
 * @returns {I[]}
 */
export function unique(arr) {
  return arr.filter((item, index) => index === arr.indexOf(item));
}

/**
 * difference.
 * ```js
 * difference([10, 30, 40, 50, 60])([10, 20, 50]) // [30, 40, 60]
 * ```
 * @template I
 * @param {I[]} A
 */
export function difference(A) {
  /**
   * @param {I[]} B
   * @returns {I[]}
   */
  return (B) => A.filter((a) => !B.includes(a));
}

/**
 * intersect.
 * ```js
 * intersect([10, 30, 40, 50, 60])([10, 20, 50]) // [10, 50]
 * ```
 * @template I
 * @param {I[]} A
 */
export function intersect(A) {
  /**
   * @param {I[]} B
   * @returns {I[]}
   */
  return (B) => {
    const uniqueA = unique(A);
    const uniqueB = unique(B);

    const result = [];

    for (const a of uniqueA) {
      for (const b of uniqueB) {
        if (a === b) {
          result.push(a);
        }
      }
    }

    return result;
  };
}

/**
 * intersection.
 * ```js
 * intersection([10, 30, 40, 50, 60], [10, 20, 40, 50], [10, 20, 50]) // [10, 50]
 * ```
 * @template I
 * @param {I[][]} sets
 * @returns {I[]}
 */
export function intersection(...sets) {
  if (isSingle(sets)) {
    const singleItem = single(sets);

    if (is2DArray(singleItem)) {
      return intersection(...singleItem);
    }
  }
  // @ts-ignore
  return reduce((acc, set) => intersect(acc)(set))(sets);
}
