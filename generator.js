/**
 * Returns a function that, when called, returns a generator object that is
 * immediately ready for input via `next()`
 */
export function makeObserver(generatorFunction) {
  return function (...args) {
    const generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

/**
 * const queue = makeQueue(console.log)
 * queue.next(10)
 * queue.next(20)
 */
export function makeQueue(...callbacks) {
  async function* makeGenerator(callbacks) {
    while (true) {
      const request = yield;
      for (const callback of callbacks) {
        await callback(request);
      }
    }
  }
  const generatorObject = makeGenerator(callbacks);
  generatorObject.next();
  return generatorObject;
}
