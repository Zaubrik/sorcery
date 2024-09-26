/**
 * Just the bare necessities of state management.
 *
 * @param {any} v - The initial value of the state.
 * @param {...Function} cb - Callback functions that are called when the state
 * changes.
 * @returns {Function} A function that manages the state and allows getting or
 * setting its value.
 * ```
 * // Create a stateful value
 * const score = valoo(0);
 * // Register first callback to log the new score
 * score.on((newScore) => {
 *   console.log(`Score updated to: ${newScore}`);
 * });
 * // Register second callback to check if the score is high enough
 * score.on((newScore) => {
 *   if (newScore > 10) {
 *     console.log(`High score! Congrats!`);
 *   }
 * });
 * // Update the score
 * score(5); // Output: Score updated to: 5
 * score(15); // Output: Score updated to: 15 \n High score! Congrats!
 * ```
 */
export function valoo(v, ...cb) {
  function value(n) {
    if (arguments.length) {
      v = n;
      cb.map((f) => f && f(v));
    }
    return v;
  }
  value.on = (c) => {
    const i = cb.push(c) - 1;
    return () => (cb[i] = null);
  };
  return value;
}
