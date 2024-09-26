import { isFunction } from "../validation/type.js";

function setProperty(key) {
  return (valueOrFunction) => (obj) => ({
    ...obj,
    [key]: isFunction(valueOrFunction)
      ? valueOrFunction(obj[key])
      : valueOrFunction,
  });
}

function reverseObject(input) {
  const reversed = {};

  const entries = Object.entries(input);

  for (const entry of entries) {
    reversed[entry[1]] = entry[0];
  }

  return reversed;
}

/**
 * Creates a function that removes a specified property from an object.
 * @template T The type of the original object.
 * @param {keyof T} propName - The name of the property to remove.
 * @returns {(obj: T) => Omit<T, typeof propName>}
 */
function removeProperty(propName) {
  return (obj) => {
    const { [propName]: _, ...rest } = obj;
    return rest;
  };
}

export { removeProperty, reverseObject, setProperty };
