export function getRandomInt(min = 1, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement(array) {
  return array[Math.floor(array.length * Math.random())];
}

export function getRandomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
