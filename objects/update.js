import { isFunction } from "../type.js";

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

export { reverseObject, setProperty };
