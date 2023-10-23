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

/**
 * mapAsyncIterable.
 * Map operator for AsyncIterable
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
