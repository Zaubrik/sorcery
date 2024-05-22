import { equals } from "../booleans/equality.js";
import { identity } from "../higher_order.js";
import { defaultValue } from "../type.js";

/**
 * Takes a callback of three arguments (`acc`, `el`, `i`), an initial value and
 * an array. It returns an accumulated result.
 * ```ts
 * function toUpperCase(acc, el) {
 *   console.log("el:", el);
 *   return acc += el.toUpperCase();
 * }
 * const arrS = ["uno", "dos", "tres", "quattro", "cinco"];
 *  fold(toUpperCase)("initialValue")(arrS); // initialValueUNODOSTRESQUATTROCINCO
 * ```
 */
function fold(f) {
  return (initialValue) => (arr) => {
    let acc = initialValue;
    for (let i = 0; i < arr.length; i++) {
      acc = f(acc, arr[i], i);
    }
    return acc;
  };
}

/**
 * Takes a predicate of three arguments, a callback of three arguments, an initial
 * value and an array. It accumulates its result while the predicate returns `true`.
 * ```ts
 * foldWhile(isString)(toUpperCase)("initialValue")(arrS);
 * ```
 */
function foldWhile(predicate) {
  return (f) => (initialValue) => (arr) => {
    let acc = initialValue;

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (!predicate(acc, item, i)) {
        return acc;
      }
      acc = f(acc, item, i);
    }
    return acc;
  };
}

/**
 * Takes a callback of three arguments and an array. It uses the first element
 * of the array as initial value and returns an accumulated result.
 * ```ts
 * function add(a, b) {
 *   return a + b;
 * }
 * const arrN = [10, 20, 30, 40, 50];
 * reduce(add)(arrN);
 * ```
 */
function reduce(f) {
  return (arr) => {
    let acc = arr[0];

    for (let i = 1; i < arr.length; i++) {
      acc = f(acc, arr[i], i);
    }

    return acc;
  };
}

const count = countBy(identity);

/**
 * Creates an object composed of keys generated from the results of running each
 * element of collection thru iteratee. The corresponding value of each key is
 * the number of times the key was returned by iteratee.
 * @template I,N
 * @param {(item: I) => N} f
 * @returns {(arr: I[]) => Record<string, number>}
 */
function countBy(f) {
  return (arr) => {
    const counts = {};

    for (const item of arr) {
      const key = f(item);
      const currentCount = defaultValue(0)(counts[key]);
      counts[key] = currentCount + 1;
    }

    return counts;
  };
}

/**
 * countIf.
 *
 * @param {} predicate
 */
function countIf(predicate) {
  return (arr) => {
    let counter = 0;

    for (const item of arr) {
      if (predicate(item)) {
        counter += 1;
      }
    }

    return counter;
  };
}

/**
 * countOf.
 *
 * @param {} value
 */
function countOf(value) {
  return (arr) => countIf(equals(value))(arr);
}

/**
 * min.
 *
 * @param {} arr
 */
function min(arr) {
  if (arguments.length > 1) {
    return min(Array.prototype.slice.call(arguments));
  }

  return Math.min(...arr);
}

/**
 * minBy.
 *
 * @param {} f
 */
function minBy(f) {
  return (arr) => {
    let lowestScore = Number.POSITIVE_INFINITY;
    let index = -1;

    for (let i = 0; i < arr.length; i++) {
      const score = f(arr[i]);

      if (score < lowestScore) {
        lowestScore = score;
        index = i;
      }
    }

    return arr[index];
  };
}

/**
 * max.
 *
 * @param {} arr
 */
function max(arr) {
  if (arguments.length > 1) {
    return max(Array.prototype.slice.call(arguments));
  }

  return Math.max(...arr);
}

/**
 * maxBy.
 *
 * @param {} f
 */
function maxBy(f) {
  return (arr) => {
    let highestScore = Number.NEGATIVE_INFINITY;
    let index = -1;

    for (let i = 0; i < arr.length; i++) {
      const score = f(arr[i]);

      if (score > highestScore) {
        highestScore = score;
        index = i;
      }
    }

    return arr[index];
  };
}

/**
 * sumBy.
 *
 * @param {} f
 */
function sumBy(f) {
  return (xs) => fold((acc, x) => acc + f(x))(0)(xs);
}

const sum = sumBy(identity);

/**
 * productBy.
 *
 * @param {} f
 */
function productBy(f) {
  return (xs) => fold((acc, x) => acc * f(x))(1)(xs);
}

const product = productBy(identity);

export {
  count,
  countBy,
  countIf,
  countOf,
  fold,
  foldWhile,
  max,
  maxBy,
  min,
  minBy,
  product,
  productBy,
  reduce,
  sum,
  sumBy,
};
