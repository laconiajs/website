---
id: event
title: event
sidebar_label: event
---

Parses and responds to incoming events. Helps you create your own adapter
easily.

## `s3(event, s3 = new AWS.S3())`

Parses and contain the incoming S3 event into `S3Event` object.

Example:

```js
// Example creation of an adapter
const { s3 } = require("@laconia/event");

const adapter = app => (event, dependencies) => {
  const s3Event = s3(event);
  // Interact with s3Event object
  console.log(s3Event.bucket);
  console.log(s3Event.key);
};
```

### `S3Event.bucket`

Returns the S3 bucket name that has triggered the Lambda

### `S3Event.key`

Returns the S3 object key that has triggered the Lambda. The key will already be
normalized for you by handling the + sign and URL decoding it. For example, this
property will return "red flower.jpg" instead of "red+flower.jpg"

### `S3Event.getObject()`

Retrieves the object from the S3 bucket that has triggered the Lambda. It
returns only the `Body` returned by aws-sdk.

### `S3Event.getJson()`

Retrieves the object from the S3 bucket that has triggered the Lambda, and
parses it into JSON.

### `S3Event.getStream()`

Creates a read stream for the object that has triggered the Lambda.

## `sns(event)`

Parses and contain the incoming SNS event into `SnsEvent` object.

Example:

```js
// Example creation of an adapter
const { sns } = require("@laconia/event");

const adapter = app => (event, dependencies) => {
  const snsEvent = sns(event);
  // Interact with snsEvent object
  console.log(snsEvent.message);
  console.log(snsEvent.subject);
};
```

### `SnsEvent.subject`

Returns the subject of the SNS message.

### `SnsEvent.message`

Returns the body of the SNS message. The message will automatically be JSON
parsed.

## `sqs(event)`

Parses and contain the incoming SQS event into `SqsEvent` object.

Example:

```js
// Example creation of an adapter
const { sqs } = require("@laconia/event");

const adapter = app => (event, dependencies) => {
  const sqsEvent = sqs(event);

  // Create an array of SQS message body
  console.log(sqsEvent.records.map(r => r.body));
};
```

### `SqsEvent.records`

Returns an array of `SqsRecord`.

### `SqsRecord.body`

Returns the body of the SQS message. The message will automatically be JSON
parsed.

## `kinesis(event)`

Parses and contain the incoming Kinesis event into `KinesisEvent` object.

Example:

```js
// Example creation of an adapter
const { kinesis } = require("@laconia/event");

const adapter = app => (event, dependencies) => {
  // Create an array of kinesis data
  console.log(kinesis(event).records.map(r => r.jsonData));
};
```

### `KinesisEvent.records`

Returns an array of `KinesisRecord`.

### `KinesisRecord.jsonData`

Returns the record data in a form of JSON.

### `KinesisRecord.textData`

Returns the record data in a form of String.

### `KinesisRecord.data`

Returns the record data in a form of Buffer.

## `apigateway.req(event)`

Parses and contain the incoming API Gateway event into `ApiGatewayEvent` object.

Example:

```js
// Example creation of an adapter
const { req, res } = require("@laconia/event").apigateway;

const adapter = app => (event, dependencies) => {
  const r = req(event);
  console.log(r.body);
  const output = app(r.params.id, dependencies);
};
```

### `ApiGatewayEvent.body`

Returns the body of the request.

The returned HTTP request body is parsed according to the Content-Type header.
The currently supported Content-Types are:

- application/x-www-form-urlencoded
- application/json

When the Content-Type received is not supported, the body will not be parsed
(the original body from the API Gateway Lambda Integration event object will be
returned).

If `isBase64Encoded` set to true, the request body will be base64 decoded
automatically too.

### `ApiGatewayEvent.headers`

Returns the request headers object. You can access the header with the original
AWS case, or the lower case as per standard node HTTP standard (the canonical
format).

### `ApiGatewayEvent.params`

Returns the request params object, which is a combination of query string
parameters and path parameters.

## `apigateway.res(output, statusCode = 200, headers = {})`

Creates a new API Gateway Lambda Integration response object based on the
specified parameters.

You can specify the following output:

- Object
  - Response Content-Type will be set to application/json
  - Your app output will automatically be JSON stringified
- String
  - Response Content-Type will be set to text/plain
- Number
  - Response Content-Type will be set to text/plain
  - Your app output will automatically be JSON stringified
- Promise that wraps any of the above
- Buffer
  - Response Content-Type will be set to application/octet-stream
  - You app output will automatically be base64
- Stream - Unsupported yet

Example:

```js
// Example of adapter creation
const { req, res } = require("@laconia/event").apigateway;

const adapter = app => (event, dependencies) => {
  try {
    const output = app(id, dependencies);
    return res(output); // Returns 200
  } catch (err) {
    // Returns error response
    return res(err.message, 500);
  }
};

// Respond with 200
// Will print something like:
// {
//   body: 'Success message',
//   statusCode: 200,
//   headers: { 'Content-Type': 'text/plain' },
//   isBase64Encoded: false
// }
console.log(res("Success message"));

// Respond with 500
res("Some error message", 500);

// Respond with 404
res("Not found", 404);

// Respond with JSON body
res({ hello: "world" });

// Respond with headers
// Will print something like:
// {
//   body: '{"error":"not found"}',
//   statusCode: 404,
//   headers:
//     { 'Content-Type': 'application/json; charset=utf-8',
//       'Access-Allow-Control-Origin': '*' },
//   isBase64Encoded: false
// }
res({ error: "not found" }, 404, {
  "Access-Allow-Control-Origin": "*"
});
```
