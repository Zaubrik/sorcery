/**
 * @typedef { string | number | boolean | null } JsonPrimitive
 * @typedef { { [member: string]: JsonValue } } JsonObject
 * @typedef { JsonValue[] } JsonArray
 * @typedef { JsonPrimitive | JsonObject | JsonArray } JsonValue
 * @typedef {
 *   | "arrayBuffer"
 *   | "blob"
 *   | "formData"
 *   | "json"
 *   | "text"
 *   | "uint8Array"} BodyMethod
 */

/**
@typedef {{
 * (bodyMethod: "arrayBuffer", hasStatusCheck?: boolean): (input:RequestInfo | URL, init?:RequestInit) => Promise<ArrayBuffer>;
 * (bodyMethod: "blob", hasStatusCheck?: boolean): (input:RequestInfo | URL, init?:RequestInit) => Promise<Blob>;
 * (bodyMethod: "formData", hasStatusCheck?: boolean): (input:RequestInfo | URL, init?:RequestInit) => Promise<FormData>;
 * (bodyMethod: "json", hasStatusCheck?: boolean): (input:RequestInfo | URL, init?:RequestInit) => Promise<JsonValue>;
 * (bodyMethod: "text", hasStatusCheck?: boolean): (input:RequestInfo | URL, init?:RequestInit) => Promise<string>;
 * (bodyMethod: "uint8Array", hasStatusCheck?: boolean): (input:RequestInfo | URL, init?:RequestInit) => Promise<Uint8Array>;
 * (bodyMethod: "body", hasStatusCheck?: boolean): (input:RequestInfo | URL, init?:RequestInit) => Promise<ReadableStream>;
    [k:string]: any
}} FetchFor
*/

/* Types: https://github.com/microsoft/TypeScript/issues/25590#issuecomment-790713772 */

/**
 * Takes a body method, `RequestInfo` and `RequestInit` and fetches the resource.
 * @type {FetchFor}
 */
export const fetchFor = (
  /** @param {BodyMethod} bodyMethod */
  /** @param {boolean} [hasStatusCheck=false] */
  (bodyMethod, hasStatusCheck = false) => {
    return (input, init) => {
      return fetch(input, init).then((response) => {
        if (hasStatusCheck && !response.ok) {
          throw new Error(
            `Received status code ${response.status} (${response.statusText}).`,
          );
        }
        switch (bodyMethod) {
          case "arrayBuffer":
            return response.arrayBuffer();
          case "blob":
            return response.blob();
          case "formData":
            return response.formData();
          case "json":
            return response.json();
          case "text":
            return response.text();
          case "uint8Array":
            return response.arrayBuffer().then((p) => new Uint8Array(p));
          case "body":
            return response.body;
          default:
            throw new Error("Invalid body method.");
        }
      });
    };
  }
);

export const fetchForArrayBuffer = fetchFor("arrayBuffer", true);
export const fetchForBlob = fetchFor("blob", true);
export const fetchForFormData = fetchFor("formData", true);
export const fetchForJson = fetchFor("json", true);
export const fetchForText = fetchFor("text", true);
export const fetchForUint8Array = fetchFor("uint8Array", true);
export const fetchForBody = fetchFor("body", true);
