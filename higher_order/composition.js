const compose2 = (f, g) => async (...args) => f(await g(...args));
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for the
 * resulting composite function. It accepts sync and async functions.
 *
 * @param funcs The sync and async functions to compose.
 * @returns A function obtained by composing the argument functions from right
 *   to left. For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */
export function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(compose2);
}

// https://github.com/reduxjs/redux/blob/master/src/compose.ts
export function composeSync(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export function composeMultivariate(...fns) {
  return fns.reduce((f, g) => (...xs) => f(...g(...xs)));
}
