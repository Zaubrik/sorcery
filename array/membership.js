import { isSingle } from "../collection/length.js";
import { first } from "../collection/single_access.js";
import { isArray } from "../validation/type.js";
import { some } from "../boolean/some.js";
import { none } from "../boolean/none.js";
import { equals } from "../boolean/equality.js";

function contains(item) {
  return (arr) => some(equals(item))(arr);
}

function isContainedIn(arr) {
  return (item) => contains(item)(arr);
}

function doesNotContain(item) {
  return (arr) => none(equals(item))(arr);
}

function isNotContainedIn(arr) {
  return (item) => doesNotContain(item)(arr);
}

function containsAll(...candidateItemsOrArray) {
  if (isSingle(candidateItemsOrArray)) {
    const firstCandidateItem = first(candidateItemsOrArray);
    if (isArray(firstCandidateItem)) {
      return containsAll(...firstCandidateItem);
    }
  }

  return (...itemsOrArray) => {
    if (isSingle(itemsOrArray)) {
      const firstItem = first(itemsOrArray);
      if (isArray(firstItem)) {
        return containsAll(candidateItemsOrArray)(...firstItem);
      }
    }

    for (let i = 0; i < candidateItemsOrArray.length; i++) {
      if (!itemsOrArray.includes(candidateItemsOrArray[i])) {
        return false;
      }
    }

    return true;
  };
}

function areContainedIn(itemsOrArray) {
  return (candidateItemsOrArray) =>
    containsAll(candidateItemsOrArray)(itemsOrArray);
}

export {
  areContainedIn,
  contains,
  containsAll,
  doesNotContain,
  isContainedIn,
  isNotContainedIn,
};
