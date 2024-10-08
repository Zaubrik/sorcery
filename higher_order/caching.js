export function memoize(f) {
  const cache = {};
  return (...args) => {
    const argStr = JSON.stringify(args);
    cache[argStr] = cache[argStr] || f(...args);
  };
}
