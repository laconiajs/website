---
id: creating-middleware
title: Creating Middleware
sidebar_label: Creating Middleware
---

## Overview

As per [Laconia's philosophy](introduction/philosophy.md), Laconia doesn't
support middleware as a framework and have its middleware concept a simple
decorator function instead, hence it is not actually dependent on Laconia at
all. Laconia recommends the use of middleware on your Handler i.e. before the
adapter. Middlewares in Laconia should only deal with Cloud provider specific
concerns that are not part of your adapter's responsibility.

## Creating a middleware

Let's go and try to create a simple middleware for a handler. In the example
below, all the requests coming in to your Lambda will be logged.

```js
const laconia = require("@laconia/core");

// Define a new middleware
const myMiddleware = next => (event, context, callback) => {
  console.log("Logging all events in my middleware", event);
  return next(event, context, callback);
};

const app = (event, laconiaContext) => {};
const handler = laconia(app);

exports.handler = myMiddleware(handler); // Wrap your handler with a middleware
```
