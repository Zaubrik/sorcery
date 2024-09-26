/** Takes a `string` or `URL`, pings the url and returns a `boolean`. */
export async function ping(url) {
  return await fetch(url instanceof URL ? url.href : url).then(() => true)
    .catch(() => false);
}
