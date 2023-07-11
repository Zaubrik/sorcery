import { isSingle } from "../collections/length.js";
import { first, single } from "../collections/single_access.js";
import { isArray } from "../type.js";

function keys(obj) {
  return Object.keys(obj);
}

function values(obj) {
  return Object.values(obj);
}

function entries(obj) {
  return Object.keys(obj)
    .map((key) => [key, obj[key]]);
}

function property(key, defaultValue) {
  return (obj) => obj.hasOwnProperty(key) ? obj[key] : defaultValue;
}

function propertyOf(obj, defaultValue) {
  return (key) => property(key, defaultValue)(obj);
}

function properties(...keys) {
  return (obj) => {
    if (isSingle(keys)) {
      const singleItem = single(keys);

      if (isArray(singleItem)) {
        return properties(...singleItem)(obj);
      }
    }

    const result = [];

    for (let i = 0; i < keys.length; i++) {
      result[i] = obj[keys[i]];
    }

    return result;
  };
}

function propertiesOf(obj) {
  return (keys) => properties(keys)(obj);
}

function omit(...omittedKeys) {
  if (isSingle(omittedKeys)) {
    const firstItem = first(omittedKeys);

    if (isArray(firstItem)) {
      return omit(...firstItem);
    }
  }

  return (obj) => {
    const partialObject = {};

    const keys = Object.keys(obj);

    for (const key of keys) {
      if (!omittedKeys.includes(key)) {
        partialObject[key] = obj[key];
      }
    }

    return partialObject;
  };
}

function pick(...keys) {
  if (isSingle(keys)) {
    const firstItem = first(keys);

    if (isArray(firstItem)) {
      return pick(...firstItem);
    }
  }

  return (obj) => {
    const partialObject = {};

    for (const key of keys) {
      if (obj.hasOwnProperty(key)) {
        partialObject[key] = obj[key];
      }
    }

    return partialObject;
  };
}

function pickAll(...keys) {
  if (isSingle(keys)) {
    const firstItem = first(keys);

    if (isArray(firstItem)) {
      return pick(...firstItem);
    }
  }

  return (obj) => {
    const partialObject = {};

    for (const key of keys) {
      partialObject[key] = obj[key];
    }

    return partialObject;
  };
}

export {
  entries,
  keys,
  omit,
  pick,
  pickAll,
  properties,
  propertiesOf,
  property,
  propertyOf,
  values,
};
