---
id: invoking-other-lambdas
title: Invoking Other Lambdas
sidebar_label: Invoking Other Lambdas
---

## Overview

Invoking other Lambdas is a common pattern in serverless architecture. Laconia
makes this easy by:

- Automatically stringifying JSON request payload and parsing JSON response
  payload
- Throwing an error when FunctionError is returned instead of failing silently
- Augmenting stacktrace in the FunctionError thrown based on the stacktrace
  returned by Lambda invocation
- Set the FunctionError object's name and message thrown based on the error
  returned by Lambda invocation
- Throwing an error when statusCode returned is not expected

## Guide

Lambda invocation is Laconia is handled by an instance of `invoker`. Create an
invoker and invoke your Lambda through it like so:

```js
/**
 * LambdaEnvironment variables:
 * - LACONIA_INVOKER_CALL_CAPTURE_CARD_PAYMENT_LAMBDA: capture-card-payment-lambda-name
 */

const invoker = require("@laconia/invoker");
const laconia = require("@laconia/core");

const app = async (input, { captureCardPaymentLambda }) => {
  const parameter = { transactionId: 1 };
  // Waits for capture-card-payment-lambda-name
  const response = await captureCardPaymentLambda.requestResponse(parameter);
  console.log(response);
};

exports.handler = laconia(app).register(invoker.envVarInstances());
```

The invoker also supports `Event` invocation type (asynchronous Lambda
execution), which can be called replacing `requestResponse` with
`fireAndForget`.
