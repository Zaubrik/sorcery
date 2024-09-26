export function perform(f) {
  return (x) => {
    f(x);

    return x;
  };
}
