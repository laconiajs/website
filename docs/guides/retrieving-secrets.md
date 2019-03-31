---
id: retrieving-secrets
title: Retrieving Secrets
sidebar_label: Retrieving Secrets
---

## Overview

Laconia encourages you to define the path to your SSM secret string from AWS
Lambda environment variables. This is important as your application code must
not change regardless of where your secret is stored, for example if you are
migrating your secrets to AWS Secrets manager.

## Retrieving secrets from SSM

A secret can be retrieved in Laconia by using the `config` package:

```js
/**
 * LambdaEnvironment variables:
 * - LACONIA_CONFIG_SOME_SECRET: ssm://path/to/secret
 */
const config = require("@laconia/config");
const laconia = require("@laconia/core");

// By convention, the name of the variable is derived by the environment variable name
const app = async ({ someSecret }) => {
  /* logic */
};

exports.handler = laconia(app).register(config.envVarInstances());
```

## Injecting your secret to a dependency

Most of the times, you would be using a secret because you'd like to talk to
some external services. Instead of using the secret in your application, Laconia
encourages you to create a dependency that uses this secret:

```js
/**
 * LambdaEnvironment variables:
 * - LACONIA_CONFIG_SOME_SECRET: ssm:/path/to/secret
 */
const config = require("@laconia/config");
const laconia = require("@laconia/core");

const instances = ({ mySecret }) => ({
  externalService: new MyService(mySecret)
});

const app = async ({ externalService }) => {
  /* logic */
};

exports.handler = laconia(app)
  .register(config.envVarInstances())
  .register(instances);
```
