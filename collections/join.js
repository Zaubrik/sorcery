import { isArray, isString } from "../type.js";

export function concat(...items) {
  if (items.length === 1) {
    const firstItem = items[0];

    if (isArray(firstItem)) {
      // 2D array with a single item
      if (firstItem.length === 1) {
        return firstItem[0];
      } else {
        return concat(...firstItem);
      }
    }
  }

  const initial = isString(items[0]) ? "" : [];

  return items.reduce(
    (acc, s) => acc.concat(s),
    initial,
  );
}

export function join(separator) {
  return (...items) => {
    return items.flat().join(separator);
  };
}

export const joinWithAmpersand = join("&");
export const joinWithComma = join(",");
export const joinWithCommaSpace = join(", ");
export const joinWithDash = join("-");
export const joinWithDot = join(".");
export const joinWithSemicolon = join(";");
export const joinWithSemicolonSpace = join("; ");
export const joinWithSlash = join("/");
export const joinWithSpace = join(" ");
export const joinWithNewline = join("\n");
export const joinWithEqualitySign = join("=");
export const joinWithPlus = join("+");
export const joinWithPipe = join("|");
