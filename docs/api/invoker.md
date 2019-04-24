---
id: invoker
title: invoker
sidebar_label: invoker
---

## `envVarInstances()`

Scans environment variables set in the current Lambda and automatically creates
instances of `invoker`.

Example:

```js
/**
 * Lambda Environment variables:
 * - LACONIA_INVOKER_CALL_CAPTURE_CARD_PAYMENT_LAMBDA: capture-card-payment-lambda-name
 */

const invoker = require("@laconia/invoker");
const laconia = require("@laconia/core");

const app = async (input, { captureCardPaymentLambda }) => {
  /* logic */
};

exports.handler = laconia(app).register(invoker.envVarInstances());
```

### Environment variable convention

Key: `LACONIA_INVOKER_[VARIABLE_NAME]`

Value: Full AWS Lambda name to be invoked

## `requestResponse(payload)`

Invokes other Lambda synchronously, with invocation type RequestResponse. Error
will be thrown if the invoked Lambda returns an error.

- `payload`
  - The payload used for the Lambda invocation. Payload will be automatically
    JSON stringified

Example:

```js
const app = async ({ fooInvoker }) => {
  await fooInvoker.requestResponse({ foo: "bar" });
};
```

## `fireAndForget(payload)`

Invokes other Lambda asynchronously, with invocation type Event.

- `payload`
  - The payload used for the Lambda invocation. Payload will be automatically
    JSON stringified

Example:

```js
const app = async ({ fooInvoker }) => {
  await fooInvoker.fireAndForget({ foo: "bar" });
};
```
