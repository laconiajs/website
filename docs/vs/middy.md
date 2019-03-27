---
id: middy
title: Laconia vs. Middy
sidebar_label: Middy
---

Middy is a middleware engine for AWS Lambda. Middy has a lot of similarity with
Laconia as it's trying to tackle a similar problem. Conceptually, Middy is more
loose in term of how you are creating your Lambda handler as everything are
middlewares. Laconia is introducing more structure to your Lambda handler with
its core concepts.

In Laconia, middleware is a concept that is recommended to be used on your
Handler i.e. before the adapter. Middlewares in Laconia should only deal with
Cloud provider specific concerns that are not covered by the Adapters (
`doNotWaitForEmptyEventLoop` is one good example). The middleware approach that
has been taken by Laconia is also different, the middlewares are just plain
higher order decorator functions.

Although Middy can be used together with Laconia in one Lambda (see
[examples](../introduction/examples)), please take a good care of the separation
of concerns Laconia introduces as specified above. There are only a handful of
Middy's built-in middlewares that fit into Laconia concept of middlewares. To
help you gain a better understanding of that, see the table below:

| Middy Built-in Middleware  | Laconia Recommendation                                               |
| -------------------------- | -------------------------------------------------------------------- |
| cache                      | Can use                                                              |
| cors                       | Use adapter-api: Set responseAdditionalHeaders                       |
| doNotWaitForEmptyEventLoop | Can use                                                              |
| httpContentNegotiation     | Use adapter-api: Not built-in yet                                    |
| httpErrorHandler           | Use adapter-api: Set errorMappings                                   |
| httpEventNormalizer        | Use adapter-api: Not needed as users don't deal with events directly |
| httpHeaderNormalizer       | Use adapter-api: Built-in                                            |
| httpPartialResponse        | Use adapter-api: Not built-in yet                                    |
| jsonBodyParser             | Use adapter-api: Built-in                                            |
| s3KeyNormalizer            | Use config: Built-in                                                 |
| secretsManager             | Use config: Not built-in yet                                         |
| ssm                        | Use config: Built-in                                                 |
| validator                  | Can use                                                              |
| urlEncodeBodyParser        | Use adapter-api: Built-in                                            |
| warmup                     | Can use (also Built-in via middleware-serverless-plugin-warmup)      |
