---
id: core-concepts
title: Core Concepts
sidebar_label: 🚧Core Concepts
---

_**🚧Under construction, come back later 🚧**_

Imagine writing your **Application** with just a plain function that accepts an
input, and return an output once it's done operating. The plain function also
accepts dependencies for it to operate. It will look like this:

```js
const app = (input, { dependency1, dependency2 }) => {
  return output;
};
```

This is good as your application will have no dependency to any cloud
technologies, so that you can focus on just building your business logic and it
will also be able to be easily tested without any external device. The
application must not be aware of the event source.

The contract though, is conceptually different from what AWS Lambda expects, as
it is expecting the handler to look like this:

```js
const handler = (event, context, callback) => {
  // Call your app here
};
```

As you will have to call your application code from handler, naturally you will
have to write some code to convert the `event` to `input`, and `output` to
`response`. This is where a `Primary Adapter` should step in (In Laconia
concept, this is just called an `Adapter`) So, the handler theoretically will
look like this:

```js
const adapter = app => (event, context, callback) => {
  const dependencies = { dependency1: createDep1(), dependency2: createDep2() };
  return convertToOutput(app(convertToInput(event), dependencies));
};

const handler = adapter(app);
```

This is good, as we now have our adapter code. The problem now is the adapter is
aware of the dependencies. It should not be its responsibility. Simple IoC
container should be here.

`Laconia Handler` steps in.

![core-concepts](assets/core-concepts.drawio.svg)

<!--
- Diagram of (middleware -> handler) -> adapter -> app with function signature
- Diagram of concept. Event to input, output to response, etc.
- Just like any program main(), but focusing on app
- Take from @laconia/core
- Add hexagonal architecture diagram
-->
