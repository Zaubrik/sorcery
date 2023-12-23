/**
 * Get a formatted date string based on the given timestamp.
 *
 * @param {number} timestamp - The timestamp to convert to a formatted date.
 * @param {Object} options - Options for formatting the date.
 * @param {string} [options.lang="de-DE"] - The language for the formatted date.
 * @returns {string} The formatted date string.
 */
function getFormattedDate(timestamp, { lang = "de-DE" } = {}) {
  const date = new Date(timestamp);
  const options /** @type {Intl.DateTimeFormatOptions} */ = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  const formattedDate = date.toLocaleDateString(lang, options);
  return formattedDate;
}

const r = getFormattedDate(1702292155654);
console.log(r);
const date = new Date(r);
console.log(date);

/**
 * Converts a formatted date string to a timestamp.
 *
 * @param {string} formattedDate - The formatted date string.
 * @param {Object} options - Options for the conversion.
 * @param {string} [options.lang="de-DE"] - The language used in the original formatting.
 * @return {number} - The timestamp.
 */
// function convertFormattedDateToTimestamp(
// formattedDate,
// { lang = "de-DE" } = {},
// ) {
// const options [> @type {Intl.DateTimeFormatOptions} <] = {
// year: "numeric",
// month: "long",
// day: "numeric",
// hour: "numeric",
// minute: "numeric",
// hour12: false,
// };

// const date = new Date(
// new Intl.DateTimeFormat(lang, options).formatToParts().reduce(
// (acc, part) => {
// acc += part.value;
// return acc;
// },
// "",
// ),
// );

// const timestamp = date.getTime();
// return timestamp;
// }

// const timestamp = convertFormattedDateToTimestamp(r);
// console.log(timestamp);
/**
 * Converts a formatted date string to a timestamp using the Date constructor.
 *
 * @param {string} formattedDate - The formatted date string.
 * @param {Object} options - Options for the conversion.
 * @param {string} [options.lang="de-DE"] - The language used in the original formatting.
 * @return {number|null} - The timestamp or null if the conversion fails.
 */
function convertFormattedDateToTimestamp(
  formattedDate,
  { lang = "de-DE" } = {},
) {
  try {
    // Define month names in the specified language
    const monthNames = {
      "Januar": 0,
      "Februar": 1,
      "März": 2,
      "April": 3,
      "Mai": 4,
      "Juni": 5,
      "Juli": 6,
      "August": 7,
      "September": 8,
      "Oktober": 9,
      "November": 10,
      "Dezember": 11,
    };

    // Split the formatted date string into parts
    const [day, month, year, , time] = formattedDate.split(" ");
    console.log(formattedDate.split(" "));

    // Extract numeric values from parts
    const dayNumeric = parseInt(day, 10);
    const monthNumeric = monthNames[month];
    const yearNumeric = parseInt(year, 10);
    // Extract hours and minutes from time
    const [hours, minutes] = time.split(":").map((part) => parseInt(part, 10));
    console.log("time:", time);
    console.log(dayNumeric, monthNumeric, yearNumeric, hours, minutes);

    // Create a new Date object
    const date = new Date(
      yearNumeric,
      monthNumeric,
      dayNumeric,
      hours,
      minutes,
    );
    console.log("aaaaa Date:", date);

    const timestamp = date.getTime();
    return timestamp;
  } catch (error) {
    console.error(`Error parsing date: ${formattedDate}`);
    return null;
  }
}

// Example usage:
const timestamp = convertFormattedDateToTimestamp(
  "11. Dezember 2023 um 11:55",
  { lang: "de-DE" },
);
console.log(timestamp);
console.log(getFormattedDate(timestamp));
