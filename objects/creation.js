function associate(f) {
  return (items) => {
    const obj = {};

    for (const item of items) {
      const [key, value] = f(item);
      obj[key] = value;
    }

    return obj;
  };
}

function associateBy(f) {
  return (values) => {
    const obj = {};

    for (const value of values) {
      obj[f(value)] = value;
    }

    return obj;
  };
}

function associateWith(f) {
  return (keys) => {
    const obj = {};

    for (const key of keys) {
      obj[key] = f(key);
    }

    return obj;
  };
}

function fromProperty(key) {
  return (value) => ({ [key]: value });
}

function fromEntry([key, value]) {
  return { [key]: value };
}

function fromEntries(entries) {
  return Object.fromEntries(entries);
}

export {
  associate,
  associateBy,
  associateWith,
  fromEntries,
  fromEntry,
  fromProperty,
};
