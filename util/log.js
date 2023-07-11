/**
 * slog.
 * ```
 * const num = 10
 * slog({num})
 * ```
 * @param {Record<string, string>} obj
 */
export function slog(obj) {
  console.log(getKeyValueFormat(obj));
}

/**
 * getKeyValueFormat.
 * @param {Record<string, string>} obj
 * @returns {string}
 */
export function getKeyValueFormat(obj) {
  return Object.entries(obj).map(([key, value]) => key + ": " + value)[0] || "";
}

/**
 * getDateFormat.
 * @returns {string}
 */
export function getDateFormat() {
  const d = new Date().toISOString();
  const dateFmt = `[${d.slice(0, 10)} ${d.slice(11, 19)}]`;
  return dateFmt;
}
