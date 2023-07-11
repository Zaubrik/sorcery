import { isEmpty } from "../collections/length.js";
import { isNumber } from "../type.js";

function sort(arr) {
  const copy = arr.slice();

  if (isEmpty(arr)) {
    return copy;
  }

  if (isNumber(arr[0])) {
    return copy.sort((a, b) => a - b);
  }

  return copy.sort();
}

function sortDescendingly(arr) {
  const copy = arr.slice();

  if (isEmpty(arr)) {
    return copy;
  }

  if (isNumber(arr[0])) {
    return copy.sort((a, b) => -(a - b));
  }

  return copy.sort((a, b) => (a > b ? -1 : 1));
}

function sortBy(f) {
  return (arr) => arr.slice().sort((a, b) => f(a) - f(b));
}

function sortDescendinglyBy(f) {
  return (arr) => arr.slice().sort((a, b) => -(f(a) - f(b)));
}

export { sort, sortBy, sortDescendingly, sortDescendinglyBy };
