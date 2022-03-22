---
id: core-concepts
title: Core Concepts
sidebar_label: Core Concepts
---

Imagine writing your **Application** with just a plain function that accepts
input, and return an output once it's done operating. The plain function also
accepts dependencies for it to operate. It will look like this:

```js
const app = (input, { dependency1, dependency2 }) => output;
```

This is good as your application will have no dependency on any cloud
technologies, and you can focus on just building what really matters. Your
application will also be able to be easily tested without any external device.

The contract of the application though is conceptually different from what AWS
Lambda expects, as it is expecting the handler to look like this:

```js
const handler = (event, context, callback) => {};
```

As you will have to call your application code from the handler, naturally you
will have to write some code to convert the `event` to `input`, and `output` to
`response`. This is where a **Primary Adapter** should step in (In Laconia, this
is just called an **Adapter**). So, the adapter should theoretically look like
this:

```javascript
const adapter = app => (event, context, callback) => {
  const dependencies = { dependency1: createDep1(), dependency2: createDep2() };
  return convertToResponse(app(convertToInput(event), dependencies));
};

const handler = adapter(app);
```

Our application will now be called successfully by our handler. The problem now
is the adapter is responsible for creating `dependencies`. This should not be
the adapter's job. We can extract this logic out into a simple function. Let's
call it a **Handler**:

```js
const createDependencies = () => ({
  dependency1: createDep1(),
  dependency2: createDep2()
});

const app = (input, { dependency1, dependency2 }) => output;

const adapter = app => (event, dependencies) =>
  convertToResponse(app(convertToInput(event), dependencies));

const handler = adapter => (event, context, callback) =>
  adapter(event, createDependencies());

exports.handler = handler(adapter(app));
```

You now have different functions, each of them with a clear responsibility. It
is also nice to see that all of them are wired up at the top level so that you
can explicitly see the flow of requests instantly. This is the whole idea of
Laconia. Most of the code that you'll be writing is just plain JavaScript and
Laconia will help you adopt this pattern effortlessly. Note that we have not
used Laconia API at all above!

Lastly, as the heart of Laconia is the Hexagonal Architecture, it is useful to
visualise where each of the Laconia components plays:

![core-concepts](assets/core-concepts.drawio.svg)

There a couple of things to notice in the diagram:

1. **Laconia Handler** is the Laconia's implementation of the **Handler** that
   we have written above. It does a little bit more than that of course.
2. Laconia encourages you to design your application's ports first. This means
   that it's quite likely that you will need to create your own **Primary Adapters**
   and **Secondary Adapters**. Laconia also provides some built-in adapters that
   you can use if it matches your ports.
