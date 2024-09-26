/**
 * Creates a higher-order function that wraps an asynchronous function with error handling.
 *
 * @template F, R, E
 * @param {F} f - The asynchronous function to be executed with error handling.
 * @returns {(args: Parameters<F>) => (ifCaughtReturnValue: E | ((...args: Parameters<F>) => E)) => Promise<R | E>}
 *
 * The returned higher-order function takes any arguments for the asynchronous function `f` and returns
 * another function that accepts an optional value or function to be returned in case of an error.
 *
 * @example
 * // Example usage of the tryCatch function
 * async function exampleAsyncFunc(param: number): Promise<string> {
 *   // Async logic here...
 * }
 * const safeAsyncFunc = tryCatch(exampleAsyncFunc);
 * safeAsyncFunc(42)(() => 'default value').then(result => console.log(result));
 */
export function tryCatch(f) {
  return (...args) => async (ifCaughtReturnValue) => {
    try {
      return await f(...args);
    } catch {
      return typeof ifCaughtReturnValue === "function"
        ? await ifCaughtReturnValue(...args)
        : ifCaughtReturnValue;
    }
  };
}
