---
id: middleware-serverless-plugin-warmup
title: middleware-serverless-plugin-warmup
sidebar_label: middleware-serverless-plugin-warmup
---

## `warmup(handler)`

Creates a new middleware that bypasses Lambda execution if it is a warm up event
from
[serverless-plugin-warmup](https://github.com/FidelLimited/serverless-plugin-warmup)
library.

```js
const warmup = require("@laconia/middleware-serverless-plugin-warmup")();
const laconia = require("@laconia/core");

const app = (event, laconiaContext) => {};
const handler = laconia(app);

exports.handler = warmup(handler);
```
