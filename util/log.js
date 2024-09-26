/**
 * slog.
 * ```
 * const num = 10;
 * const str = "abc";
 * const arr = [10, 20, 30, 40, "five"];
 * const obj = { a: 10, b: 20, c: 30, d: { e: 40 } };
 * slog({ num });
 * slog({ str });
 * slog({ arr });
 * slog({ obj });
 * ```
 * @param {Record<string, string>} obj
 */
export function slog(obj) {
  const message = getKeyValueFormat(obj);
  console.log(message);
}

/**
 * getKeyValueFormat.
 * @param {Record<string, string>} obj
 * @returns {string}
 */
export function getKeyValueFormat(obj) {
  return Object.entries(obj).map(([key, value]) => {
    return key + ": " + JSON.stringify(value, null, 2);
  })[0] || "";
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
