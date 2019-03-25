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

# Installation

Laconia is available as multiple packages on NPM, just install what you need:

```
npm install --save @laconia/core
npm install --save @laconia/adapter
npm install --save @laconia/adapter-api
npm install --save @laconia/invoker
npm install --save @laconia/config
npm install --save @laconia/batch
npm install --save @laconia/test
npm install --save @laconia/middleware-lambda-warmer
npm install --save @laconia/middleware-serverless-plugin-warmup
```

# Basic example

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

# Learn Laconia

To learn more about Laconia, check out the rest of the introduction section.
