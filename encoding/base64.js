/**
 * Convert ucs-2 string to base64 encoded ascii.
 * ```js
 * utoa('✓ à la mode'); // 4pyTIMOgIGxhIG1vZGU=
 * atou('4pyTIMOgIGxhIG1vZGU='); // "✓ à la mode"
 * utoa('I \u2661 Unicode!'); // SSDimaEgVW5pY29kZSE=
 * atou('SSDimaEgVW5pY29kZSE='); // "I ♡ Unicode!"
 * ```
 * @param {string} str
 * @returns {string}
 */
export function convertStringToBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

/**
 * Convert base64 encoded ascii to ucs-2 string.
 * @param {string} base64
 * @returns {string}
 */
export function convertBase64ToString(base64) {
  return decodeURIComponent(escape(window.atob(base64)));
}

/**
 * addPaddingToBase64url.
 * @param {string} base64url
 * @returns {string}
 */
export function addPaddingToBase64url(base64url) {
  if (base64url.length % 4 === 2) return base64url + "==";
  if (base64url.length % 4 === 3) return base64url + "=";
  if (base64url.length % 4 === 1) {
    throw new TypeError("Illegal base64url string.");
  }
  return base64url;
}

/**
 * convertBase64urlToBase64.
 * @param {string} base64url
 * @returns {string}
 */
export function convertBase64urlToBase64(base64url) {
  return addPaddingToBase64url(base64url).replace(/\-/g, "+").replace(
    /_/g,
    "/",
  );
}

/**
 * convertBase64ToBase64url.
 * @param {string} base64
 * @returns {string}
 */
export function convertBase64ToBase64url(base64) {
  return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}
