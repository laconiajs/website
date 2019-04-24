---
id: long-running-tasks
title: Long Running Tasks
sidebar_label: Long Running Tasks
---

## Overview

AWS Lambda maximum execution duration per request is 15 minutes, hence it is
impossible to utilise a Lambda to execute a long-running task.
[`batch`](api/batch.md) handles your batch processing needs by providing a
beautifully designed API which abstracts the time limitation problem.

These are the currently supported input sources:

- DynamoDB
- S3

## How it works internally

[`batch`](api/batch.md) works around the Lambda's time limitation by using
recursion. It will automatically recurse when Lambda timeout is about to happen,
then resumes from where it left off in the new invocation.

Imagine if you are about to process the array [1, 2, 3, 4, 5] and each request
can only handle two items, the following will happen:

- request 1: Process 1
- request 1: Process 2
- request 1: Not enough time, recursing with the current cursor
- request 2: Process 3
- request 2: Process 4
- request 2: Not enough time, recursing with the current cursor
- request 3: Process 5

## Using built-in readers

The Laconia batch processor can be used by creating the `laconiaBatch` handler.
The handler will require a reader, which is responsible on providing the next
item available from the input source. Once you have set the reader up, the
handler will fire `item` event which would contain the item that has been read
by the reader specified.

```js
const laconiaBatch = require("@laconia/batch");

const instances = () => ({ service: new MyService() });

exports.handler = laconiaBatch(_ =>
  // Create S3 Reader
  laconiaBatch.s3({
    path: ".",
    s3Params: {
      Bucket: process.env["BUCKET_NAME"],
      Key: "items.json"
    }
  })
)
  .register(instances)
  .on("item", async ({ service }, item) => {
    // Process the item found in the array in items.json
    service.operate(item);
  });
```
