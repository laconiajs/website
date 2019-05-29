---
id: unit-testing
title: Unit Testing
sidebar_label: Unit Testing
---

As your dependencies are made available via plain Object properties from
LaconiaContext, you will be able to easily inject your dependencies without
involving Laconia.

Lambda handler code:

```js
const instances = ({ env }) => ({
  orderRepository: new DynamoDbOrderRepository(env.ORDER_TABLE_NAME)
});

exports.app = async (event, { orderRepository }) => {
  const order = event;
  await orderRepository.save(order);
};

exports.handler = laconia(exports.app).register(instances);
```

Unit test code:

```js
const app = require("../src/place-order").app; // Import app, not handler

beforeEach(() => {
  orderRepository = {
    save: jest.fn().mockReturnValue(Promise.resolve()) // Creates a mock orderRepository
  };
});

it("should store order to order table", async () => {
  await app(event, { orderRepository }); // Plain JS object is injected

  expect(lc.orderRepository.save).toBeCalledWith(
    expect.objectContaining(order)
  );
});
```
