/**
 * Ulid
 * https://deno.land/std@0.224.0/ulid/mod.ts
 */
const ENCODING = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const ENCODING_LEN = ENCODING.length;
const TIME_MAX = Math.pow(2, 48) - 1;
const RANDOM_LEN = 16;
function replaceCharAt(str, index, __char) {
  return str.substring(0, index) + __char + str.substring(index + 1);
}
function encodeTime(now, len = 10) {
  if (!Number.isInteger(now) || now < 0 || now > TIME_MAX) {
    throw new Error("Time must be a positive integer less than " + TIME_MAX);
  }
  let str = "";
  for (; len > 0; len--) {
    const mod = now % ENCODING_LEN;
    str = ENCODING[mod] + str;
    now = (now - mod) / ENCODING_LEN;
  }
  return str;
}
function encodeRandom(len) {
  let str = "";
  const randomBytes = crypto.getRandomValues(new Uint8Array(len));
  for (const randomByte of randomBytes) {
    str += ENCODING[randomByte % ENCODING_LEN];
  }
  return str;
}
function incrementBase32(str) {
  let index = str.length;
  let __char;
  let charIndex;
  const maxCharIndex = ENCODING_LEN - 1;
  while (--index >= 0) {
    __char = str[index];
    charIndex = ENCODING.indexOf(__char);
    if (charIndex === -1) {
      throw new Error("incorrectly encoded string");
    }
    if (charIndex === maxCharIndex) {
      str = replaceCharAt(str, index, ENCODING[0]);
      continue;
    }
    return replaceCharAt(str, index, ENCODING[charIndex + 1]);
  }
  throw new Error("cannot increment this string");
}
function monotonicFactory(encodeRand = encodeRandom) {
  let lastTime = 0;
  let lastRandom;
  return function ulid(seedTime = Date.now()) {
    if (seedTime <= lastTime) {
      const incrementedRandom = lastRandom = incrementBase32(lastRandom);
      return encodeTime(lastTime, 10) + incrementedRandom;
    }
    lastTime = seedTime;
    const newRandom = lastRandom = encodeRand(RANDOM_LEN);
    return encodeTime(seedTime, 10) + newRandom;
  };
}
export function decodeTime(id) {
  if (id.length !== 10 + 16) {
    throw new Error("malformed ulid");
  }
  const time = id.substring(0, 10).split("").reverse().reduce(
    (carry, __char, index) => {
      const encodingIndex = ENCODING.indexOf(__char);
      if (encodingIndex === -1) {
        throw new Error("invalid character found: " + __char);
      }
      return carry += encodingIndex * Math.pow(ENCODING_LEN, index);
    },
    0,
  );
  if (time > TIME_MAX) {
    throw new Error("malformed ulid, timestamp too large");
  }
  return time;
}
export const monotonicUlid = monotonicFactory();
function ulid(seedTime = Date.now()) {
  return encodeTime(seedTime, 10) + encodeRandom(16);
}

export { ulid as generateUlid };
