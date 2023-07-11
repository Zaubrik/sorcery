/**
 * Takes a url and `URL` properties and returns a new, merged `URL` object.
 * ```js
 * mergeUrl(new URL("https://example.com"))({ port: "8888", username: "joe" })
 * ```
 * @typedef {Partial<Omit<URL, "origin" | "searchParams">>} UrlProperties
 * @param {string|URL} baseUrl
 * @returns {(partialUrl:UrlProperties) => URL}
 */
export function mergeUrl(baseUrl) {
  // NOT: Don't mutate the passed url object.
  const url = new URL(baseUrl instanceof URL ? baseUrl.href : baseUrl);
  return (urlOrProps) => {
    Object.entries(urlOrProps).forEach(([key, value]) => {
      /**@type {any}*/ (url)[key] = value;
    });
    return url;
  };
}

/**
 * importMetaResolve.
 * @param {string} moduleUrl
 * @return {(path: string) => string}
 * ```js
 * importMetaResolve(import.meta.url)("./static/")
 * ```
 */
export function importMetaResolve(moduleUrl) {
  return (path) => getPathname(new URL(path, moduleUrl));
}

/**
 * Decodes a uri component safely.
 * ```js
 * decodeUriComponentSafely("/home/f%oo") // "/home/f%oo"
 * ```
 * @param {string} uriComponent
 * @returns {string}
 */
export function decodeUriComponentSafely(uriComponent) {
  return decodeURIComponent(
    uriComponent.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"),
  );
}

/**
 * Takes a `string` or `URL` and returns a pathname.
 * ```js
 * getPathname(new URL("file:///home/foo")); // "/home/foo"
 * getPathname("file:///home/foo"); // "/home/foo"
 * getPathname(new URL("file:///C:/Users/foo").pathname) // "/C:/Users/foo" WRONG!
 * getPathname("/home/foo"); // "/home/foo"
 * getPathname("./home/foo"); // "./home/foo"
 * ```
 * @param {URL|string} url
 * @return {string}
 */
export function getPathname(url) {
  if (typeof url === "string") {
    if (url.startsWith("/") || url.startsWith("./")) {
      return decodeUriComponentSafely(url);
    } else {
      return getPathname(new URL(url));
    }
  }
  return decodeUriComponentSafely(url.pathname);
}

/**
 * getFilename.
 * @param {string} path
 * @return {string}
 */
export function getFilename(path) {
  return /** @type {string} */ (path.split("/").pop());
}

/**
 * getExtension.
 * @param {string} filename
 * @return {string}
 */
export function getExtension(filename) {
  return /** @type {string} */ (filename.split(".").pop());
}

/**
 * getDirname.
 * @param {string} path
 * @return {string}
 */
export function getDirname(path) {
  const lastIndex = path.lastIndexOf("/");
  return lastIndex === -1 ? "" : path.slice(0, lastIndex);
}

/**
 * removeExtension.
 * @param {string} filename
 * @return {string}
 */
export function removeExtension(filename) {
  return filename.split(".")[0];
}
