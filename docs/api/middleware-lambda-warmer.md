---
id: middleware-lambda-warmer
title: middleware-lambda-warmer
sidebar_label: middleware-lambda-warmer
---

## `lambdaWarmer(handler)`

Creates a new middleware that bypasses Lambda execution if it is a warm up event
from [lambda-warmer](https://github.com/jeremydaly/lambda-warmer) library.

```js
const lambdaWarmer = require("@laconia/middleware-lambda-warmer")();
const laconia = require("@laconia/core");

const app = (event, laconiaContext) => {};
const handler = laconia(app);

exports.handler = lambdaWarmer(handler);
```
