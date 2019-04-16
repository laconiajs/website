---
id: creating-api-endpoints
title: Creating API Endpints
sidebar_label: 🚧Creating API Endpoints
---

_**🚧Under construction, come back later 🚧**_

## Overview

Laconia supports parsing and responding to AWS API Gateway Lambda Proxy
Integration. Laconia provides two ways for you to adapt AWS events into your
applications:

- Creating your own adapter
- Using Laconia built-in adapters

Single purpose function blah

## Creating an adapter

TBD

automatic parsing blah blah

<!-- function, not send() -->

### Error handling

TBD - Copy ValidationError stuff

### CORS

## Using built-in adapters

```js
const laconia = require("@laconia/core");
const apigateway = require("@laconia/adapter-api").apigateway({
  inputType: "params"
});

// id is made available either from pathParameters or queryStringparameters
const app = async ({ id }, { orderStream }) => {
  await orderStream.send({ eventType: "accepted", orderId: id }); // Interacts with registered dependency
  return { status: "ok" }; // JSON Stringifies response body automatically
};

exports.handler = laconia(apigateway(app)).register(instances);
```

### Error handling

`adapter-api` encourages your application not to have any HTTP knowledge, hence
Laconia supports a simple mapping from error name thrown from your application,
to the response that it should return.

The following example returns statusCode 400 when ValidationError is returned.

```js
const apigateway = require("@laconia/adapter-api").apigateway({
  errorMappings: {
    "Validation.*": () => ({ statusCode: 400 })
  }
});

exports.handler = laconia(apigateway(app));
```

### CORS

TBD
