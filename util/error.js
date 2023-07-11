/**
 * throwError.
 * @param {string} msg
 * @returns {never}
 */
export function throwError(msg) {
  throw new Error(msg);
}

/**
 * Make an assertion, if not truthy, then throw.
 * @param {unknown} expr
 * @returns {asserts expr}
 */
export function assert(expr) {
  if (!expr) {
    throw new Error("The value must be truthy.");
  }
}
