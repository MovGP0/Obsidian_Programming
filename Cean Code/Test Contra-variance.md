---
title: Test Contra-variance
source: https://blog.cleancoder.com/uncle-bob/2017/10/03/TestContravariance.html
source_title: Test Contra-variance
published: 2017-10-03
tags:
  - clean-code
  - clean-coder-blog
---

**Test Contra-variance** summarizes clean-code-style guidance from [Test Contra-variance](https://blog.cleancoder.com/uncle-bob/2017/10/03/TestContravariance.html).

Tests should be coupled to behavior, not mirror the production code structure. When test structure
duplicates implementation structure, small refactors cause broad test churn.

## Style Guidance

- Design tests as a client of the code, not as a shadow copy of every class.
- Use stable APIs and behavior-oriented grouping to reduce fragile tests.
- Treat structural test churn as a signal of coupling.

## Related Concepts

- [[Fragile Tests]]
- [[Test Driven Development]]
