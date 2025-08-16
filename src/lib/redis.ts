import Redis from "ioredis";

const MAX_SEARCH_RESULTS = 1000;

export const redis = new Redis({
  host: "localhost",
  port: 6379,
});

export const performSearch = async (
  index: (string | number | Buffer<ArrayBufferLike>)[],
  ...query: any[]
) => {
  try {
    const searchResults = (await redis.call(
      "FT.SEARCH",
      index,
      ...query,
      "LIMIT",
      "0",
      MAX_SEARCH_RESULTS
    )) as any[];

    // An empty search result looks like [ 0 ].
    if (searchResults.length === 1) {
      return [];
    }

    // Actual results look like:
    //
    // [ 3, 'hashKey', ['fieldName', 'fieldValue', ...],
    //      'hashKey', ['fieldName, 'fieldValue', ...], ... ]

    const results = [];
    for (let n = 2; n < searchResults.length; n += 2) {
      const result: Record<string, any> = {};
      const fieldNamesAndValues = searchResults[n];

      for (let m = 0; m < fieldNamesAndValues.length; m += 2) {
        const k = fieldNamesAndValues[m] as string;
        const v = fieldNamesAndValues[m + 1];
        result[k] = v;
      }
      
      results.push(result);
    }

    return results;
  } catch (e) {
    // A malformed query or unknown index etc causes an exception type error.
    console.error(
      `Invalid search request for index: ${index}, query: ${query}`
    );
    console.error(e);
    return [];
  }
};
