---
id: claudia
title: Laconia vs. Claudia
sidebar_label: Claudia
---

Claudia as a framework consists of multiple components. Claudia's deployment
tool is theoretically compatible and can be used together with Laconia.
Claudia's deployment tool is designed to be totally separate from its runtime
dependencies, and Laconia is designed to be totally separate from its deployment
tooling.

Claudia's API Builder, on the other hand, is incompatible with Laconia. Although
both of them are trying to tackle a similar problem, fundamentally they follow a
contradicting principle. Claudia's API Builder is focused on the web and
encourage multiple HTTP endpoints on a single module. Laconia deals with not
only web, and encourage one HTTP endpoint per function. Naturally, in a
serverless architecture, you can use both of them together in separate
serverless functions if needed. Do however note that Laconia features will not
be able to be used in the Claudia Lambdas.
