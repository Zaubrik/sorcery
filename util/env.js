// deno-fmt-ignore
export const environment = typeof Deno !== "undefined" ? "deno" : typeof process !== "undefined" ? "node" : typeof document !== "undefined" ? "browser" : "unknown";
