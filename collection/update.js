import { isString } from "../validation/type.js";
import { equals } from "../boolean/equality.js";
import { exclude } from "../array/filtering.js";
import { indexOf } from "../array/search.js";
import { throwError } from "../util/error.js";

/**
 * update.
 * @param {number} index
 */
function update(index) {
  /** @param {any} item */
  return (item) =>
  /**
   * @template C
   * @param {C[]} arr
   * @returns {C[]}
   */
  (arr) => {
    const copy = arr.slice();
    copy[index] = item;
    return copy;
  };
}

/**
 * updateBy.
 * @param {} f
 */
function updateBy(f) {
  return (index) => (arr) => {
    const copy = arr.slice();
    copy[index] = f(arr[index]);
    return copy;
  };
}

/**
 * swap.
 * @param {} first
 */
function swap(first) {
  return (second) => (arr) => {
    if (first >= second) {
      throwError("The second index must be greater than the first index.");
    }

    const beforeFirst = arr.slice(0, first);
    const between = arr.slice(first + 1, second);
    const afterSecond = arr.slice(second + 1);

    return [
      ...beforeFirst,
      arr[second],
      ...between,
      arr[first],
      ...afterSecond,
    ];
  };
}

/**
 * append.
 * @param {} appendix
 */
function append(appendix) {
  return (original) => {
    if (isString(original)) {
      return original + appendix;
    } else {
      return [...original, appendix];
    }
  };
}

/**
 * appendTo.
 * @param {} original
 */
function appendTo(original) {
  return (appendix) => append(appendix)(original);
}

/**
 * prepend.
 * @param {} prefix
 */
function prepend(prefix) {
  return (original) => {
    if (isString(original)) {
      return prefix + original;
    } else {
      return [prefix, ...original];
    }
  };
}

/**
 * prependTo.
 * @param {} original
 */
function prependTo(original) {
  return (prefix) => prepend(prefix)(original);
}

/**
 * insertAt.
 * @param {} index
 */
function insertAt(index) {
  return (item) => (arr) => {
    const before = arr.slice(0, index);
    const after = arr.slice(index);

    return [
      ...before,
      item,
      ...after,
    ];
  };
}

/**
 * replaceAt.
 * @param {} index
 */
function replaceAt(index) {
  return (item) => (arr) => removeAt(index + 1)(insertAt(index)(item)(arr));
}

/**
 * remove.
 * @param {} item
 */
function remove(item) {
  return (arr) => exclude(equals(item))(arr);
}

/**
 * removeAt.
 * @param {} index
 */
function removeAt(index) {
  return (arr) => {
    const copy = arr.slice();
    copy.splice(index, 1);

    return copy;
  };
}

/**
 * removeFirstOccurrence.
 * @param {} item
 */
function removeFirstOccurrence(item) {
  return (arr) => {
    const index = indexOf(item)(arr);

    return removeAt(index)(arr);
  };
}

/**
 * removeLastOccurrence.
 * @param {} item
 */
function removeLastOccurrence(item) {
  return (arr) => {
    const index = indexOf(item)(arr);

    return removeAt(index)(arr);
  };
}

/**
 * reverse.
 * @param {} input
 */
function reverse(input) {
  const inputLength = input.length;
  const reversedArray = Array(inputLength);

  for (let i = 0; i < inputLength; i++) {
    reversedArray[i] = input[inputLength - i - 1];
  }

  return reversedArray;
}

export {
  append,
  appendTo,
  insertAt,
  prepend,
  prependTo,
  remove,
  removeAt,
  removeFirstOccurrence,
  removeLastOccurrence,
  reverse,
  swap,
  update,
  updateBy,
};
