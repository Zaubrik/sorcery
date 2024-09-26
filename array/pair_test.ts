import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  duplicate,
  foldPair,
  mapFirst,
  mapPair,
  mapSecond,
  pair,
  pairBy,
  pairWith,
} from "./pair.ts";

// Test `pair` function
Deno.test("pair should create a pair with the first element fixed", () => {
  const p = pair(1)("test");
  assertEquals(p, [1, "test"]);
});

Deno.test("pairWith should create a pair with the second element fixed", () => {
  const p = pairWith("fixed")(2);
  assertEquals(p, [2, "fixed"]);
});

// Test `pairBy` function
Deno.test("pairBy should create a pair with the second element as result of function applied to first", () => {
  const p = pairBy((x: number) => x * 2)(5);
  assertEquals(p, [5, 10]);
});

// Test `duplicate` function
Deno.test("duplicate should create a pair with both elements the same", () => {
  const p = duplicate("same");
  assertEquals(p, ["same", "same"]);
});

// Test `mapFirst` function
Deno.test("mapFirst should map the first element of the pair", () => {
  const p = mapFirst((a: number) => a + 1)([1, "value"]);
  assertEquals(p, [2, "value"]);
});

// Test `mapSecond` function
Deno.test("mapSecond should map the second element of the pair", () => {
  const p = mapSecond((b: string) => b.toUpperCase())([1, "value"]);
  assertEquals(p, [1, "VALUE"]);
});

// Test `mapPair` function
Deno.test("mapPair should apply function to the second element based on the first element", () => {
  const p = mapPair((a: number) => (b: string) => `${a}-${b}`)([2, "value"]);
  assertEquals(p, [2, "2-value"]);
});

// Test `foldPair` function
Deno.test("foldPair should fold a pair into a single value", () => {
  const result = foldPair((a: number) => (b: string) => `${a}:${b}`)([
    3,
    "test",
  ]);
  assertEquals(result, "3:test");
});
