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
 * makeQueue
 * ```ts
 * const queue = makeQueue(console.log)
 * queue.next(10)
 * queue.next(20)
 * ```
 * @param {(...arg: any[]) => unknown | Promise<unknown>[]} callbacks
 * @returns {Generator}
 */
export function makeQueue(...callbacks) {
  async function* makeGenerator() {
    while (true) {
      const request = yield;
      for (const callback of callbacks) {
        await callback(request);
      }
    }
  }
  const generator = makeGenerator();
  generator.next();
  return generator;
}

export function delay(valueOrFunction, duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(
      async () =>
        resolve(
          typeof valueOrFunction === "function"
            ? await valueOrFunction()
            : valueOrFunction,
        ),
      duration,
    );
  });
}

/**
 * ```js
 * function addDollar(str) {
 *   return str + "$";
 * }
 * const iterable = queue(addDollar);
 * await iterable.next("uno");
 * await iterable.next("two");
 * await iterable.next("three");
 * ```
 */
export function queue(f) {
  async function* makeGenerator() {
    let passedValue;
    let result;
    let i = 0;
    while (true) {
      passedValue = yield result;
      result = await f(passedValue, i);
      i++;
    }
  }
  const generator = makeGenerator();
  generator.next();
  return generator;
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
