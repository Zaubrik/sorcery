import { fold } from "../arrays/aggregation.js";
import { appendTo } from "../collections/update.js";
import { isEmpty } from "../collections/length.js";
import { isNull } from "../type.js";
import { throwError } from "../util/error.js";

/**
 * @typedef {Object} Success
 * @property {unknown} value
 * @property {"success"} kind
 */

/**
 * @typedef {Object} Failure
 * @property {unknown} error
 * @property {"failure"} kind
 */

/**
 * @typedef {Success | Failure} Result
 */

/**
 * Create a success result.
 * @param {unknown} value - The value to wrap in a success result.
 * @returns {Success} A success result.
 * @example
 * ```js
 * const result = succeed("value");
 * console.log(result); // { value: "value", kind: "success" }
 * ```
 */
export function succeed(value) {
  return {
    value,
    kind: "success",
  };
}

/**
 * Create a failure result.
 * @param {unknown} error - The error to wrap in a failure result.
 * @returns {Failure} A failure result.
 * @example
 * ```js
 * const result = fail(new Error("Something went wrong"));
 * console.log(result); // { error: Error("Something went wrong"), kind: "failure" }
 * ```
 */
export function fail(error) {
  return {
    error,
    kind: "failure",
  };
}

/**
 * Create a function that returns a failure result if the condition is met.
 * @param {(input: unknown) => boolean} condition - The condition to check.
 * @returns {(error: unknown) => (input: unknown) => Result} A function that checks the condition and returns a result.
 * @example
 * ```js
 * const failIfEmpty = failIf(isEmpty);
 * const result = failIfEmpty("Input is empty")([]);
 * console.log(result); // { error: "Input is empty", kind: "failure" }
 * ```
 */
export function failIf(condition) {
  return (error) => (input) => condition(input) ? fail(error) : succeed(input);
}

export const failIfEmpty = failIf(isEmpty);
export const failIfNull = failIf(isNull);

/**
 * Check if the result is a success.
 * @param {Result} result - The result to check.
 * @returns {boolean} True if the result is a success, false otherwise.
 * @example
 * ```js
 * const result = succeed("value");
 * console.log(isSuccess(result)); // true
 * ```
 */
export function isSuccess(result) {
  return result.kind === "success";
}

/**
 * Check if the result is a failure.
 * @param {Result} result - The result to check.
 * @returns {boolean} True if the result is a failure, false otherwise.
 * @example
 * ```js
 * const result = fail(new Error("Something went wrong"));
 * console.log(isFailure(result)); // true
 * ```
 */
export function isFailure(result) {
  return result.kind === "failure";
}

/**
 * Throw an error for unsupported kinds.
 * @param {string} kind - The unsupported kind.
 * @throws Will throw an error with the unsupported kind message.
 */
export function throwUnsupportedKind(kind) {
  throwError(`Unsupported kind: ${kind}`);
}

/**
 * Apply a function to the value of a success result.
 * @param {(value: unknown) => Promise<unknown>} f - The function to apply.
 * @returns {(result: Promise<Result>) => Promise<Result>} A function that maps the result.
 * @example
 * ```js
 * const result = mapResult(async (value) => value + "!")(Promise.resolve(succeed("Hello")));
 * result.then(console.log); // { value: "Hello!", kind: "success" }
 * ```
 */
export function mapResult(f) {
  return async ($result) => {
    const result = await $result;
    switch (result.kind) {
      case "success":
        return { ...result, value: await f(result.value) };
      case "failure":
        return result;
      default:
        throwUnsupportedKind(result.kind);
    }
  };
}

/**
 * Apply a function to the error of a failure result.
 * @param {(error: unknown) => Promise<unknown>} f - The function to apply.
 * @returns {(result: Promise<Result>) => Promise<Result>} A function that maps the result.
 * @example
 * ```js
 * const result = mapFailure(async (error) => new Error(error.message + "!"))(Promise.resolve(fail(new Error("Oops"))));
 * result.then(console.log); // { error: Error("Oops!"), kind: "failure" }
 * ```
 */
export function mapFailure(f) {
  return async ($result) => {
    const result = await $result;
    switch (result.kind) {
      case "success":
        return result;
      case "failure":
        return { ...result, error: await f(result.error) };
      default:
        throwUnsupportedKind(result.kind);
    }
  };
}

/**
 * Chain a function to the value of a success result.
 * @param {(value: unknown) => Promise<Result>} f - The function to chain.
 * @returns {(result: Promise<Result>) => Promise<Result>} A function that chains the result.
 * @example
 * ```js
 * const result = chainResult(async (value) => succeed(value + "!"))(Promise.resolve(succeed("Hello")));
 * result.then(console.log); // { value: "Hello!", kind: "success" }
 * ```
 */
export function chainResult(f) {
  return async ($result) => {
    const result = await $result;
    switch (result.kind) {
      case "success":
        return await f(result.value);
      case "failure":
        return result;
      default:
        throwUnsupportedKind(result.kind);
    }
  };
}

/**
 * Catch and handle a failure result.
 * @param {(error: unknown) => Promise<Result>} f - The function to handle the error.
 * @returns {(result: Promise<Result>) => Promise<Result>} A function that catches the result.
 * @example
 * ```js
 * const result = catchResult(async (error) => succeed("Recovered"))(Promise.resolve(fail(new Error("Oops"))));
 * result.then(console.log); // { value: "Recovered", kind: "success" }
 * ```
 */
export function catchResult(f) {
  return async ($result) => {
    const result = await $result;
    switch (result.kind) {
      case "success":
        return result;
      case "failure":
        return await f(result.error);
      default:
        throwUnsupportedKind(result.kind);
    }
  };
}

/**
 * Fold a result to handle success and failure cases.
 * @param {(value: unknown) => Promise<unknown>} onSuccess - Function to handle success.
 * @returns {(onFailure: (error: unknown) => Promise<unknown>) => (result: Promise<Result>) => Promise<unknown>} A function that folds the result.
 * @example
 * ```js
 * const result = foldResult(async (value) => `Success: ${value}`)(async (error) => `Error: ${error.message}`)(Promise.resolve(succeed("Hello")));
 * result.then(console.log); // "Success: Hello"
 * ```
 */
export function foldResult(onSuccess) {
  return (onFailure) => async ($result) => {
    const result = await $result;
    switch (result.kind) {
      case "success":
        return await onSuccess(result.value);
      case "failure":
        return await onFailure(result.error);
      default:
        throwUnsupportedKind(result.kind);
    }
  };
}

/**
 * Invert an array of results to a result of an array.
 * @param {...Result} results - The results to invert.
 * @returns {Result} A result of an array.
 * @example
 * ```js
 * const result = invertResults(succeed("aaa"), succeed("bbb"));
 * console.log(result); // { value: ["aaa", "bbb"], kind: "success" }
 * ```
 */
export function invertResults(...results) {
  return fold(async (acc, result) =>
    await chainResult(async (arr) => await mapResult(appendTo(arr))(result))(
      acc,
    )
  )(succeed([]))(results);
}

/**
 * Transform a promise to a result.
 * @param {Promise<unknown>} promise - The promise to transform.
 * @returns {Promise<Result>} A promise of a result.
 * @example
 * ```js
 * const result = transformPromiseToResult(Promise.resolve("Hello"));
 * result.then(console.log); // { value: "Hello", kind: "success" }
 * ```
 */
export function transformPromiseToResult(promise) {
  return promise.then(succeed).catch(fail);
}

/**
 * Transform a result to a promise.
 * @param {Result} result - The result to transform.
 * @returns {Promise<unknown>} A promise of the value or a rejected promise with the error.
 * @example
 * ```js
 * const promise = transformResultToPromise(succeed("Hello"));
 * promise.then(console.log); // "Hello"
 * ```
 */
export async function transformResultToPromise(result) {
  return await foldResult((value) => Promise.resolve(value))((error) =>
    Promise.reject(error)
  )(result);
}

/**
 * Try to execute a function and catch any errors as a result.
 * @param {(input: unknown) => Promise<unknown>} f - The function to execute.
 * @returns {(input: unknown) => Promise<Result>} A function that returns a result.
 * @example
 * ```js
 * const result = tryCatch(async (input) => input + "!")("Hello");
 * result.then(console.log); // { value: "Hello!", kind: "success" }
 * ```
 */
export function tryCatch(f) {
  return async (input) => {
    try {
      return succeed(await f(input));
    } catch (error) {
      return fail(error);
    }
  };
}
