import { identity } from "../higher_order.js";
import { map } from "./mapping.js";
import { zip } from "./join.js";
import { keys } from "../objects/access.js";

function partition(predicate) {
  return (arr) => {
    const positive = [];
    const negative = [];

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      const partition = predicate(item) ? positive : negative;

      partition.push(item);
    }

    return [positive, negative];
  };
}

function groupBy(computeKey) {
  return (arr) => {
    const groups = {};

    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];

      const key = computeKey(item);

      if (!groups.hasOwnProperty(key)) {
        groups[key] = [item];
      } else {
        groups[key].push(item);
      }
    }

    return groups;
  };
}

function groupEntriesBy(computeKey, deserializeKey = identity) {
  return (arr) => {
    const grouped = groupBy(computeKey)(arr);

    const groupKeys = keys(grouped);

    const deserializedGroupKeys = map(deserializeKey)(groupKeys);

    return map(([key, deserialized]) => [deserialized, grouped[key]])(
      zip(groupKeys, deserializedGroupKeys),
    );
  };
}

function chunk(size) {
  return (arr) => {
    const chunks = [];

    const numberOfItems = arr.length;

    let i = 0;
    while (i < numberOfItems) {
      const chunk = [];
      for (let step = 0; step < size && i < numberOfItems; step++) {
        chunk.push(arr[i]);
        i++;
      }
      chunks.push(chunk);
    }

    return chunks;
  };
}

function splitAt(position) {
  return (arr) => [arr.slice(0, position), arr.slice(position)];
}

export { chunk, groupBy, groupEntriesBy, partition, splitAt };
