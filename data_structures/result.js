import { fold } from "./arrays/aggregation.js";
import { appendTo } from "./collections/update.js";
import { isEmpty } from "./collections/length.js";
import { isNull } from "./type.js";
import { throwError } from "../util/error.js";

function succeed(value) {
  return {
    value,
    kind: "success",
  };
}

function fail(error) {
  return {
    error,
    kind: "failure",
  };
}

function failIf(condition) {
  return (error) => (input) => condition(input) ? fail(error) : succeed(input);
}

const failIfEmpty = failIf(isEmpty);
const failIfNull = failIf(isNull);

function isSuccess(result) {
  return result.kind === "success";
}

function isFailure(result) {
  return result.kind === "failure";
}

function throwUnsupportedKind(kind) {
  throwError(`Unsupported kind: ${kind}`);
}

function mapResult(f) {
  return (result) => {
    switch (result.kind) {
      case "success":
        return { ...result, value: f(result.value) };
      case "failure":
        return result;
      default:
        throwUnsupportedKind(result.kind);
    }
  };
}

function mapFailure(f) {
  return (result) => {
    switch (result.kind) {
      case "success":
        return result;
      case "failure":
        return { ...result, error: f(result.error) };
      default:
        throwUnsupportedKind(result.kind);
    }
  };
}

function chainResult(f) {
  return (result) => {
    switch (result.kind) {
      case "success":
        return f(result.value);
      case "failure":
        return result;
      default:
        throwUnsupportedKind(result.kind);
    }
  };
}

function catchResult(f) {
  return (result) => {
    switch (result.kind) {
      case "success":
        return result;
      case "failure":
        return f(result.error);
      default:
        throwUnsupportedKind(result.kind);
    }
  };
}

function foldResult(onSuccess) {
  return (onFailure) => (result) => {
    switch (result.kind) {
      case "success":
        return onSuccess(result.value);
      case "failure":
        return onFailure(result.error);
      default:
        throwUnsupportedKind(result.kind);
    }
  };
}

/**
 * let r1 = invertResults(succeed("aaa"), succeed("bbb"));
 */
function invertResults(...results) {
  return fold((acc, result) =>
    chainResult((arr) => mapResult(appendTo(arr))(result))(acc)
  )(succeed([]))(results);
}

function transformPromiseToResult(promise) {
  return promise.then(succeed).catch(fail);
}

function transformResultToPromise(result) {
  return foldResult((value) => Promise.resolve(value))((error) =>
    Promise.reject(error)
  )(result);
}

function tryCatch(f) {
  return (input) => {
    try {
      return succeed(f(input));
    } catch (error) {
      return fail(error);
    }
  };
}

export {
  catchResult,
  chainResult,
  fail,
  failIf,
  failIfEmpty,
  failIfNull,
  foldResult,
  invertResults,
  isFailure,
  isSuccess,
  mapFailure,
  mapResult,
  succeed,
  transformPromiseToResult,
  transformResultToPromise,
  tryCatch,
};
