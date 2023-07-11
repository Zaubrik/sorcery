function not(predicate) {
  return (x) => !predicate(x);
}

function negate(value) {
  return !value;
}

export { negate, not };
