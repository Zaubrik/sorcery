function fill(value) {
  return (n) => {
    const result = Array(n);

    for (let i = 0; i < n; i++) {
      result[i] = value;
    }

    return result;
  };
}

function fillWith1ToN(n) {
  return Array.from(Array(n).keys());
}

function range(inclusiveStart) {
  return (exclusiveEnd) => {
    return steps(inclusiveStart)(exclusiveEnd)(1);
  };
}

function inclusiveRange(inclusiveStart) {
  return (inclusiveEnd) => {
    return range(inclusiveStart)(inclusiveEnd + 1);
  };
}

function steps(inclusiveStart) {
  return (exclusiveEnd) => (stepSize) => {
    const size = Math.ceil((exclusiveEnd - inclusiveStart) / stepSize);

    if (size < 1) {
      return [];
    }

    const result = Array(size);

    for (
      let i = 0, current = inclusiveStart;
      i < size;
      i++, current += stepSize
    ) {
      result[i] = current;
    }

    return result;
  };
}

function inclusiveSteps(inclusiveStart) {
  return (inclusiveEnd) => (stepSize) =>
    steps(inclusiveStart)(inclusiveEnd + 1)(stepSize);
}

export { fill, fillWith1ToN, inclusiveRange, inclusiveSteps, range, steps };
