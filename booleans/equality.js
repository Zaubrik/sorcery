/**
 * isFalse.
 * @param {unknown} input
 * @returns {input is false}
 */
export function isFalse(input) {
  return input === false;
}

/**
 * isTrue.
 * @param {unknown} input
 * @returns {input is true}
 */
export function isTrue(input) {
  return input === true;
}

/**
 * equals.
 * @param {unknown} a
 * @returns {(b: unknown) => boolean}
 */
export function equals(a) {
  return (b) => a === b;
}

/**
 * doesNotEqual.
 * @param {unknown} a
 * @returns {(b: unknown) => boolean}
 */
export function doesNotEqual(a) {
  return (b) => a !== b;
}

/**
 * isGreaterThan.
 * @param {number} a
 * @returns {(b: number) => boolean}
 */
export function isGreaterThan(a) {
  return (b) => b > a;
}

/**
 * isGreaterThanOrEqualTo.
 * @param {number} a
 * @returns {(b: number) => boolean}
 */
export function isGreaterThanOrEqualTo(a) {
  return (b) => b >= a;
}

/**
 * isLessThan.
 * @param {number} a
 * @returns {(b: number) => boolean}
 */
export function isLessThan(a) {
  return (b) => b < a;
}

/**
 * isLessThanOrEqualTo.
 * @param {number} a
 * @returns {(b: number) => boolean}
 */
export function isLessThanOrEqualTo(a) {
  return (b) => b <= a;
}

/**
 * isBetween.
 * @param {number} start
 * @returns {(end: number) => (x:number) => boolean}
 */
export function isBetween(start) {
  return (end) => (x) => start <= x && x < end;
}

/**
 * isEven.
 * @param {number} n
 * @returns {boolean}
 */
export function isEven(n) {
  return n % 2 == 0;
}

/**
 * isOdd.
 * @param {number} n
 * @returns {boolean}
 */
export function isOdd(n) {
  return Math.abs(n % 2) == 1;
}
