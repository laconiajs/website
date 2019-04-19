---
id: retrieving-config
title: Retrieving Config
sidebar_label: Retrieving Config
---

## Overview

Your application would often have a dynamic behaviour that you would like to
externally. This can be a config you store in S3, or in a simple case, stored as
an environment variable.

## Retrieving configuration from S3

Retrieving a JSON configuration is can be done easily in Laconia with the
[`event`](api/event.md) package. You don't have to worry about hitting the S3
bucket and JSON parsing it:

```js
/**
 * LambdaEnvironment variables:
 * - LACONIA_CONFIG_MY_CONFIG: s3:mybucket/dir/config.json
 */
const config = require("@laconia/config");
const laconia = require("@laconia/core");

const app = async (input, { myConfig }) => {
  /* logic */
};

exports.handler = laconia(app).register(config.envVarInstances());
```

## Retrieving boolean from environment variable

Sometimes developers forget that the value they're retrieving from an
environment variable is actually a string, leading to wrong equality check.
Laconia provides a simple conversion to make sure that the type injected is of
boolean type.

```js
/**
 * LambdaEnvironment variables:
 * - LACONIA_CONFIG_MY_FEATURE_TOGGLE: false
 */
const config = require("@laconia/config");
const laconia = require("@laconia/core");

// false will be injected
const app = async (input, { myFeatureToggle }) => {
  /* logic */
};

exports.handler = laconia(app).register(config.envVarInstances());
```
