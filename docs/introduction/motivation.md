---
id: motivation
title: Motivation
sidebar_label: Motivation
---

Many experienced developers are ditching their design principles in a serverless
architecture, with the arguments that these are 'just functions'. Architecture
is a victim in the serverless world. One of the reason this happening is the
difficulty of implementing a design pattern, for example Dependency Injection.

As the serverless architecture is increasingly adopted by the industry, more
complicated use cases are emerging. To support these use cases, more best
practices and patterns around serverless application development are maturing.
Keeping up to date and implementing these patterns are expensive. We developers
are often encouraged to read a combination of articles and figure out how can
they adopt what they have read, and they may still get it wrong. There are also
pitfalls on AWS low-level APIs that may cause bugs and unpredictable behaviour.

Serverless architecture is a paradigm shift. Whilst the deployment tools in the
serverless space is maturing, there are no application development frameworks
are designed effectively for serverless architecture. There are plenty of great
web frameworks that you can use, but when your application is growing, you will
soon discover that the web is just one of the event trigger in AWS Lambda. AWS
Lambda is event-driven, hence it should be treated as such. There should be a
more consistent way to tackle this problem.

I believe that these are the problems that a framework should solve, hence why
Laconia is born.
