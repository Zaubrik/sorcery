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

async function exampleChain() {
  // Step 1: Create some initial Result objects
  const result1 = succeed("first");
  const result2 = succeed("second");
  const result3 = succeed("third");

  // Step 2: Invert the results to aggregate the values
  const aggregatedResult = await invertResults(result1, result2, result3);

  // Step 3: Chain additional logic using chainResult
  const chainedResult = await chainResult(async (values: string[]) => {
    console.log("Values before modification:", values);

    // Simulate some transformation by appending a new value
    const newValues = [...values, "fourth"];
    return succeed(newValues);
  })(aggregatedResult);

  // Step 4: Map the result using mapResult to append more information
  const finalResult = await mapResult(async (values: string[]) => {
    console.log("Values after modification:", values);

    // Further transformation, e.g., converting to upper case
    return values.map((value) => value.toUpperCase());
  })(chainedResult);

  // Step 5: Use foldResult to handle success or failure
  const finalOutput = await foldResult(
    async (values: string[]) => {
      console.log("Final Success:", values);
      return values;
    },
  )(
    async (error: any) => {
      console.error("Final Failure:", error);
      return error;
    },
  )(finalResult);

  return finalOutput;
}

exampleChain()
  .then((result) => console.log("Final Result:", result))
  .catch((error) => console.error("Error in chain:", error));
