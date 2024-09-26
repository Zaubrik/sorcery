import { isSingle } from "../collection/length.js";
import { isArray, isNull, isObject, isUndefined } from "../validation/type.js";
import { fold } from "../array/aggregation.js";
import { zip } from "../array/join.js";
import { fromEntries } from "./creation.js";
import { single } from "../collection/single_access.js";

/**
 * Merges multiple objects or arrays into one object.
 *
 * @example
 * ```js
 * const obj = {
 *   a: 10,
 *   b: 20,
 *   c: 30,
 *   d: { e: 40, l: "ll", f: { a: "a", b: "b" } },
 * };
 * const obj2 = { b: "b", d: { e: "e" }, z: { e: "e" }, f: { b: "zz" } };
 * const result = merge(obj, obj2);
 * // result = {
 * //   a: 10,
 * //   b: "b",
 * //   c: 30,
 * //   d: { e: "e", l: "ll", f: { a: "a", b: "b" } },
 * //   z: { e: "e" },
 * //   f: { b: "zz" }
 * // }
 * ```
 *
 * @param {...(Object|Array)} objectsOrArray - The objects or arrays to merge.
 * @returns {Object} - The merged object.
 * @throws {Error} - If an invalid type is encountered.
 */
export function merge(...objectsOrArray) {
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

/**
 * Creates a merging function with a custom merge strategy.
 *
 * @param {Function} f - The custom merge strategy function.
 * @returns {Function} - A function that merges objects or arrays using the
 * custom strategy.
 * @throws {Error} - If an invalid type is encountered.
 */
export function mergeWith(f) {
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

/**
 * Extends an object with the properties of another object.
 *
 * @param {Object} b - The object to extend with.
 * @returns {Function} - A function that takes an object to be extended.
 */
export function extend(b) {
  return (a) => ({
    ...a,
    ...(b ?? {}),
  });
}

/**
 * Extends an object with the properties of another object using a custom
 * merge strategy.
 *
 * @param {Function} f - The custom merge strategy function.
 * @returns {Function} - A function that takes an object to be extended.
 */
export function extendWith(f) {
  return (b) => (a) => {
    const definiteB = b ?? {};

    const result = { ...a };

    for (const [key, value] of Object.entries(definiteB)) {
      result[key] = result.hasOwnProperty(key) ? f(result[key])(value) : value;
    }

    return result;
  };
}

/**
 * Creates an object from two arrays, one of keys and one of values.
 *
 * @param {Array} as - The array of keys.
 * @returns {Function} - A function that takes an array of values.
 */
export function zipObject(as) {
  return (bs) => fromEntries(zip(as, bs));
}

/**
 * Deeply merges the source object into the target object.
 *
 * @param {Object} target - The target object to merge into.
 * @param {Object} source - The source object to merge from.
 * @returns {Object} - The merged object.
 * @throws {TypeError} - If target or source is not an object.
 */
export function baseDeepMerge(target, source) {
  if (!isObject(target)) {
    target = {};
  }
  if (!isObject(source)) {
    return target;
  }

  for (const key of Object.keys(source)) {
    if (isObject(source[key])) {
      if (!target[key]) {
        Object.assign(target, { [key]: {} });
      }
      baseDeepMerge(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
}

/**
 * Curried function that deeply merges two objects.
 *
 * @example
 * ```js
 * const base = { a: 1, b: { c: 3 } };
 * const custom = { b: { d: 4 }, e: 5 };
 * const mergeFn = deepMerge(base);
 * const result = mergeFn(custom);
 * // result = { a: 1, b: { c: 3, d: 4 }, e: 5 }
 * ```
 * @param {Object} target - The target object to merge into.
 * @returns {Function} - A function that takes the source object to merge from.
 */
export function deepMerge(target) {
  return (source) => baseDeepMerge(target, source);
}

/**
 * Deeply merges multiple objects into a single object.
 * @param {...Object} objects - The objects to merge.
 * @returns {Object} - The merged object.
 * @example
 * ```js
 * const baseNameObject = {
 *   kind: "input",
 *   label: "Name",
 *   id: "name",
 *   attr: {
 *     type: "text",
 *     placeholder: "Max Muster",
 *     minlength: "2",
 *     maxlength: "100",
 *     required: "",
 *   },
 *   test: { a: "b" },
 * };
 * const customProperties = {
 *   label: "Custom Name",
 *   attr: {
 *     placeholder: "John Doe",
 *     maxlength: "50",
 *   },
 *   test: 10,
 * };
 * const result = deepMergeMultiple(baseNameObject, customProperties);
 * ```
 */
export function deepMergeMultiple(...objects) {
  return objects.reduce((acc, obj) => baseDeepMerge(acc, obj), {});
}
