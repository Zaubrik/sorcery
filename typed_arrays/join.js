export function concatTypedArrays(a, b) {
  const c = new a.constructor(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}

export function concatBytes(a, ...bytes) {
  const b = new a.constructor(bytes);
  return concatTypedArrays(a, b);
}
