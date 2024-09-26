export function apply(f) {
  return (x) => f(x);
}

export function applyTo(x) {
  return (f) => f(x);
}

export function pairApply(f) {
  return ([a, b]) => f(a)(b);
}

export function pairApplyTo([a, b]) {
  return (f) => f(a)(b);
}
