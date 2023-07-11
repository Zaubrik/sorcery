import { isEmpty, isSingle } from "./length.js";
import { throwError } from "../util/error.js";

/**
 * getItem.
 * @param {number} index
 */
export function getItem(index) {
  /**
   * getItem.
   * @template {unknown[]} C
   * @param {C} arr
   * @returns {C[number]}
   */
  return (arr) => arr[index];
}

/**
 * first.
 * @template {unknown[]} C
 * @param {C} collection
 * @returns {C[number]}
 */
export function first(collection) {
  return collection[0];
}

export const head = first;

/**
 * second.
 * @template {unknown[]} C
 * @param {C} collection
 * @returns {C[number]}
 */
export function second(collection) {
  return collection[1];
}

/**
 * last.
 * @template {unknown[]} C
 * @param {C} collection
 * @returns {C[number]}
 */
export function last(collection) {
  return collection[collection.length - 1];
}

/**
 * single.
 * @template {unknown[]} C
 * @param {C} arr
 * @returns {C[number]}
 */
export function single(arr) {
  if (isSingle(arr)) {
    return arr[0];
  } else if (isEmpty(arr)) {
    throwError(`Expected a single item. Found no items.`);
  } else {
    throwError(`Expected a single search result. Found no items.`);
  }
}
