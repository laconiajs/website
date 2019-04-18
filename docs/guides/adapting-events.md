---
id: adapting-events
title: Adapting Events
sidebar_label: Adapting Events
---

## Overview

Laconia provides two ways for you to adapt AWS events into your applications:

- Creating your own adapter
- Using Laconia built-in adapters

## Creating an adapter

As Laconia is encouraging you to design your ports first, it is likely that you
will need to implement your own adapter. Let's take a simple example of an S3
adapter that retrieves an S3 object from S3 bucket. You can do it like so with
the [`event`](api/event.md) package:

```js
const laconia = require("@laconia/core");
const { s3 } = require("@laconia/event");

const app = objectFromS3 => console.log(objectFromS3);

const adapter = app => async event => app(await s3(event).getObject());

exports.handler = laconia(adapter(app));
```

## Using built-in adapters

Laconia also provides built-in adapters to handle simple adapter
implementations. _Only use the built-in adapters when it matches with your
application's ports_. Taking the previous example of retrieving an S3 object
from S3 event, you can use the Laconia built-in adapters like this:

```js
const laconia = require("@laconia/core");
const s3 = require("@laconia/adapter").s3();

const app = objectFromS3 => console.log(objectFromS3);

exports.handler = laconia(s3(app));
```

The [`adapter`](api/adapter.md) package is using the [`event`](api/event.md)
package internally too.
