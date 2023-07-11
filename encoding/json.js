/**
 * Parses a JSON value and returns an tuple of the possible value and error.
 * @param {string} json
 * @returns {[string|null, Error|null]}
 */
export function tryToParse(json) {
  try {
    return [JSON.parse(json), null];
  } catch (err) {
    return [null, /**@type {SyntaxError}*/ (err)];
  }
}
