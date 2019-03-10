---
id: getting-started
title: Getting Started with Laconia
sidebar_label: Getting Started
---

Laconia is an application framework for building Node.js AWS Lambda applications. Laconia shields you from the friction of AWS Lambda development by providing consistent architectural patterns and developer experience.

# Installation

Laconia is available as multiple packages on NPM:

```bash
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

`@laconia/core` package is the starting point to use Laconia. It provides
a simple Dependency Injection capability to your Lambda handler. At the very core, this example shows what Laconia does:

```js
// Objects creation, a function that returns an object
const instances = ({ env }) => ({
  orderRepository: new DynamoDbOrderRepository(env.ORDER_TABLE_NAME),
  idGenerator: new UuidIdGenerator()
});

// Handler function, which do not have any object instantiations
exports.app = async (event, { orderRepository, idGenerator }) => {
  // Dependencies made available via destructuring
  await orderRepository.save(order);
};

exports.handler = laconia(exports.app).register(instances);
```

The rest of the packages help you write application against your serverless ecosystem, such as how you should invoke other
Lambdas, how can you should retrieve secrets, how you should adapt AWS events to your application inputs, etc.

# Learn Laconia

To learn more about how you can use Laconia, check out the guides and API references section on this documentation site.

To understand more about the background and the philosophy Laconia has, follow through the rest of the introduction section.
