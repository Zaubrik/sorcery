/**
 * Takes a string and returns a boolean if it is an email address.
 *
 * @param {string} str
 * @return {boolean}
 */
export function isEmail(str) {
  const regex =
    /^(([^<>()\[\]\\,;:\s@"]+@[a-zA-Z0-9\-]+\.([a-zA-Z0-9\-]+\.)*[a-zA-Z]{2,})|(<[^<>()\[\]\\,;:\s@"]+@[a-zA-Z0-9]+\.([a-zA-Z0-9\-]+\.)*[a-zA-Z]{2,}>)|([^<>]+ <[^<>()\[\]\\,;:\s@"]+@[a-zA-Z0-9]+\.([a-zA-Z0-9\-]+\.)*[a-zA-Z]{2,}>))$/;
  return regex.test(str);
}

/**
 * Takes a string and returns a boolean if it is an positive integer.
 *
 * @param {string} str
 * @return {boolean}
 */
export function isPositiveInteger(str) {
  const regex = /^[1-9]\d*$/;
  return regex.test(str);
}

/**
 * Takes a string and returns a boolean if it is an positive integer.
 *
 * @param {string} str
 * @return {boolean}
 * ```js
 * console.log(isDomain("example.com"));  // true
 * console.log(isDomain("sub.example.com"));  // true
 * console.log(isDomain("not a domain"));  // false
 * ```
 */
export function isDomain(domain) {
  const regex =
    /^[a-zA-Z0-9\u00C0-\u017F][a-zA-Z0-9-]{0,61}[a-zA-Z0-9\u00C0-\u017F](?:\.[a-zA-Z\u00C0-\u017F]{2,})+$/;
  return regex.test(domain);
}
