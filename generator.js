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
    for await (let v of asyncIterable) {
      yield await f(v);
    }
  };
}
