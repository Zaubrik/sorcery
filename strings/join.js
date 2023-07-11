import { isArray } from "../type.js";

function join(separator) {
  return (...items) => {
    if (items.length === 1) {
      const firstItem = items[0];

      if (isArray(firstItem)) {
        return join(separator)(...firstItem);
      }
    }

    return items.join(separator);
  };
}

const joinWithAmpersand = join("&");
const joinWithComma = join(",");
const joinWithCommaSpace = join(", ");
const joinWithDash = join("-");
const joinWithDot = join(".");
const joinWithSemicolon = join(";");
const joinWithSemicolonSpace = join("; ");
const joinWithSlash = join("/");
const joinWithSpace = join(" ");
const joinWithNewline = join("\n");
const joinWithEqualitySign = join("=");
const joinWithPlus = join("+");

function split(separator) {
  return (s) => s.split(separator);
}

const splitByAmpersand = split("&");
const splitByComma = split(",");
const splitByCommaSpace = split(", ");
const splitByDash = split("-");
const splitByDot = split(".");
const splitBySemicolon = split("; ");
const splitBySemicolonSpace = split("; ");
const splitBySlash = split("/");
const splitBySpace = split(" ");
const splitByNewline = split("\n");
const splitByEqualitySign = split("=");
const splitByPlus = split("+");

export {
  join,
  joinWithAmpersand,
  joinWithComma,
  joinWithCommaSpace,
  joinWithDash,
  joinWithDot,
  joinWithEqualitySign,
  joinWithNewline,
  joinWithPlus,
  joinWithSemicolon,
  joinWithSemicolonSpace,
  joinWithSlash,
  joinWithSpace,
  split,
  splitByAmpersand,
  splitByComma,
  splitByCommaSpace,
  splitByDash,
  splitByDot,
  splitByEqualitySign,
  splitByNewline,
  splitByPlus,
  splitBySemicolon,
  splitBySemicolonSpace,
  splitBySlash,
  splitBySpace,
};
