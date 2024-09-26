import { filterIndices } from "./filtering.js";
import { equals } from "../boolean/equality.js";
import { isNull } from "../validation/type.js";

function findSingleOrNull(predicate) {
  return (input) => {
    const matches = input.filter(predicate);

    const numberOfResults = matches.length;

    if (numberOfResults === 0) {
      return null;
    } else if (numberOfResults === 1) {
      return matches[0];
    } else {
      throw Error(
        `Expected one or no search results. Found ${numberOfResults} matching items.`,
      );
    }
  };
}

function findSingle(predicate) {
  return (input) => {
    const singleOrNull = findSingleOrNull(predicate)(input);

    if (isNull(singleOrNull)) {
      throw Error(`Expected a single search result. Found no matching items.`);
    }

    return singleOrNull;
  };
}

function findSingleIndexOrNull(predicate) {
  return (arr) => {
    const matches = [];
    for (let i = 0; i < arr.length; i++) {
      if (predicate(arr[i])) {
        matches.push(i);
      }
    }

    const numberOfResults = matches.length;

    if (numberOfResults === 0) {
      return null;
    } else if (numberOfResults === 1) {
      return matches[0];
    } else {
      throw Error(
        `Expected a single search result. Found ${numberOfResults} matching items.`,
      );
    }
  };
}

function findSingleIndex(predicate) {
  return (arr) => {
    const indexOrNull = findSingleIndexOrNull(predicate)(arr);

    if (isNull(indexOrNull)) {
      throw Error(`Expected a single search result. Found no matching items.`);
    }

    return indexOrNull;
  };
}

function find(predicate) {
  return (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (predicate(item)) {
        return item;
      }
    }
    return null;
  };
}

function findLast(predicate) {
  return (input) => {
    for (let i = input.length - 1; i >= 0; i--) {
      const item = input[i];

      if (predicate(item)) {
        return item;
      }
    }

    return null;
  };
}

function findIndex(predicate) {
  return (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (predicate(arr[i])) {
        return i;
      }
    }
    return null;
  };
}

function findLastIndex(predicate) {
  return (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (predicate(arr[i])) {
        return i;
      }
    }
    return null;
  };
}

function indexOf(item) {
  return (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (item === arr[i]) {
        return i;
      }
    }
    return null;
  };
}

function lastIndexOf(item) {
  return (arr) => {
    for (let i = arr.length - 1; i < arr.length; i--) {
      if (item === arr[i]) {
        return i;
      }
    }
    return null;
  };
}

function indicesOf(item) {
  return (arr) => filterIndices(equals(item))(arr);
}

export {
  find,
  findIndex,
  findLast,
  findLastIndex,
  findSingle,
  findSingleIndex,
  findSingleIndexOrNull,
  findSingleOrNull,
  indexOf,
  indicesOf,
  lastIndexOf,
};
