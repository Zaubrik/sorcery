import {
  catchResult,
  chainResult,
  fail,
  failIf,
  failIfEmpty,
  failIfNull,
  foldResult,
  invertResults,
  isFailure,
  isSuccess,
  mapFailure,
  mapResult,
  succeed,
  transformPromiseToResult,
  transformResultToPromise,
  tryCatch,
} from "./result.ts";
import { assertEquals, assertRejects } from "./test_deps.js";

Deno.test("succeed should create a success result", () => {
  const result = succeed("value");
  assertEquals(result, { value: "value", kind: "success" });
});

Deno.test("fail should create a failure result", () => {
  const result = fail("error");
  assertEquals(result, { error: "error", kind: "failure" });
});

Deno.test("failIf should fail if condition is met", () => {
  const failIfNegative = failIf((num: number) => num < 0);
  const result = failIfNegative("negative number")(5);
  assertEquals(result.kind, "success");

  const resultFail = failIfNegative("negative number")(-1);
  assertEquals(resultFail, { error: "negative number", kind: "failure" });
});

Deno.test("failIfEmpty should fail on empty array", () => {
  const result = failIfEmpty("Array is empty")([]);
  assertEquals(result, { error: "Array is empty", kind: "failure" });

  const successResult = failIfEmpty("Array is empty")([1, 2, 3]);
  assertEquals(successResult, { value: [1, 2, 3], kind: "success" });
});

Deno.test("failIfNull should fail on null", () => {
  const result = failIfNull("Value is null")(null);
  assertEquals(result, { error: "Value is null", kind: "failure" });

  const successResult = failIfNull("Value is null")("value");
  assertEquals(successResult, { value: "value", kind: "success" });
});

Deno.test("isSuccess should return true for success", () => {
  const result = succeed("value");
  assertEquals(isSuccess(result), true);
});

Deno.test("isSuccess should return false for failure", () => {
  const result = fail("error");
  assertEquals(isSuccess(result), false);
});

Deno.test("isFailure should return true for failure", () => {
  const result = fail("error");
  assertEquals(isFailure(result), true);
});

Deno.test("isFailure should return false for success", () => {
  const result = succeed("value");
  assertEquals(isFailure(result), false);
});

Deno.test("mapResult should map value for success", async () => {
  const result = succeed("hello");
  const newResult = await mapResult(async (value: string) =>
    value.toUpperCase()
  )(result);
  assertEquals(newResult, { value: "HELLO", kind: "success" });
});

Deno.test("mapResult should not map for failure", async () => {
  const result = fail("error");
  const newResult = await mapResult(async (value: string) =>
    value.toUpperCase()
  )(result);
  assertEquals(newResult, { error: "error", kind: "failure" });
});

Deno.test("mapFailure should map error for failure", async () => {
  const result = fail("error");
  const newResult = await mapFailure(async (error: string) =>
    error.toUpperCase()
  )(result);
  assertEquals(newResult, { error: "ERROR", kind: "failure" });
});

Deno.test("mapFailure should not map for success", async () => {
  const result = succeed("value");
  const newResult = await mapFailure(async (error: string) =>
    error.toUpperCase()
  )(result);
  assertEquals(newResult, { value: "value", kind: "success" });
});

Deno.test("chainResult should chain success", async () => {
  const result = succeed("value");
  const newResult = await chainResult(async (value: string) =>
    succeed(value.toUpperCase())
  )(result);
  assertEquals(newResult, { value: "VALUE", kind: "success" });
});

Deno.test("chainResult should not chain for failure", async () => {
  const result = fail("error");
  const newResult = await chainResult(async (value: string) =>
    succeed(value.toUpperCase())
  )(result);
  assertEquals(newResult, { error: "error", kind: "failure" });
});

Deno.test("catchResult should handle failure", async () => {
  const result = fail("error");
  const newResult = await catchResult(async (error: string) =>
    succeed("recovered")
  )(result);
  assertEquals(newResult, { value: "recovered", kind: "success" });
});

Deno.test("catchResult should not change success", async () => {
  const result = succeed("value");
  const newResult = await catchResult(async (error: string) =>
    succeed("recovered")
  )(result);
  assertEquals(newResult, { value: "value", kind: "success" });
});

Deno.test("foldResult should handle success", async () => {
  const result = succeed("value");
  const finalResult = await foldResult(
    async (value: string) => `Success: ${value}`,
  )(
    async (error: string) => `Error: ${error}`,
  )(result);

  assertEquals(finalResult, "Success: value");
});

Deno.test("foldResult should handle failure", async () => {
  const result = fail("error");
  const finalResult = await foldResult(
    async (value: string) => `Success: ${value}`,
  )(
    async (error: string) => `Error: ${error}`,
  )(result);

  assertEquals(finalResult, "Error: error");
});

Deno.test("invertResults should return success if all are success", async () => {
  const result = await invertResults(succeed("a"), succeed("b"), succeed("c"));
  assertEquals(result, { value: ["a", "b", "c"], kind: "success" });
});

Deno.test("invertResults should return first failure", async () => {
  const result = await invertResults(succeed("a"), fail("error"), succeed("c"));
  assertEquals(result, { error: "error", kind: "failure" });
});

Deno.test("transformPromiseToResult should succeed on resolved promise", async () => {
  const result = await transformPromiseToResult(Promise.resolve("value"));
  assertEquals(result, { value: "value", kind: "success" });
});

Deno.test("transformPromiseToResult should fail on rejected promise", async () => {
  const result = await transformPromiseToResult(Promise.reject("error"));
  assertEquals(result, { error: "error", kind: "failure" });
});

Deno.test("transformResultToPromise should resolve for success", async () => {
  const result = succeed("value");
  const value = await transformResultToPromise(result);
  assertEquals(value, "value");
});

Deno.test("transformResultToPromise should reject for failure", async () => {
  const result = fail("error");
  await assertRejects(
    async () => {
      return await transformResultToPromise(result), Error, "error";
    },
  );
});

Deno.test("tryCatch should succeed when no error is thrown", async () => {
  const func = async (input: string) => `Hello, ${input}`;
  const result = await tryCatch(func)("world");
  assertEquals(result, { value: "Hello, world", kind: "success" });
});

Deno.test("tryCatch should fail when error is thrown", async () => {
  const func = async (_input: string) => {
    throw new Error("oops");
  };
  const result = await tryCatch(func)("world");
  assertEquals(result.kind, "failure");
});
