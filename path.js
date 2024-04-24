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

const osType = (() => {
  const { Deno } = globalThis;
  if (typeof Deno?.build?.os === "string") {
    return Deno.build.os;
  }
  const { navigator } = globalThis;
  if (navigator?.appVersion?.includes?.("Win")) {
    return "windows";
  }
  return "linux";
})();
const isWindows = osType === "windows";
function assertArg(url) {
  url = url instanceof URL ? url : new URL(url);
  if (url.protocol !== "file:") {
    throw new TypeError("Must be a file URL.");
  }
  return url;
}
function fromFileUrl1(url) {
  url = assertArg(url);
  return decodeURIComponent(
    url.pathname.replace(/%(?![0-9A-Fa-f]{2})/g, "%25"),
  );
}
function fromFileUrl2(url) {
  url = assertArg(url);
  let path = decodeURIComponent(
    url.pathname.replace(/\//g, "\\").replace(/%(?![0-9A-Fa-f]{2})/g, "%25"),
  ).replace(/^\\*([A-Za-z]:)(\\|$)/, "$1\\");
  if (url.hostname !== "") {
    path = `\\\\${url.hostname}${path}`;
  }
  return path;
}

export function fromFileUrl(url) {
  return isWindows ? fromFileUrl2(url) : fromFileUrl1(url);
}
