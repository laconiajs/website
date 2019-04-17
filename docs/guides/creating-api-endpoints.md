---
id: creating-api-endpoints
title: Creating API Endpints
sidebar_label: 🚧Creating API Endpoints
---

_**🚧Under construction, come back later 🚧**_

## Overview

Laconia supports parsing and responding to AWS API Gateway Lambda Proxy
Integration. Like other AWS Lambda events, Laconia provides two ways for you to
adapt API Gateway events into your applications:

- Creating your own adapter
- Using Laconia built-in adapters

## The principles

Laconia encourages single purpose function, which means most of your routing
needs must be defined in API Gateway instead of Lambda.

Incoming events should be able to be treated with plain function concept.
Requests that are coming in is function arguments, response that goes out is
`return` statement. This means Laconia does not support the typical semantic of
`req, res` as compared to other web frameworks.

## Creating an adapter

As Laconia is encouraging you to design your ports first, it is likely that you
will need to implement your own adapter. Let's take an example of an API
endpoint for creating an arbitrary order. You can implement it with the `event`
package like this:

```js
const laconia = require("@laconia/core");
const { req, res } = require("@laconia/event").apigateway;

// Your core application
const createOrder = (orderId, orderDetails) => {
  // Creates order...
  throw new Error("Duplicate order Id");
};

const adapter = app => event => {
  try {
    const r = req(event); // Parse raw API Gateway event
    const orderId = r.params.id; // Get id from either path parameter or query string parameter
    const orderDetails = r.body; // JSON parse the body if content-type is application/json
    const output = app(orderId, orderDetails);
    return res(output); // Creates an API Gateway response
  } catch (err) {
    // Perform `JSON.stringify` automatically and set status code to 500
    return res({ error: { message: err.message } }, 500);
  }
};

exports.handler = laconia(adapter(createOrder));
```

### Composition

Laconia believes that intuitive API design is the design that's closest to the
programming language used. To support shared code, such as additional headers
for CORS across multiple Lambdas, you can do a simple composition like this:

```js
const withCors = next => async (...args) => {
  const response = await next(...args);
  response.headers["Access-Control-Allow-Origin"] = "*";
  return response;
};

const adapter = app => withCors(event => res("hello"));
```

### Error handling

Your application code must not contain any HTTP details, this would include
error handling. The error must be handled in the `catch` block of your adapter.
You can check the error object's properties to customise the status code or
error body, such as by checking its name.

```js
const adapter = app => event => {
  try {
    return app(req(event).body);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res("ValidationError is thrown, the error was ...", 400);
    } else {
      return res("Unknown error", 500);
    }
  }
};
```

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

### Additional headers

```js
const apigateway = require("@laconia/adapter-api").apigateway({
  responseAdditionalHeaders: {
    "Access-Control-Allow-Origin": "*"
  }
});

exports.handler = laconia(apigateway(app));
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
