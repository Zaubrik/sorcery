// import { fold } from "./arrays/aggregation.js";
// import { appendTo } from "./collections/update.js";
import { isEmpty } from "./collections/length.js";
import { isNull } from "./type.js";
import { throwError } from "../util/error.js";

export type Success<V> = {
  value: V;
  kind: "success";
};
export type Failure<E> = {
  error: E;
  kind: "failure";
};
export type Result<V, E> = Success<V> | Failure<E>;

export function succeed<V>(value: V): Success<V> {
  return {
    value,
    kind: "success",
  };
}

export function fail<E>(error: E): Failure<E> {
  return {
    error,
    kind: "failure",
  };
}

export function failIf<V>(condition: (v: V) => boolean) {
  return <E>(error: E) => (input: V): Result<V, E> =>
    condition(input) ? fail(error) : succeed(input);
}

export const failIfEmpty = failIf(isEmpty);
export const failIfNull = failIf(isNull);

export function isSuccess<V, E>(result: Result<V, E>): result is Success<V> {
  return result.kind === "success";
}

export function isFailure<V, E>(result: Result<V, E>): result is Failure<E> {
  return result.kind === "failure";
}

export function throwUnsupportedKind(result: Result<unknown, unknown>): never {
  throwError(`Unsupported kind: ${result.kind}`);
}

export function mapResult<V, N>(f: (v: V) => N) {
  return <E>(result: Result<V, E>): Result<N, E> => {
    switch (result.kind) {
      case "success":
        return { ...result, value: f(result.value) };
      case "failure":
        return result;
      default:
        throwUnsupportedKind(result);
    }
  };
}

export function mapFailure<E, N>(f: (e: E) => N) {
  return <V>(result: Result<V, E>): Result<V, N> => {
    switch (result.kind) {
      case "success":
        return result;
      case "failure":
        return { ...result, error: f(result.error) };
      default:
        throwUnsupportedKind(result);
    }
  };
}

export function chainResult<V, E, N>(f: (v: V) => Result<N, E>) {
  return (result: Result<V, E>) => {
    switch (result.kind) {
      case "success":
        return f(result.value);
      case "failure":
        return result;
      default:
        throwUnsupportedKind(result);
    }
  };
}

export function catchResult<V, E, N>(f: (e: E) => Result<V, E>) {
  return (result: Result<V, E>) => {
    switch (result.kind) {
      case "success":
        return result;
      case "failure":
        return f(result.error);
      default:
        throwUnsupportedKind(result);
    }
  };
}

export function foldResult<V, N>(onSuccess: (v: V) => N) {
  return <E, M>(onFailure: (e: E) => M) => (result: Result<V, E>): N | M => {
    switch (result.kind) {
      case "success":
        return onSuccess(result.value);
      case "failure":
        return onFailure(result.error);
      default:
        throwUnsupportedKind(result);
    }
  };
}

/**
 * invertResults.
 * [ success(val1), success(val2) ] = success([val1, val2])
 * [ failure(err1), failure(err2) ] = failure(err)
 * [ failure(err), success(val) ] = failure(err)
 * [ success(val), failure(err) ] = failure(err)
 */
// export function invertResults<
// R extends Result<unknown, unknown>,
// >(
// ...results: R[]
// ):
// | Success<Exclude<R, Failure<any>>["value"][]>
// | Failure<Exclude<R, Success<any>>["error"]> {
// return fold((acc, result) =>
// chainResult((arr) => mapResult(appendTo(arr))(result))(acc)
// )(succeed([]))(results);
// }

export function transformPromiseToResult<V, E>(
  promise: Promise<V>,
): Promise<Result<V, E>> {
  return promise.then(succeed).catch(fail);
}

export function transformResultToPromise<V, E>(
  result: Result<V, E>,
): Promise<V> {
  return foldResult((value: V) => Promise.resolve(value))((error) =>
    Promise.reject(error)
  )(result);
}

export function tryCatch<V, N>(f: (v: V) => N) {
  return (input: V): Result<N, Error> => {
    try {
      return succeed(f(input));
    } catch (error: unknown) {
      return fail(
        error instanceof Error ? error : new Error("[non-error thrown]"),
      );
    }
  };
}
