---
id: injecting-dependencies
title: Injecting Dependencies
sidebar_label: Injecting Dependencies
---

## Overview

An AWS Lambda handler function is a single entry point for both injecting
dependencies and function execution. In non-serverless development, you can and
will normally only focus on the latter. This brings a unique challenge to AWS
Lambda development as it is very difficult to test a handler function when it is
responsible for doing both the object creations and the application run.
@laconia/core is a simple dependency injection framework for your Lambda code,
hence solving this problem for you.

Laconia explicitly splits the responsibility of the object creations and Lambda
function execution. Laconia also provides a simple way for you to execute your
Lambda function so that your unit tests will not execute the code that
instantiates your Lambda dependencies.

## Basic injection

To inject dependencies, simply create a new Laconia handler and pass a factory
to `register` :

```js
const instances = () => ({ idGenerator: new UuidIdGenerator() });
// idGenerator is injected
const app = async (event, { idGenerator }) => {};
exports.handler = laconia(app).register(instances);
```

With the code above, the instance with name `idGenerator` will be injected to
your application.

## Chaining injection

It is possible to chain your injection in Laconia by calling `register` multiple
times. Each of the factory that you register will be called sequentially, and
the next factories will be able to access the instances created by the previous
factories.

```js
const factory1 = () => ({ idGenerator: new UuidIdGenerator() });
// idGenerator is injected to factory2
const factory2 = ({ idGenerator }) => ({ myService: new Service(idGenerator) });
const app = async (event, { idGenerator, myService }) => {};

exports.handler = laconia(app)
  .register(factory1)
  .register(factory2);
```

## Parallel injection

When you have multiple factories that have slow operations, you can pass in an
array to `register`. Do note that you will not be able to chain the injection as
the factories are running concurrently.

```js
const factory1 = () => ({ heavy: new HeavyInstanceCreation() });
const factory2 = () => ({ longWait: new LongNetworkWaitCreation() });
const app = async (event, { heavy, longWait }) => {};

exports.handler = laconia(app).register([factory1, factory2]);
```

## Turning caching off

Factories registered to Laconia are cached by default. This means, the factories
will not be called twice if the Lambda instance is being reused. Due to various
reason, you might want to turn this off. This can be turned off by passing an
option to `register`.

```js
// This function will be called everytime the Lambda is called
const instances = () => ({ idGenerator: new UuidIdGenerator() });
const app = async (event, { idGenerator }) => {};
exports.handler = laconia(app).register(instances, {
  cache: {
    enabled: false
  }
});
```

## Getting AWS original parameters

As Laconia is changing your handler signature from `event, context, callback` to
`event, LaconiaContext`, you might wonder on how you can retrieve the original
AWS context or event. Laconia would recommend not using `context` or `event` in
your application core as this is AWS specific. These variables are however still
available to be accessed if you need it via LaconiaContext with key `context`
and `event`.

```js
laconia((event, { context }) => {}); // AWS context
```
