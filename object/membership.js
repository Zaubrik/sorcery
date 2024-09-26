import { isObject } from "../validation/type.js";
import { all } from "../boolean/all.js";
import { flip } from "../higher_order/manipulation.js";

/**
 * hasProperty.
 * @template {string} K
 * @param {K} key
 * @returns {(obj: Record<string,unknown>) => obj is { [key in K]: unknown }}
 */
export function hasProperty(key) {
  /** @return {obj is { [key in K]: unknown }} */
  return (obj) => key in obj;
}

/**
 * hasPropertyOf.
 * @template {string} K
 * @param {Record<string, unknown>} obj
 * @returns {(key: K) => obj is { [key in K]: unknown }}
 */
export const hasPropertyOf = flip(hasProperty);

/**
 * hasNotProperty.
 * @template {Record<string,unknown>} O
 * @param {string} key
 * @returns {(obj: O) => obj is O}
 */
export function hasNotProperty(key) {
  /** @return {obj is O} */
  return (obj) => key in obj;
}

/**
 * hasNotPropertyOf.
 * @template {Record<string,unknown>} O
 * @param {O} obj
 * @returns {(key: string) => obj is O}
 */
export const hasNotPropertyOf = flip(hasNotProperty);

/**
 * Checks if an object's property satisfies all additional predicates.
 * @template {string} K
 * @param {...(value: unknown) => boolean} predicates
 * @returns {(key: K) => (obj: Record<string, unknown>) => boolean}
 */
export function hasPropertyAndAll(...predicates) {
  return (key) => {
    const hasKey = hasProperty(key);
    const allConditionsPass = all(...predicates);
    return (obj) => {
      const propertyValue = obj[key];
      if (!hasKey(obj)) {
        return false;
      }
      return allConditionsPass(propertyValue);
    };
  };
}

/**
 * Checks if a specific property in an object satisfies all additional predicates.
 * @template {string} K
 * @param {...(value: unknown) => boolean} predicates
 * @returns {(obj: Record<string, unknown>) => (key: K) => boolean}
 */
export function hasPropertyOfAndAll(...predicates) {
  return (obj) => {
    return (key) => {
      const hasKey = hasProperty(key);
      const allConditionsPass = all(...predicates);
      const propertyValue = obj[key];
      if (!hasKey(obj)) {
        return false;
      }
      return allConditionsPass(propertyValue);
    };
  };
}

/**
 * isObjectAndHasProperty.
 * @template {string} K
 * @param {K} key
 * @returns {(obj: unknown) => obj is { [key in K]: unknown }}
 */
export function isObjectAndHasProperty(key) {
  /** @return {obj is { [key in K]: unknown }} */
  return (obj) => isObject(obj) && hasProperty(key)(obj);
}

/**
 * isObjectAndHasPropertyOf.
 * @template {string} K
 * @param {unknown} obj
 * @returns {(key: K) => obj is { [key in K]: unknown }}
 */
export const isObjectAndHasPropertyOf = flip(isObjectAndHasProperty);

/**
 * propertyEquals.
 * @template {unknown} V
 * @param {string} property
 * @returns {(value: V) => (obj: Record<string, unknown>) => boolean}
 */
export function propertyEquals(property) {
  return (value) => (obj) => obj[property] === value;
}

/**
 * isEmptyObject.
 * @param {Record<string, unknown>} obj
 * @returns {obj is Record<string, never>}
 */
export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

/**
 * Counts the number of enumerable properties in an object.
 *
 * @param {Object} obj - The object whose properties are to be counted.
 * @returns {number} - The number of enumerable properties in the object.
 */
export function countProperties(obj) {
  return Object.keys(obj).length;
}

/**
 * Returns a function that checks whether the number of properties in an object
 * matches the provided number.
 *
 * @param {number} expectedCount - The number of properties to check for.
 * @returns {(obj: object) => boolean} - A function that takes an object and returns a boolean.
 */
export function propertiesCountEquals(expectedCount) {
  return (obj) => Object.keys(obj).length === expectedCount;
}
