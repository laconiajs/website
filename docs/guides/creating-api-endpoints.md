---
id: creating-api-endpoints
title: Creating API Endpoints
sidebar_label: Creating API Endpoints
---

## Overview

Laconia supports parsing and responding to AWS API Gateway Lambda Proxy
Integration. Like other [AWS Lambda events](guides/adapting-events.md), Laconia
provides two ways for you to adapt API Gateway events into your applications:

- Creating your own adapter
- Using Laconia built-in adapters

## The principles

Laconia encourages single purpose function, which means most of your routing
needs must be defined in API Gateway instead of Lambda.

Incoming events should be able to be treated with plain function. Requests that
are coming in is function arguments, response that goes out is a `return`
statement. This means Laconia does not support the typical semantic of `req` and
`res` from other web frameworks like Express.

## Creating an adapter

As Laconia is encouraging you to design your ports first, it is likely that you
will need to implement your own adapter. Let's take an example of an API
endpoint for creating an arbitrary order. You can implement it with the
[`event`](api/event.md) package like this:

```js
const laconia = require("@laconia/core");
const { req, res } = require("@laconia/event").apigateway;

// Your core application
const createOrder = async orderDetails => {
  // Creates order...
  throw new Error("Duplicate order Id");
};

const adapter = app => async event => {
  try {
    const r = req(event); // Parse raw API Gateway event
    const orderDetails = r.body; // JSON parse the request body if content-type is application/json
    const output = await app(orderDetails);
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

## Using built-in adapter

Laconia also provides built-in adapters to handle simple adapter
implementations. When building REST API, the [`adapter-api`](api/adapter-api.md)
only supports GET or POST at the moment as you can only select either `body` or
`params` input type at one time. Also, please _only use the built-in adapters
when it matches with your application's ports_. Taking the previous example of
creating an arbitrary order, you can use the Laconia built-in adapters like
this:

```js
const laconia = require("@laconia/core");
const adapterApi = require("@laconia/adapter-api");

// Your core application
const createOrder = async orderDetails => {
  // Creates order...
  throw new Error("Duplicate order Id");
};

const apigateway = adapterApi.apigateway({
  inputType: "body",
  errorMappings: {
    ".*": error => ({
      body: { error: { message: err.message } },
      statusCode: 500
    })
  }
});

exports.handler = laconia(apigateway(app)).register(instances);
```

### Additional headers

To add additional headers like CORS, you can specify `responseAdditionalHeaders`
configuration like this:

```js
const apigateway = adapterApi.apigateway({
  responseAdditionalHeaders: {
    "Access-Control-Allow-Origin": "*"
  }
});
```

### Error handling

The built-in adapter supports a simple mapping from error name thrown from your
application, to the response that it should return. The mapping is done by
specifying a regex, and the adapter will test the error thrown against each of
the regex in the mapping specified.

The following example returns statusCode 400 when ValidationError is returned.

```js
const apigateway = adapterApi.apigateway({
  errorMappings: {
    "Validation.*": error => ({ statusCode: 400 }),
    "Other.*": error => ({ statusCode: 404 })
  }
});
```

If the sequence of regex testing in your mapping is important, you can also
specify a `Map` instead of an `Object`.
