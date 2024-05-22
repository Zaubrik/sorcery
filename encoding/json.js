/**
 * Parses a JSON string and returns an object indicating success or failure.
 *
 * @param {string} json - The JSON string to parse.
 * @returns {{ value?: any, error?: Error, kind: 'success' | 'failure' }} An object
 * containing either the parsed value and a 'success' kind, or an error and a
 * 'failure' kind.
 * ```js
 * const jsonString = '{"key": "value"}';
 * const { value, error } = tryToParse(jsonString);
 * console.log(value);
 * ```
 */
export function tryToParse(json) {
  try {
    const value = JSON.parse(json);
    return {
      value,
      kind: "success",
    };
  } catch (error) {
    return {
      error,
      kind: "failure",
    };
  }
}

/**
 * Safely stringifies a value to a JSON string. If the value
 * is a string, it is returned as is.
 * If the value cannot be stringified (e.g., functions, undefined),
 * it returns "null".
 * @param {*} value - The value to stringify. It can be of any type.
 * @returns {string} - The JSON string representation of the value,
 * or "null" if it cannot be stringified.
 * @example
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
