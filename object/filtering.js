import { not } from "../boolean/negation.js";

function filterKeys(predicate) {
  return (obj) => {
    const result = {};

    const entries = Object.entries(obj);
    for (const entry of entries) {
      const [key, value] = entry;

      if (predicate(key)) {
        result[key] = value;
      }
    }

    return result;
  };
}

function excludeKeys(predicate) {
  return filterKeys(not(predicate));
}

function filterValues(predicate) {
  return (obj) => {
    const result = {};

    const entries = Object.entries(obj);
    for (const entry of entries) {
      const [key, value] = entry;

      if (predicate(value)) {
        result[key] = value;
      }
    }

    return result;
  };
}

function excludeValues(predicate) {
  return filterValues(not(predicate));
}

export { excludeKeys, excludeValues, filterKeys, filterValues };
