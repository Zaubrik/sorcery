/**
 * A curried function which first takes a mediaType and data string and returns
 * a data url.
 * ```ts
 * makeDataUrl("text/html")("<h1>Hello, World!</h1>");
 * ```
 * @param {string} mediaType
 * @return {(data: string) => string}
 */
export function makeDataUrl(mediaType) {
  return (data) =>
    `data:${mediaType},${
      mediaType.includes(";base64,") ? data : encodeURIComponent(data)
    }`;
}

/**
 * Converts a Blob or File to a promised data url.
 * ```ts
 * await makeDataUrlFromBlobOrFile(
 *   new File(["foo"], "foo.txt", {
 *     type: "text/plain",
 *   }),
 * );
 * ```
 * @param {Blob|File} blob
 * @return {Promise<string>}
 */
export function makeDataUrlFromBlobOrFile(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    /**
     * reader.onloadend.
     */
    reader.onloadend = () => resolve(/**@type {string}*/ (reader.result));
    reader.readAsDataURL(blob);
  });
}
