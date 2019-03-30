---
id: core
title: core
sidebar_label: core
---

## `laconia(app(event, laconiaContext))`

Creates a new Laconia handler that can be called by AWS Lambda.

- `app(event, laconiaContext)`
  - This `Function` is called when your Lambda is invoked
  - Will be called with `laconiaContext` object, which can be destructured to
    retrieve your dependencies

Example:

```js
// Simple return value
laconia(() => "value");

// Return a promise and 'value' will be returned to the Lambda caller
laconia(() => Promise.resolve("value"));

// Destructure laconiaContext
laconia((event, { dependency }) => dependency(event));
```

## `register(factory(laconiaContext), options)`

Registers objects created by the factory function into LaconiaContext. Objects
registered here will be made available in the Lambda function execution. You can
pass an array for the list of array to be called in parallel.

- `factory(laconiaContext)`
  - This `Function` is called when your Lambda is invoked
  - When an `Array` is specified, the list of factories within the array will be
    called concurrently with Promise.all
  - An object which contains the instances to be registered must be returned
- `options`:
  - `cache`
    - `enabled = true`
      - Set to false to turn off caching
    - `maxAge = 300000`
      - Your factory will be called when the cache has reached its maximum age
        specified by this option

Example:

```js
// Register an object with key 'service'
laconia((event, { service }) => service.call()).register(() => ({
  service: new SomeService()
}));

// Register concurrent factories
const app = () => {};
laconia(app).register([
  ssmConfig.envVarInstances(),
  s3Config.envVarInstances()
]);

// Using laconiaContext in factory
const app = () => {};
laconia(app)
  .register(() => ({ secret: sharedLibToGetSecret() }))
  .register(({ secret }) => ({ service: new SomeClient(secret) }));

// Reduce cache maxAge
const app = () => {};
laconia(app).register(
  async () => ({
    /* heavy operations */
  }),
  {
    cache: {
      maxAge: 1000
    }
  }
);
```

## `postProcessor(postProcessorFn(instances))`

Upon Lambda runtime execution, every postProcessorFn will be called on every
factory functions individually.

- `postProcessorFn(instances)`
  - This `Function` is called when your Lambda is invoked

Example:

```js
// Print object registered
laconia((event, { service }) => service.call())
  .register(() => ({
    service: new SomeService()
  }))
  .postProcessor(instances => console.log(instances));

// Enable xray
const xray = require("@laconia/xray");

laconia((event, { service }) => service.call())
  .register(() => ({
    service: new SomeService()
  }))
  .postProcessor(xray.postProcessor());
```
