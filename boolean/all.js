import { isArray } from "../validation/type.js";
import { isFalse, isTrue } from "./equality.js";

function all(...predicates) {
  return (...itemsOrArray) => {
    const items = itemsOrArray.length === 1 && Array.isArray(itemsOrArray[0])
      ? itemsOrArray[0]
      : itemsOrArray;

    for (const item of items) {
      for (const predicate of predicates) {
        if (!predicate(item)) {
          return false;
        }
      }
    }
    return true;
  };
}

const allTrue = all(isTrue);

export { all, allTrue };
