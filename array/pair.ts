// Define generic types
type Pair<A, B> = [A, B];

// Function to create a pair with the first element fixed
export function pair<A>(a: A) {
  return <B>(b: B): Pair<A, B> => [a, b];
}

// Function to create a pair with the second element fixed
export function pairWith<B>(b: B) {
  return <A>(a: A): Pair<A, B> => [a, b];
}

// Function to create a pair with the second element as a result of a function applied to the first element
export function pairBy<F extends (x: any) => any>(f: F) {
  return <X>(x: X): [X, ReturnType<F>] => [x, f(x)];
}

// Function to duplicate a value in a pair
export function duplicate<A>(a: A): Pair<A, A> {
  return [a, a];
}

// Function to map the first element of a pair using a function
export function mapFirst<A, B, C>(f: (a: A) => C) {
  return ([a, b]: Pair<A, B>): Pair<C, B> => [f(a), b];
}

// Function to map the second element of a pair using a function
export function mapSecond<A, B, C>(g: (b: B) => C) {
  return ([a, b]: Pair<A, B>): Pair<A, C> => [a, g(b)];
}

// Function to map the second element of a pair using a function that takes the first element
export function mapPair<A, B, C>(g: (a: A) => (b: B) => C) {
  return ([a, b]: Pair<A, B>): Pair<A, C> => [a, g(a)(b)];
}

// Function to fold a pair using a function that takes two arguments
export function foldPair<A, B, C>(f: (a: A) => (b: B) => C) {
  return ([a, b]: Pair<A, B>): C => f(a)(b);
}
