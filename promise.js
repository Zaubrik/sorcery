import { isArray, isFunction } from "./type.js";
import { first } from "./collections/single_access.js";
import { isSingle } from "./collections/length.js";
import { map } from "./arrays/mapping.js";

function resolve(value) {
  return Promise.resolve(value);
}

function reject(reason) {
  return Promise.reject(reason);
}

function parallel(...promises) {
  if (isSingle(promises)) {
    const firstItem = first(promises);

    if (isArray(firstItem)) {
      return parallel(...firstItem);
    }
  }

  return Promise.all(promises);
}

function mapFulfilled(functionOrValue) {
  return (promise) =>
    promise.then(
      isFunction(functionOrValue) ? functionOrValue : () => functionOrValue,
    );
}

function mapPromise(ifFulfilled) {
  return (ifRejected) => (promise) =>
    promise.then(
      isFunction(ifFulfilled) ? ifFulfilled : () => ifFulfilled,
      isFunction(ifRejected) ? ifRejected : () => ifRejected,
    );
}

function parallelMap(f) {
  return (arr) => parallel(map(f)(arr));
}
