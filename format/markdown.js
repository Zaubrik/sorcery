/**
 * Takes a string and returns the markdown headings.
 *
 * @param {string} str
 * @return {string[]}
 */
export function getMarkdownHeadings(str) {
  const regex = /^#{1,6} (.+)$/gm;
  const matches = [...str.matchAll(regex)];
  const headings = matches.map((match) => match[0]);
  return headings;
}

/**
 * Takes a markdown string and removes the "#" symbols.
 *
 * @param {str} str
 * @return {string}
 * ```js
 * const markdownText = `
 * # Heading 1
 * Some text for heading 1.
 * ## Heading 2
 * Some text for heading 2.
 * `;
 * const headings = getMarkdownHeadings(markdownText);
 * const cleanHeadings = headings.map(removeHashSymbols);
 * ```
 */
export function removeHashSymbols(str) {
  return str.replace(/^#+\s*/, "").trim();
}
