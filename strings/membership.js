/**
 * containsSubstring.
 * @param {string} substring
 * @returns {(candidate: string) => boolean}
 */
export function containsSubstring(substring) {
  return (candidate) => candidate.includes(substring);
}

/**
 * isSubstringOf.
 * @param {string} text
 * @returns {(candidate: string) => boolean}
 */
export function isSubstringOf(text) {
  return (candidate) => containsSubstring(candidate)(text);
}

/**
 * startsWith.
 * @param {string} searchString
 * @returns {(input: string) => boolean}
 */
export function startsWith(searchString) {
  return (input) => input.startsWith(searchString);
}

/**
 * endsWith.
 * @param {string} searchString
 * @returns {(input: string) => boolean}
 */
export function endsWith(searchString) {
  return (input) => input.endsWith(searchString);
}
