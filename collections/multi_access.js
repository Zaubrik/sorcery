import { head, last } from "./single_access.js";
import { lastIndex, length } from "./length.js";
import { findIndex } from "../arrays/search.js";
import { isNull } from "../type.js";
import { inclusiveRange, range } from "../arrays/creation.js";

function slice(indices) {
  return (input) => {
    const n = length(indices);

    const result = Array(n);

    for (let i = 0; i < n; i++) {
      result[i] = input[indices[i]];
    }

    return result;
  };
}

function tail(input) {
  const length = input.length;
  if (length <= 1) {
    return [];
  }

  const tailLength = length - 1;

  const res = Array(tailLength);

  for (let i = 0; i < tailLength; i++) {
    res[i] = input[i + 1];
  }

  return res;
}

function headAndTail(input) {
  return [head(input), tail(input)];
}

function init(input) {
  let size = input.length - 1;

  const res = Array(size);

  for (let i = 0; i < size; i++) {
    res[i] = input[i];
  }

  return res;
}

function initAndLast(input) {
  return [init(input), last(input)];
}

function take(n) {
  return (input) => input.slice(0, n);
}

function takeFrom(input) {
  return (n) => take(n)(input);
}

function takeLast(n) {
  return (input) => input.slice(Math.max(input.length - n, 0));
}

function takeLastFrom(input) {
  return (n) => takeLast(n)(input);
}

function takeWhile(predicate) {
  return (input) => {
    const res = [];
    for (let i = 0; i < input.length; i++) {
      const item = input[i];
      if (!predicate(item, i)) {
        return res;
      }

      res.push(item);
    }

    return res;
  };
}

function drop(n) {
  return (input) => input.slice(n);
}

function dropFrom(input) {
  return (n) => drop(n)(input);
}

function dropLast(n) {
  return (input) => input.slice(0, -n);
}

function dropLastFrom(input) {
  return (n) => dropLast(n)(input);
}

function dropWhile(predicate) {
  return (input) => {
    let dropped = 0;
    while (dropped < input.length) {
      const item = input[dropped];
      if (predicate(item, dropped)) {
        dropped++;
      } else {
        break;
      }
    }

    return input.slice(dropped);
  };
}

function before(predicate) {
  return (input) => {
    const index = findIndex(predicate)(input);

    if (isNull(index)) {
      return [];
    }

    return beforeIndex(index)(input);
  };
}

function beforeIndex(index) {
  return (collection) => {
    if (index > lastIndex(collection)) {
      return collection;
    }

    return slice(range(0)(index))(collection);
  };
}

function after(predicate) {
  return (collection) => {
    const index = findIndex(predicate)(collection);

    if (isNull(index)) {
      return [];
    }

    return afterIndex(index)(collection);
  };
}

function afterIndex(index) {
  return (collection) => {
    if (index >= lastIndex(collection)) {
      return [];
    }

    return slice(range(index + 1)(length(collection)))(collection);
  };
}

function beforeAndAfterIndex(index) {
  return (collection) => {
    const before = beforeIndex(index)(collection);
    const after = afterIndex(index)(collection);

    return [before, after];
  };
}

function upTo(predicate) {
  return (collection) => {
    const index = findIndex(predicate)(collection);

    if (isNull(index)) {
      return [];
    }

    return upToIndex(index)(collection);
  };
}

function upToIndex(index) {
  return (collection) => {
    if (index >= lastIndex(collection)) {
      return collection;
    }

    return slice(inclusiveRange(0)(index))(collection);
  };
}

export {
  after,
  afterIndex,
  before,
  beforeAndAfterIndex,
  beforeIndex,
  drop,
  dropFrom,
  dropLast,
  dropLastFrom,
  dropWhile,
  headAndTail,
  init,
  initAndLast,
  slice,
  tail,
  take,
  takeFrom,
  takeLast,
  takeLastFrom,
  takeWhile,
  upTo,
  upToIndex,
};
