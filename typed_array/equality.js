export function areEqual(a, b) {
  if (a.byteLength !== b.byteLength) return false;
  return a.every((el, i) => el === b[i]);
}
