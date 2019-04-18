---
id: adapter-api
title: adapter-api
sidebar_label: adapter-api
---

adapter-api is using the [event](api/event.md) package under the hood, so deeper
details of how the adapter-api works is documented there.

## `apigateway(options)(app)`

Creates a new Adapter for API Gateway.

- `options`:
  - `inputType = "body"`
    - Supported values are: `body`, `params`
    - Determines what should the application receive as an input
  - `includeInputHeaders = false`
    - Set to true to receive `inputHeaders` parameter in your application
  - `responseStatusCode = 200`
    - The status code that the Lambda should return in successful execution
  - `responseAdditionalHeaders`
    - Set additional headers here, such as CORS headers that you need your
      Lambda to return
  - `errorMappings`
    - Supports a `Map` or `Object`. Use Map if sequence of mapping is crucial.
    - The error map that the adapter should use when the application throws an
      error
    - Response code will be 500 when no mapping is matched

Example:

```js
const adapter = apigateway({
  inputType: "params",
  includeInputHeaders: true
});
exports.handler = laconia(adapter(app));

// Error mapping
// - Response Content-Type will be set to applicaiton/json
// - Body will be JSON stringified
// - Status code will be 400
// - Additional response headers will be returned
apigateway({
  errorMappings: {
    "Validation.*": error => ({
      body: { foo: error.message },
      headers: { "Access-Control-Max-Age": 123 },
      statusCode: 400
    })
  }
});

// Error mapping with Map
apigateway({
  errorMappings: new Map([
    ["Validation.*", () => ({ statusCode: 400 })],
    [".*Error", () => ({ statusCode: 500 })]
  ])
});

// Additional headers - CORS
apigateway({
  responseAdditionalHeaders: {
    "Access-Control-Allow-Origin": "foo"
  }
});
```

### Supported input types

- `body`

  Converts the event body into your application input. Under the hood,
  `adapter-api` will essentially be passing the
  [`ApiGatewayEvent.body`](api/event.md) to your application. Visit its
  documentation to understand what you will receive in your application.

- `params`

  Converts the query parameters and path parameters into your application input.
  Under the hood, `adapter-api` will essentially be passing the
  [`ApiGatewayEvent.params`](api/event.md) to your application. Visit its
  documentation to understand what you will receive in your application.
