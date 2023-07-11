import { isObject } from "../type.js";

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
 * hasPropertyOf.
 * @template {string} K
 * @param {Record<string,unknown>} obj
 * @returns {(key: K) => obj is { [key in K]: unknown }}
 */
export function hasPropertyOf(obj) {
  /** @return {obj is { [key in K]: unknown }} */
  return (key) => key in obj;
}

/**
 * hasNotPropertyOf.
 * @template {Record<string,unknown>} O
 * @param {O} obj
 * @returns {(key: string) => obj is O}
 */
export function hasNotPropertyOf(obj) {
  /** @return {obj is O} */
  return (key) => key in obj;
}

/**
 * isObjectAndHasProp.
 * @template {string} K
 * @param {unknown} obj
 * @returns {(key: K) => obj is { [key in K]: unknown }}
 */
export function isObjectAndHasProp(obj) {
  /** @return {obj is { [key in K]: unknown }} */
  return (key) => isObject(obj) && hasProperty(key)(obj);
}

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
 * isEmpty.
 * @param {Record<string, unknown>} obj
 * @returns {obj is Record<string, never>}
 */
export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
// function isEmpty<O extends Record<string, string>>(obj: O): obj is O {
