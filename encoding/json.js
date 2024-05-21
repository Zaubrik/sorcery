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

/**
 * ```js
 * console.log(safeJSONStringify("This is a string")); // Output: "This is a string"
 * console.log(safeJSONStringify({ key: "value" })); // Output: "{\"key\":\"value\"}"
 * console.log(safeJSONStringify([1, 2, 3])); // Output: "[1,2,3]"
 * console.log(safeJSONStringify(function() {})); // Output: "null"
 * console.log(safeJSONStringify(undefined)); // Output: "null"
 * console.log(safeJSONStringify(123)); // Output: "123"
 * ```
 */
export function safeJSONStringify(value) {
  // If the value is a string, return it directly
  if (typeof value === "string") {
    return value;
  }
  try {
    const jsonString = JSON.stringify(value);

    // JSON.stringify returns undefined for functions and undefined
    if (jsonString === undefined) {
      return "null";
    }
    return jsonString;
  } catch (error) {
    // If an error occurs during stringification, return "null"
    return "null";
  }
}
