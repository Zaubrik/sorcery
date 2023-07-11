// @ts-nocheck

import { isArray } from "./type.js";
import { isSingle } from "./collections/length.js";
import { single } from "./collections/single_access.js";

export function apply(f) {
  return (x) => f(x);
}

export function applyTo(x) {
  return (f) => f(x);
}

export function pairApply(f) {
  return ([a, b]) => f(a)(b);
}

export function pairApplyTo([a, b]) {
  return (f) => f(a)(b);
}

// https://github.com/reduxjs/redux/blob/master/src/compose.ts
export function compose(...funcs) {
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

export function curry(fn) {
  const arity = fn.length;
  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}

export function flip(f) {
  return (b) => (a) => f(a)(b);
}

export function perform(f) {
  return (x) => {
    f(x);

    return x;
  };
}

export function identity(x) {
  return x;
}

export function constant(x) {
  return () => x;
}
