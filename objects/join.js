import { isSingle } from "../collections/length.js";
import { isArray, isNull, isObject, isUndefined } from "../type.js";
import { fold } from "../arrays/aggregation.js";
import { zip } from "../arrays/join.js";
import { fromEntries } from "./creation.js";
import { single } from "../collections/single_access.js";

/**
 * ```js
 * const obj = {
 *   a: 10,
 *   b: 20,
 *   c: 30,
 *   d: { e: 40, l: "ll", f: { a: "a", b: "b" } },
 * };
 * const obj2 = { b: "b", d: { e: "e" }, z: { e: "e" }, f: { b: "zz" } };
 * ```
 */
function merge(...objectsOrArray) {
  if (isSingle(objectsOrArray)) {
    const singleItem = single(objectsOrArray);

    if (isNull(singleItem) || isUndefined(singleItem)) {
      return {};
    } else if (isArray(singleItem)) {
      return merge(...singleItem);
    } else if (isObject(singleItem)) {
      return singleItem;
    } else {
      throw Error(
        `Expected either an array, an object, null or undefined. Received: ${singleItem}`,
      );
    }
  } else {
    return fold((acc, obj) =>
      (isNull(obj) || isUndefined(obj)) ? acc : { ...acc, ...obj }
    )({})(objectsOrArray);
  }
}

function mergeWith(f) {
  return (...objectsOrArray) => {
    if (isSingle(objectsOrArray)) {
      const singleItem = single(objectsOrArray);

      if (isArray(singleItem)) {
        return mergeWith(f)(...singleItem);
      } else if (isObject(singleItem)) {
        return singleItem;
      } else if (isNull(singleItem) || isUndefined(singleItem)) {
        return {};
      } else {
        throw Error(
          `Expected either an array, an object, null or undefined. Received: ${singleItem}`,
        );
      }
    } else {
      return fold((acc, item) => {
        if (isNull(item) || isUndefined(item)) {
          return acc;
        }

        const merged = { ...acc };

        for (const [itemKey, itemValue] of Object.entries(item)) {
          merged[itemKey] = acc.hasOwnProperty(itemKey)
            ? f(acc[itemKey])(itemValue)
            : itemValue;
        }

        return merged;
      })({})(objectsOrArray);
    }
  };
}

function extend(b) {
  return (a) => ({
    ...a,
    ...(b ?? {}),
  });
}

function extendWith(f) {
  return (b) => (a) => {
    const definiteB = b ?? {};

    const result = { ...a };

    for (const [key, value] of Object.entries(definiteB)) {
      result[key] = result.hasOwnProperty(key) ? f(result[key])(value) : value;
    }

    return result;
  };
}

function zipObject(as) {
  return (bs) => fromEntries(zip(as, bs));
}

export { extend, extendWith, merge, mergeWith, zipObject };
