import { isArray } from "../type.js";
import { isTrue } from "./equality.js";

function all(predicate) {
  return (...itemsOrArray) => {
    const items = itemsOrArray.length === 1 && isArray(itemsOrArray[0])
      ? itemsOrArray[0]
      : itemsOrArray;

    for (const item of items) {
      if (!predicate(item)) {
        return false;
      }
    }
    return true;
  };
}

const allTrue = all(isTrue);

function allPass(...predicates) {
  const firstItem = predicates[0];
  if (isArray(firstItem)) {
    return allPass(...firstItem);
  }

  return (items) => {
    for (let i = 0; i < predicates.length; i++) {
      if (!predicates[i](items)) {
        return false;
      }
    }

    return true;
  };
}

export { all, allPass, allTrue };
