export function split(separator) {
  return (s) => s.split(separator);
}

export const splitByAmpersand = split("&");
export const splitByComma = split(",");
export const splitByCommaSpace = split(", ");
export const splitByDash = split("-");
export const splitByDot = split(".");
export const splitBySemicolon = split("; ");
export const splitBySemicolonSpace = split("; ");
export const splitBySlash = split("/");
export const splitBySpace = split(" ");
export const splitByNewline = split("\n");
export const splitByEqualitySign = split("=");
export const splitByPlus = split("+");
export const splitByPipe = split("|");
