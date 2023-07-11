function pair(a) {
  return (b) => [a, b];
}

function pairWith(b) {
  return (a) => [a, b];
}

function pairBy(f) {
  return (x) => [x, f(x)];
}

function duplicate(a) {
  return [a, a];
}

function mapFirst(f) {
  return ([a, b]) => [f(a), b];
}

function mapSecond(g) {
  return ([a, b]) => [a, g(b)];
}

function mapPair(g) {
  return ([a, b]) => [a, g(a)(b)];
}

function foldPair(f) {
  return ([a, b]) => f(a)(b);
}

export {
  duplicate,
  foldPair,
  mapFirst,
  mapPair,
  mapSecond,
  pair,
  pairBy,
  pairWith,
};
