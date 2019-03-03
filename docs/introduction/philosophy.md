---
id: philosophy
title: Philosophy
sidebar_label: Philosophy
---

When you learn about a framework, it’s important to know not only what it does but what principles it follows (from Spring)

- Separate cloud technologies and application domain

  - Laconia is doing this by adopting known architecture such as Hexagonal architecture or Clean Architecture
  - Encouraging consistent architectural patterns
  - Externalise ecosystem, just a transport
  - Example code for hexagonal architecture with the example given by Alistair Cockburn
  - Lightweight dependency injection, decouple runtime
  - Easy to test
  - Your app is your core, not the outer part

- Encourage industry's serverless design principles and learnings

  - AWS serverless design principles

    - Single purpose function, event based?
    - https://d1.awsstatic.com/whitepapers/architecture/AWS-Serverless-Applications-Lens.pdf

  - Philosophy - Small, no dependency, designed for AWS Lambda. See lambda-api

    - Small, no dependency. 48kb? laconia-core
    - Highly modular ? Here or top?

  - Should not need complex application structure or complex dependency injection framework

  - Convention over configuration

  - Yan Cui's Production Ready serverless

    - Secrets
    - Single purpose function
    - Plan to adopt more

  - Make well known pattern cheap to implement, like recursion

- Framework is a detail

  - From clean architecture

- Set high standards for code quality.

* API Program close to programming language, higher level abstraction

  - Check zeit
  - Cleanest API is when it's close to programming language
  - Example of CORS
  - No middleware as a framework
  - Middleware as decorator function.
  - Waiting for pipe
  - invoker stack trace
  - invoker good ux
