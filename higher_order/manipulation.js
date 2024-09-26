export function curry(fn) {
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

/**
 * Performs left-to-right function composition. The leftmost function may
 * have any arity; the remaining functions must be unary.
 */
export function pipe(...fns) {
  const _pipe = (accumulator, currentValue) => (...arg) =>
    currentValue(accumulator(...arg));
  return fns.reduce(_pipe);
}

export function flip(f) {
  return (b) => (a) => f(a)(b);
}
