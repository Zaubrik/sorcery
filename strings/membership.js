function containsSubstring(substring) {
  return (candidate) => candidate.includes(substring);
}

function isSubstringOf(text) {
  return (candidate) => containsSubstring(candidate)(text);
}

function startsWith(searchString) {
  return (input) => input.startsWith(searchString);
}

function endsWith(searchString) {
  return (input) => input.endsWith(searchString);
}

export { containsSubstring, endsWith, isSubstringOf, startsWith };
