import { fold } from "../array/aggregation.js";
import { appendTo } from "../collection/update.js";
import { isEmpty } from "../collection/length.js";
import { isNull } from "../validation/type.js";
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

/**
 * Create a success result.
 */
export function succeed<V>(value: V): Success<V> {
  return {
    value,
    kind: "success",
  };
}

/**
 * Create a failure result.
 */
export function fail<E>(error: E): Failure<E> {
  return {
    error,
    kind: "failure",
  };
}

/**
 * Create a function that returns a failure result if the condition is met.
 */
export function failIf<V, E>(condition: (input: V) => boolean) {
  return (error: E) => (input: V): Result<V, E> =>
    condition(input) ? fail(error) : succeed(input);
}

export const failIfEmpty = failIf(isEmpty);
export const failIfNull = failIf(isNull);

/**
 * Check if the result is a success.
 */
export function isSuccess<V, E>(result: Result<V, E>): result is Success<V> {
  return result.kind === "success";
}

/**
 * Check if the result is a failure.
 */
export function isFailure<V, E>(result: Result<V, E>): result is Failure<E> {
  return result.kind === "failure";
}

/**
 * Throw an error for unsupported kinds.
 */
export function throwUnsupportedKind(result: Result<unknown, unknown>): never {
  throwError(`Unsupported kind: ${result.kind}`);
}

/**
 * Apply a function to the value of a success result.
 */
export function mapResult<V, E, N>(f: (value: V) => Promise<N>) {
  return async ($result: Result<V, E>): Promise<Result<N, E>> => {
    const result = await $result;
    switch (result.kind) {
      case "success":
        return { ...result, value: await f(result.value) };
      case "failure":
        return result;
      default:
        throwUnsupportedKind(result);
    }
  };
}

/**
 * Apply a function to the error of a failure result.
 */
export function mapFailure<V, E, N>(f: (error: E) => Promise<N>) {
  return async ($result: Result<V, E>): Promise<Result<V, N>> => {
    const result = await $result;
    switch (result.kind) {
      case "success":
        return result;
      case "failure":
        return { ...result, error: await f(result.error) };
      default:
        throwUnsupportedKind(result);
    }
  };
}

/**
 * Chain a function to the value of a success result.
 */
export function chainResult<V, E, N>(f: (value: V) => Promise<Result<N, E>>) {
  return async ($result: Result<V, E>): Promise<Result<N, E>> => {
    const result = await $result;
    switch (result.kind) {
      case "success":
        return await f(result.value);
      case "failure":
        return result;
      default:
        throwUnsupportedKind(result);
    }
  };
}

/**
 * Catch and handle a failure result.
 */
export function catchResult<V, E>(f: (error: E) => Promise<Result<V, E>>) {
  return async ($result: Result<V, E>): Promise<Result<V, E>> => {
    const result = await $result;
    switch (result.kind) {
      case "success":
        return result;
      case "failure":
        return await f(result.error);
      default:
        throwUnsupportedKind(result);
    }
  };
}

/**
 * Fold a result to handle success and failure cases.
 */
export function foldResult<V, N>(onSuccess: (value: V) => Promise<N>) {
  return <E, M>(onFailure: (error: E) => Promise<M>) =>
  async ($result: Result<V, E>): Promise<N | M> => {
    const result = await $result;
    switch (result.kind) {
      case "success":
        return await onSuccess(result.value);
      case "failure":
        return await onFailure(result.error);
      default:
        throwUnsupportedKind(result);
    }
  };
}

/**
 * Invert an array of `Result` objects to a single `Result` of an array.
 * If all `Result`s are successes, it returns a `Success` containing an
 * array of values.
 * If any `Result` is a failure, it returns the first `Failure`.
 * @example
 * ```js
 * const result = await invertResults(succeed("aaa"), succeed("bbb"));
 * console.log(result); // { value: ["aaa", "bbb"], kind: "success" }
 * ```
 */
export function invertResults<V, E>(
  ...results: Result<V, E>[]
): Promise<Success<V[]> | Failure<E>> {
  return fold(async (acc: Result<V[], E>, result: Result<V, E>) =>
    await chainResult(async (arr: V[]) =>
      await mapResult((appendTo as any)(arr))(result)
    )(
      acc,
    )
  )(succeed([]))(results);
}

/**
 * Transform a promise to a result.
 */
export function transformPromiseToResult<V, E>(
  promise: Promise<V>,
): Promise<Result<V, E>> {
  return promise.then(succeed).catch(fail);
}

/**
 * Transform a result to a promise.
 */
export async function transformResultToPromise<V, E>(
  result: Result<V, E>,
): Promise<V> {
  return await foldResult((value: V) => Promise.resolve(value))((error) =>
    Promise.reject(error)
  )(result);
}

/**
 * Try to execute a function and catch any errors as a result.
 */
export function tryCatch<V, N>(f: (input: V) => Promise<N>) {
  return async (input: V, error?: unknown): Promise<Result<N, unknown>> => {
    try {
      return succeed(await f(input));
    } catch (err) {
      return fail(typeof error === "undefined" ? err : error);
    }
  };
}
