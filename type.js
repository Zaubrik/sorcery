/**
 * isDefined.
 * @param {unknown} input
 * @returns {boolean}
 */
export function isDefined(input) {
  return input !== undefined;
}

/**
 * isUndefined.
 * @param {unknown} input
 * @returns {input is undefined}
 */
export function isUndefined(input) {
  return input === undefined;
}

/**
 * isNull.
 * @param {unknown} input
 * @returns {input is null}
 */
export function isNull(input) {
  return input === null;
}

/**
 * isNotNull.
 * @param {unknown} input
 * @returns {boolean}
 */
export function isNotNull(input) {
  return input !== null;
}

/**
 * isBoolean.
 * @param {unknown} input
 * @returns {input is boolean}
 */
export function isBoolean(input) {
  return input === false || input === true;
}

/**
 * isNumber.
 * @param {unknown} input
 * @returns {input is number}
 */
export function isNumber(input) {
  return typeof input === "number";
}

/**
 * isString.
 * @param {unknown} input
 * @returns {input is string}
 */
export function isString(input) {
  return typeof input === "string";
}

/**
 * Checks if the provided input is a function.
 * @param {unknown} input - The input to check.
 * @returns {boolean} - True if the input is a function, false otherwise.
 */
export function isFunction(input) {
  return typeof input === "function";
}

/**
 * isFunction.
 * https://github.com/microsoft/TypeScript/pull/23039
 * @template T
 * @param {T} input
 * @returns {value is Extract<T, Function>}
 */
export function isNarrowedFunction(input) {
  return typeof input === "function";
}

/**
 * Removes falsey values.
 * https://github.com/robertmassaioli/ts-is-present/blob/master/src/index.ts
 * ```js
 * const foo: = [2,3, null, 4];
 * const bar = foo.filter(isPresent); // number[]
 * ```
 * @template T
 * @param {T|undefined|null} input
 * @returns {input is T}
 */
export function isPresent(input) {
  return input !== undefined && input !== null;
}

/**
 * isObject.
 * @param {unknown} input
 * @returns {input is Record<string, any>}
 */
export function isObject(input) {
  return (
    input !== null && typeof input === "object" &&
    Array.isArray(input) === false
  );
}

/**
 * isArray.
 * @template T
 * @param {T[] | unknown} input
 * @returns {input is T[]}
 */
export function isArray(input) {
  return Array.isArray(input);
}

/**
 * is2DArray.
 * @template T
 * @param {T[][] | unknown} input
 * @returns {input is T[][]}
 */
export function is2DArray(input) {
  return isArray(input) && isArray(input[0]);
}

/**
 * defaultValue.
 * @template T,I
 * @param {T} value
 * @returns {(input: I) => T | I}
 */
export function defaultValue(value) {
  return (input) => input ?? value;
}

/**
 * isResponse.
 * @param {unknown} input
 * @returns {input is Response}
 */
export function isResponse(input) {
  return input instanceof Response;
}

/**
 * isError.
 * @param {unknown} input
 * @returns {input is Error}
 */
export function isError(input) {
  return input instanceof Error;
}

/**
 * isUrl.
 * @param {unknown} input
 * @returns {input is URL}
 */
export function isUrl(input) {
  return input instanceof URL;
}

/**
 * isRegExp.
 * @param {unknown} input
 * @returns {input is RegExp}
 */
export function isRegExp(input) {
  return input instanceof RegExp;
}

/**
 * isUrlString.
 * @param {unknown} input
 * @returns {input is string}
 */
export function isUrlString(input) {
  try {
    const url = new URL(input);
    return true;
  } catch {
    return false;
  }
}
