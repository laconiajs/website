---
id: philosophy
title: Philosophy
sidebar_label: Philosophy
---

When you are adopting a framework, it’s important to know not only what it does
but how it is designed. These are the principles that Laconia follows:

- Be a non-intrusive framework

  Your application code doesn't need to depend on the Laconia directly.
  Developers should be able to switch to other framework easily when needed
  without changing much of their application code.

  “Don’t marry the framework” - Robert C. Martin

  Laconia took the _Framework are details_ approach from Clean Architecture by
  Robert C. Martin. There are no Laconia objects to be derived for the framework
  to be used.

  Laconia at its heart, encourages the adoption of the Ports and Adapters
  pattern, or more sometimes known as the Hexagonal Architecture. Your
  application must be blissfully ignorant of the nature of its external device,
  and the cloud technologies should be treated as just another external device.

- Set serverless design principles and best practices the default

  The design principles and best practices for serverless architecture are
  maturing. Laconia strives to make them adopted by default.

  Let's run through the
  [official best practices from AWS](https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html):

  - Separate the Lambda handler (entry point) from your core logic: Laconia's
    core and primary adapters are designed for this
  - Use AWS Lambda Environment Variables to pass operational parameters to your
    function: Laconia encourages this via
    [Convention over Configuration](https://en.wikipedia.org/wiki/Convention_over_configuration).
    By convention you should configure environment variables to retrieve
    secrets, hit other Lambdas, retrieve configuration from S3, etc.
  - Minimize your deployment package size to its runtime necessities: Laconia is
    by design modular and has 0 external dependencies. Install only the packages
    you need.
  - Minimize the complexity of your dependencies: Simplicity sits at the core of
    Laconia. Laconia believes that with the paradigm of shift of small
    functions, there should not be a need for complex framework.
  - Take advantage of Execution Context reuse to improve the performance of your
    function: Laconia Context instances creation are cached by default. For
    example it will not hit SSM twice to retrieve secrets if your Lambda is
    still alive.

  There are other sources like the
  [AWS Serverless Application Lens](https://d1.awsstatic.com/whitepapers/architecture/AWS-Serverless-Applications-Lens.pdf),
  books, various talks, and loads of content from AWS Serverless Heroes e.g.
  [Production Ready Serverless](https://productionreadyserverless.com/). Laconia
  will evolve and continue to encourage these principles by default.

- Design for developers experience

  - API Program close to programming language, higher level abstraction
  - Check zeit
  - Cleanest API is when it's close to programming language
  - Example of CORS
  - No middleware as a framework
  - Middleware as decorator function.
  - invoker stack trace
  - invoker good ux

  Laconia has an ultra high test coverage to make sure that features documented
  will work, including testing in the cloud.
