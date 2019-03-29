---
id: getting-started
title: Getting Started with Laconia
sidebar_label: Getting Started
---

Laconia is an application framework for building Node.js serverless function
based applications. Laconia shields you from the friction of serverless
development by providing consistent architectural patterns and developer
experience.

_At this point of time, only AWS is supported. Strong feedback and community
support on this framework will help the support of other cloud providers._

## Installation

Laconia is available as multiple packages on NPM, install `@laconia/core` and
get the rest depending on your need:

```
npm install --save @laconia/core
npm install --save <module name>
```

These are the available modules:

- @laconia/core: Micro dependency injection framework
- @laconia/adapter: Converts AWS events into your application input
- @laconia/adapter-api: Converts API Gateway Proxy events into your application
  input
- @laconia/invoker: Invokes Lambdas like regular functions
- @laconia/config: Externalizes application secret and configuration
- @laconia/batch: Reads large number of records without time limit
- @laconia/middleware-lambda-warmer: Integrates Lambda with lambda-warmer
- @laconia/middleware-serverless-plugin-warmup: Short circuit Lambda run when
  it's called by serverless-plugin-warmup

## Basic example

`@laconia/core` package is the starting point to use Laconia. It provides a
simple Dependency Injection capability to your Lambda handler. At the very core,
this example shows what pattern Laconia encourages you to develop in:

```js
// Objects creation, a function that returns an object which contains your dependencies
const instances = ({ env }) => ({
  orderRepository: new DynamoDbOrderRepository(env.ORDER_TABLE_NAME),
  idGenerator: new UuidIdGenerator()
});

// Your application core, which is cloud agnostic
// Dependencies made available via destructuring
const app = async (input, { orderRepository, idGenerator }) => {
  await orderRepository.save(order);
};

// An adapter that converts event object into your application input
const adapter = app => (event, dependencies) => {
  return app(convertToInput(event), dependencies);
};

exports.handler = laconia(adapter(app)).register(instances);
```

The rest of the packages help you write an application against your serverless
ecosystem, such as how should you invoke other Lambdas, how should you retrieve
secrets, how should you adapt AWS events to your application inputs, etc.

## Running Laconia

Laconia runs on AWS Lambda with Node 8.10 runtime. It runs on plain JS, so there
is no need to transpile your code via babel.

Laconia is only focused on your application development, so you will need to
pick your own deployment tools. Laconia is compatible with tools like Serverless
Framework.

## Learn Laconia

To learn more about Laconia, check out the rest of the introduction section.
