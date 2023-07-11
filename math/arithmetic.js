/**
 * mod.
 *
 * @param {number} dividend
 * @return { (divisor: number ) => number }
 */
export function mod(dividend) {
  return (divisor) => divisor % dividend;
}

/**
 * abs.
 *
 * @param {number} value
 * @return {number}
 */
export function abs(value) {
  return Math.abs(value);
}

/**
 * add.
 *
 * @param {number} y
 * @return { (x: number ) => number }
 */
export function add(y) {
  return (x) => x + y;
}
add("");
/**
 * subtract.
 *
 * @param {number} y
 * @return { (x: number ) => number }
 */
export function subtract(y) {
  return (x) => x - y;
}

/**
 * multiply.
 *
 * @param {number} y
 * @return { (x: number ) => number }
 */
export function multiply(y) {
  return (x) => y * x;
}

export const changeSign = multiply(-1);

/**
 * divide.
 *
 * @param {number} y
 * @return { (x: number ) => number }
 */
export function divide(y) {
  return (x) => y / x;
}
