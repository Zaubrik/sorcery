/**
 * Repeats a string.
 *
 * @param {number} n
 * @return {( s:string ) => string}
 */
export function repeat(n) {
  return (s) => {
    let result = "";

    for (let i = 0; i < n; i++) {
      result += s;
    }

    return result;
  };
}

/**
 * Returns a lowercased string.
 *
 * @param {string} input
 * @return {string}
 */
export function lower(input) {
  return input.toLowerCase();
}

/**
 * Returns a uppercased string.
 *
 * @param {string} input
 * @return {string}
 */
export function upper(input) {
  return input.toUpperCase();
}

/**
 * Capitalize the first letter of a string.
 *
 * @param {string} input
 * @return {string}
 */
export function capitalize(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Takes a string and converts dash camelCase.
 *
 * @param {string} str
 * @return {string}
 */
export function convertDashToCamel(str) {
  return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
}

/**
 * Takes a string and converts camelCase to dash.
 *
 * @param {string} str
 * @return {string}
 */
export function convertCamelToDash(str) {
  return str.replace(/([a-zA-Z0-9])(?=[A-Z])/g, "$1-").toLowerCase();
}
