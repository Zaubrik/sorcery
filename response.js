/**
 * Difference between cloning and copying of a `Response`:
 * https://community.cloudflare.com/t/whats-the-point-of-response-clone/216456
 */
export function copyResponse(response) {
  return new Response(response.body, response);
}

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
