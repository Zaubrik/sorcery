/**
 * Returns a promise that resolves with the specified value after the specified
 * duration in milliseconds. The first arg can be an Error object:
 */
export function delay(valueOrFunction, duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(
      async () =>
        resolve(
          typeof valueOrFunction === "function"
            ? await valueOrFunction()
            : valueOrFunction,
        ),
      duration,
    );
  });
}

/**
 * Waits until the given predicate returns a truthy value. Calls and awaits the predicate
 * function at the given interval time. Can be used to poll until a certain condition is true.
 *
 * ```js
 * const element = await fixture(html`<my-element></my-element>`);
 * await waitUntil(() => return !!element.offsetParent, 'element should become ready');
 * ```
 */
export function waitUntil(
  predicate,
  { interval = 50, timeout = 1000, message } = {},
) {
  return new Promise((resolve, reject) => {
    let timeoutId;

    setTimeout(() => {
      clearTimeout(timeoutId);
      reject(
        new Error(message ? `Timeout: ${message}` : "waitUntil timed out"),
      );
    }, timeout);

    async function nextInterval() {
      try {
        if (await predicate()) {
          resolve(void 0);
        } else {
          timeoutId = setTimeout(() => {
            nextInterval();
          }, interval);
        }
      } catch (error) {
        reject(error);
      }
    }
    nextInterval();
  });
}

export function* loopingRange(from, to, time) {
  while (true) {
    if (from < to) yield delay(++from, time);
    else yield delay(from = 0, time);
  }
}
