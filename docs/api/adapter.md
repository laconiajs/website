---
id: adapter
title: adapter
sidebar_label: adapter
---

## `s3(options)(app)`

Creates an event adapter that will retrieve the object that has triggered the
event from S3, then convert the object into your application input based on the
`inputType` option.

- `options`:
  - `inputType = "object"`
    - Supported values are: `object`, `stream`, `event`
    - Determines what should the application receive as an input

_To reduce your code dependency to AWS, opt for other `inputType` before using
`event`. The `event` inputType should only be used when you don't actually need
to retrieve the object from S3, such as listening to s3:ObjectRemoved:Delete
events_.

Example:

```js
// inputType: object
const laconia = require("@laconia/core");
const s3 = require("@laconia/adapter").s3();

const app = async object => {
  console.log(object); // do operation with the object
};

exports.handler = laconia(s3(app));

// inputType: stream
const laconia = require("@laconia/core");
const s3 = require("@laconia/adapter").s3({ inputType: "stream" });

const app = async inputStream => {
  inputStream.pipe(); // do stream operation with the S3 object stream
};

exports.handler = laconia(s3(app));

// inputType: event
const laconia = require("@laconia/core");
const s3 = require("@laconia/adapter").s3({ inputType: "event" });

const app = async s3Event => {
  console.log(
    "Received an event from S3: ",
    s3Event.bucket, // Bucket name
    s3Event.key // The URL decoded object key
  );
};

exports.handler = laconia(s3(app));
```

## `kinesis()(app)`

Creates an event adapter that will parse kinesis event data from JSON format
into regular object. This event adapter will also handle the Kinesis event data
format which are stored in base64 and buried in a nested structure.

Example:

```js
const laconia = require("@laconia/core");
const kinesis = require("@laconia/adapter").kinesis();

const app = async records => {
  console.log(records); // Prints: [{ mykey: 'my value'}]
};

exports.handler = laconia(kinesis(app));

// Calls handler with an example Kinesis event
exports.handler({
  Records: [
    {
      kinesis: {
        data: "eyJteWtleSI6Im15IHZhbHVlIn0=" // This is the value you'll get from object: { mykey: 'my value' }
      }
    }
  ]
});
```

## `sns()(app)`

Creates an event adapter that will parse sns message from JSON format into
regular object.

Example:

```js
const laconia = require("@laconia/core");
const sns = require("@laconia/adapter").sns();

const app = async message => {
  console.log(message); // Prints: { mykey: 'my value'}
};

exports.handler = laconia(sns(app));

// Calls handler with an example SNS event
exports.handler({
  Records: [
    {
      Sns: {
        Message: '{"mykey":"my value"}'
      }
    }
  ]
});
```

## `sqs()(app)`

Creates an event adapter that will parse SQS message body from JSON into regular
object.

Example:

```js
const laconia = require("@laconia/core");
const sqs = require("@laconia/adapter").sqs();

const app = async messages => {
  console.log(messages); // Prints: [{ mykey: 'my value'}]
};

exports.handler = laconia(sqs(app));

// Calls handler with an example SQS event
exports.handler({
  Records: [
    {
      body: '{"mykey":"my value"}'
    }
  ]
});
```
