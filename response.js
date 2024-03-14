/**
 * Creates a new Response object by copying the body and headers from an existing Response object.
 * Difference between cloning and copying of a `Response`:
 * https://community.cloudflare.com/t/whats-the-point-of-response-clone/216456
 *
 * @param {Response} response - The Response object to copy.
 * @returns {Response} A new Response object with the same body and headers as the input Response object.
 */
export function copyResponse(response) {
  return new Response(response.body, response);
}

/**
 * Determines the appropriate body value for a Response object based on the input value.
 * If the input is already a string, it is returned as-is.
 * If the input is undefined or null, an empty string is returned.
 * If the input is a supported type for the Response body, it is returned as-is.
 * Otherwise, the input is converted to a JSON string.
 *
 * @param {*} input - The input value to determine the Response body for.
 * @returns {BodyInit} The appropriate body value for the Response object.
 */
export function getResponseBody(input) {
  if (typeof input === "string") {
    return input;
  } else if (input === undefined || input === null) {
    return "";
  } else if (
    input instanceof Blob || input instanceof ArrayBuffer ||
    ArrayBuffer.isView(input) || input instanceof DataView ||
    input instanceof URLSearchParams || input instanceof FormData ||
    input instanceof ReadableStream
  ) {
    return input;
  } else {
    return JSON.stringify(input);
  }
}
