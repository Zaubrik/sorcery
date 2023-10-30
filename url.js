/**
 * createUrl.
 * ```js
 * const url = new URL("file:///device/abc/xyc/index.html");
 * console.log(new URL("file.ts", url).href); // file:///device/abc/xyc/file.ts
 * console.log(new URL("./file.ts", url).href); // file:///device/abc/xyc/file.ts
 * console.log(new URL("../file.ts", url).href); // file:///device/abc/file.ts
 * console.log(new URL("../../file.ts", url).href); // file:///device/file.ts
 * console.log(new URL("../../../file.ts", url).href); // file:///file.ts
 * console.log(new URL("../../../../file.ts", url).href); // file:///file.ts
 * console.log(new URL("/file.ts", url).href); // file:///file.ts
 * console.log(new URL("fia:e//device", url)); // fia:e//device
 * ```
 *
 * @param {string | URL} url
 * @param {string | URL} [base]
 */
export function createUrl(url, base) {
  return new URL(url, base);
}

/**
 * createUrlWith.
 *
 * @param {string | URL} base
 * @returns {(url: string | URL) => URL}
 */
export function createUrlWith(base) {
  return (url) => new URL(url, base);
}

/**
 * getSearchParam.
 *
 * @param {string | URL } url
 */
export function getSearchParam(url) {
  const queryString = url instanceof URL ? url.search : new URL(url).search;
  /** @param {string} name */
  return (name) => {
    const params = new URLSearchParams(queryString);
    return params.get(name);
  };
}

/**
 * getSearchParams.
 *
 * @param {string | URL } url
 */
export function getSearchParams(url) {
  const queryString = url instanceof URL ? url.search : new URL(url).search;
  /** @param {string[]} names */
  return (names) => {
    const params = new URLSearchParams(queryString);
    return Object.fromEntries(
      names.map((name) => [name, params.get(name)]),
    );
  };
}

/**
 * appendSearchParams.
 *
 * @param {string | URL } url
 */
export function appendSearchParams(url) {
  const urlObject = url instanceof URL ? url : new URL(url);
  const params = urlObject.searchParams;
  /** @param {Record<string,string>} keyValues  */
  return (keyValues) => {
    Object.entries(keyValues).map(([key, value]) => params.append(key, value));
    return urlObject;
  };
}
