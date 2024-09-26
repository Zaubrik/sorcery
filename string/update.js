// @ts-nocheck
import { length } from "../collection/length.js";
import { first, last } from "../collection/single_access.js";
import { repeat } from "./mapping.js";
import { splitByDash, splitByDot } from "./split.js";

function surroundWith(beginning) {
  return (end) => (str) => beginning + str + end;
}

const surroundWithParentheses = surroundWith("(")(")");
const surroundWithSingleQuotes = surroundWith("'")("'");
const surroundWithDoubleQuotes = surroundWith('"')('"');

function removeFirst(toBeRemoved) {
  return replaceFirst(toBeRemoved)("");
}

function removeLast(toBeRemoved) {
  return replaceLast(toBeRemoved)("");
}

function removeAll(toBeRemoved) {
  return replaceAll(toBeRemoved)("");
}

export function removeFirstToEnd(pattern) {
  return (input) => {
    const resultOrEmptyString = input.substring(0, input.indexOf(pattern));
    return resultOrEmptyString === "" ? input : resultOrEmptyString;
  };
}

export function removeLastToStart(pattern) {
  return (input) => {
    const lastIndex = input.lastIndexOf(pattern);
    return lastIndex === -1 ? input : input.slice(lastIndex + 1);
  };
}

function removeDuplicateWhitespaces(input) {
  return input.replace(/\s{2,}/g, " ");
}

function replaceFirst(toBeReplaced) {
  return (replacement) => (input) => input.replace(toBeReplaced, replacement);
}

function replaceLast(toBeReplaced) {
  return (replacement) => (input) => {
    const lastIndex = input.lastIndexOf(toBeReplaced);

    if (lastIndex === -1) {
      return input;
    }

    const before = input.substring(0, lastIndex);
    const after = input.substring(lastIndex + toBeReplaced.length);

    return before + replacement + after;
  };
}

function replaceAll(toBeReplaced) {
  return (replacement) => (input) =>
    input.replace(new RegExp(toBeReplaced, "g"), replacement);
}

export const replaceSpacesWithHyphens = replaceAll(/\s+/)("-");
export const replaceSpacesWithUnderscores = replaceAll(/\s+/)("_");
export const replaceHyphensWithSpaces = replaceAll(/-/)(" ");
export const replaceUnderscoresWithSpaces = replaceAll(/_+/)(" ");
export const replaceHyphensWithUnderscores = replaceAll(/-+/)("_");
export const replaceUnderscoresWithHyphens = replaceAll(/_+/)("-");

function pad(character) {
  return (minimumLength) => (input) => {
    const remaining = minimumLength - length(input);

    if (remaining <= 0) {
      return input;
    }

    const start = repeat(remaining)(character);

    return start + input;
  };
}

function trim(input) {
  return input.trim();
}

/**
 * ```js
 * const paths = ["/example/path/", "/another/path", "no/slashes", "/single/"];
 * const removeFirstSlash = removeFirstIf("/");
 * const removeLastSlash = removeLastIf("/");
 * for (const path of paths) {
 *   console.log(path, removeFirstSlash(path), removeLastSlash(path));
 * }
 * ```
 */
function removeFirstIf(pattern) {
  return (input) => {
    if (input.startsWith(pattern)) {
      return input.slice(1);
    }
    return input;
  };
}

function removeLastIf(pattern) {
  return (input) => {
    if (input.endsWith(pattern)) {
      return input.slice(0, -1);
    }
    return input;
  };
}

export function removeFromLastDash(input) {
  return removeLast(`-${last(splitByDash(input))}`)(input);
}

export function removeFromLastDot(input) {
  return removeLast(`.${last(splitByDot(input))}`)(input);
}

export {
  pad,
  removeAll,
  removeDuplicateWhitespaces,
  removeFirst,
  removeFirstIf,
  removeLast,
  removeLastIf,
  replaceAll,
  replaceFirst,
  replaceLast,
  surroundWith,
  surroundWithDoubleQuotes,
  surroundWithParentheses,
  surroundWithSingleQuotes,
  trim,
};
