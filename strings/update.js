// @ts-nocheck
import { length } from "../collections/length.js";
import { repeat } from "./mapping.js";

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

export {
  pad,
  removeAll,
  removeDuplicateWhitespaces,
  removeFirst,
  removeLast,
  replaceAll,
  replaceFirst,
  replaceLast,
  surroundWith,
  surroundWithDoubleQuotes,
  surroundWithParentheses,
  surroundWithSingleQuotes,
  trim,
};
