---
id: retrieving-secrets
title: Retrieving Secrets
sidebar_label: Retrieving Secrets
---

## Overview

Secrets can be retrieved in Laconia from SSM and Secrets Manager by using
the [`config`](api/config.md) package. You should define the paths to your
secrets as environment variables key prefixed with `LACONIA_CONFIG_{SECRET_NAME}`.
Laconia config will then inject the value of these secrets into your AWS Lambda
Function.

## Benefits

By using Laconia config to retrieve secrets you get three benefits:

* The amount of code required to retrieve secrets is reduced.
* Secrets can be migrated between services without the code changing.
* You can unit test the function without having to mock out the code fetching the secrets.


## Retrieving secrets from SSM

Laconia config [`api`](api/config.md) will attempt to retrieve a secret from
SSM for environment variables with a value prefixed with `ssm:`.

```js
/**
 * Lambda Environment variables:
 * - LACONIA_CONFIG_SOME_SECRET: ssm:[parameter name]
 */
const config = require("@laconia/config");
const laconia = require("@laconia/core");

// By convention, the name of the variable `someSecret` is derived by
// the environment variable name `LACONIA_CONFIG_SOME_SECRET`
const app = async (input, { someSecret }) => {
  console.log(someSecret); // Prints the SecretString that has been retrieved from SSM
};

exports.handler = laconia(app).register(config.envVarInstances());
```

## Retrieving secrets from Secrets Manager

Laconia config [`api`](api/config.md) will attempt to retrieve a secret from
Secrets Manager for environment variables with a value prefixed with `secretsManager:`.

Secrets that are in the JSON format will be automatically converted to Javascript Objects

```js
/**
 * Lambda Environment variables:
 * - LACONIA_CONFIG_SOME_SECRET: secretsManager:[secret id]
 */
const config = require("@laconia/config");
const laconia = require("@laconia/core");

// By convention, the name of the variable `someSecret` is derived by
// the environment variable name `LACONIA_CONFIG_SOME_SECRET`
const app = async (input, { someSecret }) => {
  console.log(someSecret); // Prints the SecretString that has been retrieved from SSM
};

exports.handler = laconia(app).register(config.envVarInstances());
```

## Injecting your secret to another object

Most of the times, you would be using a secret because you'd like to talk to
some external services. Instead of using the secret in your application, Laconia
encourages you to create a service that uses this secret. You can do this by
chaining your factories:

```js
/**
 * Lambda Environment variables:
 * - LACONIA_CONFIG_SOME_SECRET: ssm:/path/to/secret
 */
const config = require("@laconia/config");
const laconia = require("@laconia/core");

const instances = ({ someSecret }) => ({
  externalService: new MyService(someSecret)
});

const app = async (input, { externalService }) => {
  /* logic */
};

exports.handler = laconia(app)
  .register(config.envVarInstances())
  .register(instances);
```
