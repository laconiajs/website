---
id: warming-up
title: Warming Up
sidebar_label: Warming Up
---

## Overview

Sometimes you'll have Lambda that you need to warmup. Laconia itself does not
have any built-in ability yet to warmup your Lambdas. At this point of time,
Laconia provides middlewares that allow you to integrate with existing libraries
or tools to bypass your Lambda execution.

## Using the built-in middlewares

Lambda execution can be bypassed in Laconia by wrapping the handler around in a
middleware. There are two integration that is supported build-in as of the time
of writing:

- [serverless-plugin-warmup](api/middleware-serverless-plugin-warmup.md)
- [lambda-warmer](api/middleware-lambda-warmer.md)

This example below shows how you can bypass the Lambda execution when it is
triggered by the serverless-plugin-warmup:

```js
const warmup = require("@laconia/middleware-serverless-plugin-warmup")();
const laconia = require("@laconia/core");

const app = (event, laconiaContext) => {};
const handler = laconia(app);

exports.handler = warmup(handler);
```
