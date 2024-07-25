/**
 * Returns a function that, when called, returns a generator object that is
 * immediately ready for input via `next()`
 */
export function makeObserver(generatorFunction) {
  return function (...args) {
    const generator = generatorFunction(...args);
    generator.next();
    return generator;
  };
}

/**
 * Initializes a controlled generator function that processes values through a
 * given function. The function returns an object that allows sending values to
 * the generator and controlling its execution (including aborting).
 * @param {Function} f - The function to process each input value. It should
 * return a value or a promise that resolves to a value.
 * @returns {{
 *   next: (arg: any) => Promise<IteratorResult<any, any>>,
 *   abort: () => void
 * }} An object with `next` to send values to the generator, and `abort` to stop
 * its execution.
 * @example
 * ```js
 * function addDollar(str) {
 *   return str + "$";
 * }
 * const iterable = queue(addDollar);
 * iterable.next("uno").then(console.log);
 * iterable.next("two").then(console.log);
 * iterable.next("three").then(console.log);
 * iterable.abort();   // Aborts the generator
 * ```
 */
export function queue(f) {
  const controller = new AbortController();
  const { signal } = controller;
  const generator = makeGenerator(f, signal);
  generator.next(); // Start the generator

  return {
    next: (arg) => generator.next(arg),
    abort: () => controller.abort(),
  };
}

/**
 * Creates an asynchronous generator that yields results processed by function `f`.
 * The generator can be externally controlled and is designed to terminate when
 * an abort signal is set.
 * @param {Function} f - The processing function, which receives the current
 * value and its index, and returns a processed result.
 * @param {AbortSignal} signal - An abort signal to terminate the generator execution.
 * @returns {AsyncGenerator<any, void, any>} An asynchronous generator that can be
 * controlled via passed values and an abort signal.
 *
 * @example
 * ```js
 * async function processValue(value, index) {
 *   return new Promise((resolve) =>
 *     setTimeout(() => resolve(`Processed ${value} at index ${index}`), 1000)
 *   );
 * }
 * const genControl = queue(processValue);
 * genControl.next(10).then(console.log);  // "Processed 10 at index 0"
 * genControl.next(20).then(console.log);  // "Processed 20 at index 1"
 * setTimeout(() => {
 *   genControl.abort();
 * }, 2500);  // Will terminate the generator before any more processing
 * ```
 */
export async function* makeGenerator(f, signal) {
  let passedValue;
  let result;
  let i = 0;
  while (true) {
    if (signal.aborted) {
      // Exits the generator function on abort
      return;
    }
    passedValue = yield result;
    result = await f(passedValue, i);
    i++;
  }
}

/**
 * @template T, U
 * @typedef {function(value: T, index: number): U} MapFunction
 */

/**
 * Maps an async iterable using a provided mapping function.
 *
 * @template T, U
 * @param {MapFunction<T, U>} f - The mapping function.
 * @returns {AsyncGenerator<U, void, unknown>} An async generator.
 * ```ts
 * function addDollar(str) {
 *  return str + "$";
 * }
 * const arrS = ["uno", "dos", "tres", "quattro", "cinco"];
 * const iterable = mapAsyncIterable(addDollar)(arrS);
 * console.log(await iterable.next());
 * ```
 * @param {(...arg: any[]) => unknown | Promise<unknown>} callbacks
 */
export function mapAsyncIterable(f) {
  return async function* (asyncIterable) {
    let i = 0;
    for await (let v of asyncIterable) {
      yield await f(v, i);
      i++;
    }
  };
}

/**
 * Runs an async generator to completion.
 *
 * @template T
 * @param {AsyncGenerator<T, void, unknown>} generator - The async generator to run.
 * @returns {Promise<void>} A promise that resolves when the generator has completed.
 */
export async function runAsyncGenerator(generator) {
  for await (let v of gen) {}
}

/**
 * Takes an AsyncIterable or an array containing Promises and returns a
 * Promise<unknown[]> by asynchronously evaluating the values one after one,
 * ensuring that each value is fully awaited before the next one is processed.
 * @param {AsyncIterable<unknown> | unknown[] } iterable
 * @return {Promise<unknown[]>} iterable
 * ```js
 * function addDollar(str) {
 *   return str + "$";
 * }
 * const arrS = ["uno", "dos", "tres", "quattro", "cinco"];
 * const iterable = mapAsyncIterable(addDollar)(arrS);
 * const result = await transformAsyncIterableToPromise(iterable);
 * ```
 */
export async function transformAsyncIterableToPromise(iterable) {
  const result = [];
  for await (const value of iterable) {
    result.push(value);
  }
  return result;
}

/*
 * ```js
 * const arrN = [10, 20, Promise.resolve("Value from promise 1")];
 * const gen = cyclicIterator(arrN);
 * console.log(await gen.next());
 * console.log(await gen.next());
 * console.log(await gen.next());
 * console.log(await gen.next());
 * ```
 */
async function* cyclicIterator(iterable) {
  let index = 0;
  while (true) {
    const resolvedValue = await iterable[index];
    yield resolvedValue;
    index = (index + 1) % iterable.length;
  }
}
