/**
 * Takes a string and returns a boolean if it is an email address.
 *
 * @param {string} str
 * @return {boolean}
 */
export function isMail(str) {
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
 * console.log(isValidDomainName("example.com"));  // true
 * console.log(isValidDomainName("sub.example.com"));  // true
 * console.log(isValidDomainName("not a domain"));  // false
 * ```
 */
export function isDomainName(domain) {
  const regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  return regex.test(domain);
}
