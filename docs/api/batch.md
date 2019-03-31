---
id: batch
title: batch
sidebar_label: batch
---

Reads large number of records without Lambda time limit.

## `laconiaBatch(reader(laconiaContext), batchOptions)`

- `reader(laconiaContext)`
  - This `Function` is called when your Lambda is invoked
  - The function must return a reader object, via `dynamoDb()`, `s3()`
  - Will be called with `laconiaContext` object, which can be destructured to
    `{event, context}`
- `batchOptions`
  - `itemsPerSecond`
    - _Optional_
    - Rate limit will not be applied if value is not set
    - Can be set to decimal, i.e. 0.5 will equate to 1 item per 2 second.
  - `timeNeededToRecurseInMillis`
    - _Optional_
    - The value set here will be used to check if the current execution is to be
      stopped
    - If you have a _very slow_ item processing, the batch processor might not
      have enough time to recurse and your Lambda execution might be timing out.
      You can increase this value to increase the chance of the the recursion to
      happen

Creates a AWS Lambda handler that read records and let you process each items.
It will automatically recurse if the Lambda is about to time out and continue
where it left off.

Example:

```js
const laconiaBatch = require("@laconia/batch");

// Use all default batch options (No rate limiting)
exports.handler = laconiaBatch(_ => laconiaBatch.dynamoDb());

// Customise batch options
exports.handler = laconiaBatch(_ => laconiaBatch.dynamoDb(), {
  itemsPerSecond: 2,
  timeNeededToRecurseInMillis: 10000
});
```

## `on(eventName, listener)`

These are the events that you can listen to when `@laconia/batch` is running:

- item: `listener(laconiaContext, item)`
  - Fired on every item read.
  - `item` is an object found during the read
- start: `listener(laconiaContext)`
  - Fired when the batch process is started for the very first time
- stop: `listener(laconiaContext, cursor)`
  - Fired when the current execution is timing out and about to be recursed
  - `cursor` contains the information of how the last item is being read
- end: `listener(laconiaContext)`
  - Fired when the batch processor can no longer find any more records

Example:

```js
laconiaBatch()
  .on("start", laconiaContext => {})
  .on("item", (laconiaContext, item) => {})
  .on("stop", (laconiaContext, cursor) => {})
  .on("end", laconiaContext => {});
```

## `dynamoDb(readerOptions)`

Creates a reader for a DynamoDB table.

- `operation`
  - _Mandatory_
  - Valid values are: `'SCAN'` and `'QUERY'`
- `dynamoDbParams`
  - _Mandatory_
  - This parameter is used when documentClent's operations are called
  - `ExclusiveStartKey` param can't be used as it will be overridden in the
    processing time!
- `documentClient = new AWS.DynamoDB.DocumentClient()`
  - _Optional_
  - Set this option if there's a need to cutomise the
    AWS.DynamoDB.DocumentClient instantation
  - Used for DynamoDB operation

Example:

```js
// Scans the entire Music table
dynamoDb({
  operation: "SCAN",
  dynamoDbParams: { TableName: "Music" }
});

// Queries Music table with a more complicated DynamoDB parameters
dynamoDb({
  operation: "QUERY",
  dynamoDbParams: {
    TableName: "Music",
    Limit: 1,
    ExpressionAttributeValues: {
      ":a": "Bar"
    },
    FilterExpression: "Artist = :a"
  }
});
```

## `s3(readerOptions)`

Creates a reader for an array stored in s3.

- `path`
  - _Mandatory_
  - The path to the array to be processed
  - Set to `'.'` if the object stored in s3 is the array
  - Set to a path if an object is stored in s3 and the array is a property of
    the object
    - `lodash.get` is used to retrieve the array
- `s3Params`
  - _Mandatory_
  - This parameter is used when `s3.getObject` is called to retrieve the array
    stored in s3
- `s3 = new AWS.S3()`
  - _Optional_
  - Set this option if there's a need to cutomise the AWS.S3 instantation
  - Used for S3 operation

Example:

```js
// Reads an array from array.json in MyBucket
s3({
  path: ".",
  s3Params: {
    Bucket: "MyBucket",
    Key: "array.json"
  }
});

// Reads the array retrieved at database.music[0]["category"].list from object.json in MyBucket
s3({
  path: 'database.music[0]["category"].list',
  s3Params: {
    Bucket: "MyBucket",
    Key: "object.json"
  }
});
```
