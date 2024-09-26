import { isSingle } from "../collection/length.js";
import { isArray, isNull } from "../validation/type.js";
import { not } from "../boolean/negation.js";
import { propertyEquals } from "../object/membership.js";

function filter(predicate) {
  return (arr) => arr.filter(predicate);
}

function filterIndices(predicate) {
  return (arr) => {
    const indices = [];

    for (let i = 0; i < arr.length; i++) {
      if (predicate(arr[i])) {
        indices.push(i);
      }
    }

    return indices;
  };
}

function exclude(predicate) {
  return (arr) => arr.filter(not(predicate));
}

function excludeNull(input) {
  if (isSingle(arguments)) {
    if (isNull(input)) {
      return [];
    } else if (isArray(input)) {
      return exclude(isNull)(input);
    } else {
      return [input];
    }
  } else {
    return excludeNull(Array.prototype.slice.call(arguments));
  }
}

function removeDuplicates(arr) {
  return Array.from(new Set(arr));
}

function removeDuplicatedProperties(key) {
  return (arr) => {
    return arr.reduce((acc, obj, i, arr) => {
      if (acc.some((o) => o[key] === obj[key])) {
        return acc;
      } else {
        acc.push(obj);
        return acc;
      }
    }, []);
  };
}

export function filterForPropertyEquals(property) {
  return (array) => (value) =>
    array.filter((obj) => propertyEquals(property)(value)(obj));
}

export {
  exclude,
  excludeNull,
  filter,
  filterIndices,
  removeDuplicatedProperties,
  removeDuplicates,
};
