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
 * Lambda Environment variables:
 * - LACONIA_CONFIG_MY_CONFIG: s3:mybucket/dir/config.json
 */
const config = require("@laconia/config");
const laconia = require("@laconia/core");

// By convention, the name of the variable `myConfig` is derived by
// the environment variable name `LACONIA_CONFIG_MY_CONFIG`
const app = async (input, { myConfig }) => {
  console.log(myConfig); // Parsed JSON from S3 printed to the console
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
 * Lambda Environment variables:
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
