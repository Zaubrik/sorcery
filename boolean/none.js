import { isArray } from "../validation/type.js";
import { all } from "./all.js";
import { isFalse } from "./equality.js";

function none(predicate) {
  return (...itemsOrArray) => {
    const items = itemsOrArray.length === 1 && isArray(itemsOrArray[0])
      ? itemsOrArray[0]
      : itemsOrArray;

    for (const item of items) {
      if (predicate(item)) {
        return false;
      }
    }
    return true;
  };
}

const allFalse = all(isFalse);

function allFail(...predicates) {
  const firstItem = predicates[0];
  if (isArray(firstItem)) {
    return all(...firstItem);
  }

  return (items) => {
    for (let i = 0; i < predicates.length; i++) {
      if (predicates[i](items)) {
        return false;
      }
    }

    return true;
  };
}

export { allFail, allFalse, none };
