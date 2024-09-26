export function stringifyKeysInOrder(data) {
  function recursivelyOrderKeys(unordered) {
    // If it's an array - recursively order any
    // dictionary items within the array
    if (Array.isArray(unordered)) {
      unordered.forEach(function (item, index) {
        unordered[index] = recursivelyOrderKeys(item);
      });
      return unordered;
    }
    // If it's an object - let's order the keys
    if (typeof unordered === "object") {
      const ordered = {};
      Object.keys(unordered)
        .sort()
        .forEach(function (key) {
          ordered[key] = recursivelyOrderKeys(unordered[key]);
        });
      return ordered;
    }
    return unordered;
  }
  return JSON.stringify(recursivelyOrderKeys(data), null, 2);
}

/**
 * The function returns an array with nested key/value pairs, where the unique key
 * represents a word and the value the amount of the word's appearances:
 * Example:
 * let text = "Hello World, hello Sun!";
 * const words = getWordCnt(text); // [ [ "Hello", 2 ], [ "World", 1 ], [ "Sun", 1 ] ]
 * const strings = words.map(
 * ([key, value]) => `The word '${key}' appears ${value} time(s)`,
 * );
 */
export function getWordCnt(text) {
  return Object.entries(
    text
      .toLowerCase()
      .split(/\W+/)
      .filter((line) => !!line)
      .reduce((acc, el) => {
        acc[el] = acc[el] + 1 || 1;
        return acc;
      }, {}),
  );
}
