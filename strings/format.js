/**
 * Takes a string and returns a boolean if it is an email address.
 *
 * @param {string} str
 * @return {boolean}
 */
export function isMail(str) {
  return /^(([^<>()\[\]\\,;:\s@"]+@[a-zA-Z0-9\-]+\.([a-zA-Z0-9\-]+\.)*[a-zA-Z]{2,})|(<[^<>()\[\]\\,;:\s@"]+@[a-zA-Z0-9]+\.([a-zA-Z0-9\-]+\.)*[a-zA-Z]{2,}>)|([^<>]+ <[^<>()\[\]\\,;:\s@"]+@[a-zA-Z0-9]+\.([a-zA-Z0-9\-]+\.)*[a-zA-Z]{2,}>))$/
    .test(str);
}

/**
 * Takes a string and returns a boolean if it is an positive integer.
 *
 * @param {string} str
 * @return {boolean}
 */
export function isPositiveInteger(str) {
  return /^[1-9]\d*$/.test(str);
}
