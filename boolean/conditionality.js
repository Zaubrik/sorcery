import { is2DArray, isFunction } from "../validation/type.js";
import { equals } from "./equality.js";

/**
 * Checks predicates against an input and returns, depending on the result,
 * values/invokes callbacks or defaultValues.
 * ```ts
 * match([isNull, ()=> throwError("The value is null.")])(identity)
 * ```
 */
export function match(...cases) {
  const firstItem = cases[0];
  if (is2DArray(firstItem)) {
    return match(...firstItem);
  }

  return (defaultFunctionOrValue) => (input) => {
    for (const [condition, valueOrFunction] of cases) {
      const isMatched = (isFunction(condition) && condition(input)) ||
        equals(condition)(input);
      if (isMatched) {
        if (isFunction(valueOrFunction)) {
          return valueOrFunction(input);
        } else {
          return valueOrFunction;
        }
      }
    }

    if (isFunction(defaultFunctionOrValue)) {
      return defaultFunctionOrValue(input);
    } else {
      return defaultFunctionOrValue;
    }
  };
}

/**
 * Curried function for the tertiary operator.
 */
export function ifElse(condition) {
  return (ifBlock) => (elseBlock) => condition ? ifBlock() : elseBlock();
}
