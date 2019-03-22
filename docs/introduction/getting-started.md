---
id: getting-started
title: Getting Started with Laconia
sidebar_label: Getting Started
---

Laconia is an application framework for building Node.js AWS Lambda
applications. Laconia shields you from the friction of AWS Lambda development by
providing consistent architectural patterns and developer experience.

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
// Objects creation, a function that returns an object
const instances = ({ env }) => ({
  orderRepository: new DynamoDbOrderRepository(env.ORDER_TABLE_NAME),
  idGenerator: new UuidIdGenerator()
});

// Your application core, which do not have any object instantiations
const app = async (input, { orderRepository, idGenerator }) => {
  // Dependencies made available via destructuring
  await orderRepository.save(order);
};

// An adapter that converts event object into your application input
const adapter = app => (event, dependencies) => {
  return app(convertToInput(event), dependencies);
};

exports.handler = laconia(adapter(app)).register(instances);
```

The rest of the packages help you write application against your serverless
ecosystem, such as how you should invoke other Lambdas, how can you should
retrieve secrets, how you should adapt AWS events to your application inputs,
etc.

# Learn Laconia

To learn more about Laconia, check out the rest of the introduction section.
