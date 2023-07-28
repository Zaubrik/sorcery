import { isString } from "../type.js";

/**
 * length.
 * @template {string|unknown[]} C
 * @param {C} collection
 * @returns {number}
 */
export function length(collection) {
  return collection.length;
}

/**
 * isOfLength.
 * @template {string|unknown[]} C
 * @param {number} expectedLength
 * @returns {(collection: C) => boolean}
 */
export function isOfLength(expectedLength) {
  return (collection) => length(collection) === expectedLength;
}

/**
 * isShorterThan.
 * @template {string|unknown[]} C
 * @param {number} expectedLength
 * @returns {(collection: C) => boolean}
 */
export function isShorterThan(expectedLength) {
  return (collection) => length(collection) < expectedLength;
}

/**
 * isLongerThan.
 * @template {string|unknown[]} C
 * @param {number} expectedLength
 * @returns {(collection: C) => boolean}
 */
export function isLongerThan(expectedLength) {
  return (collection) => length(collection) > expectedLength;
}

/**
 * isBetween.
 * @template {string|unknown[]} C
 * @param {number} lowerBound
 * @param {number} uppperBound
 * @returns {(collection: C) => boolean}
 */
export function isBetween(lowerBound, uppperBound) {
  return (collection) =>
    isLongerThan(lowerBound)(collection) &&
    isShorterThan(uppperBound)(collection);
}

/**
 * isEmpty.
 * @template {string|unknown[]} C
 * @param {C} collection
 * @returns {boolean}
 */
export const isEmpty = isOfLength(0);
/**
 * isNotEmpty.
 * @template {string|unknown[]} C
 * @param {C} collection
 * @returns {boolean}
 */
export const isNotEmpty = isLongerThan(0);
/**
 * isSingle.
 * @template {string|unknown[]} C
 * @param {C} collection
 * @returns {boolean}
 */
export const isSingle = isOfLength(1);
/**
 * isMultiple.
 * @template {string|unknown[]} C
 * @param {C} collection
 * @returns {boolean}
 */
export const isMultiple = isLongerThan(1);

/**
 * isSingleOrEmpty.
 * @template {string|unknown[]} C
 * @param {C} collection
 * @returns {boolean}
 */
export function isSingleOrEmpty(collection) {
  return isEmpty(collection) || isSingle(collection);
}
/**
 * isNotSingle.
 * @template {string|unknown[]} C
 * @param {C} collection
 * @returns {boolean}
 */
export function isNotSingle(collection) {
  return !isSingle(collection);
}

/**
 * indices.
 * @template {string|unknown[]} C
 * @param {C} collection
 * @returns {string | number[] }
 */
export function indices(collection) {
  const n = collection.length;
  const result = Array(n);

  for (let i = 0; i < n; i++) {
    result[i] = i;
  }

  return isString(collection) ? result.join("") : result;
}

/**
 * lastIndex.
 * @template {string|unknown[]} C
 * @param {C} collection
 * @returns {number}
 */
export function lastIndex(collection) {
  return collection.length - 1;
}
