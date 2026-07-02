---
title: First-Class Tests
source: https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html
source_title: First-Class Tests.
published: 2017-05-05
tags:
  - clean-code
  - clean-coder-blog
---

**First-Class Tests** summarizes clean-code-style guidance from [First-Class Tests.](https://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html).

Tests deserve the same design care as production code. They should be clear, decoupled where
possible, fast at the unit level, and explicit about which kind of confidence they provide.

## Style Guidance

- Separate unit, acceptance, integration, and system tests by purpose.
- Avoid slow end-to-end suites masquerading as unit tests.
- Maintain test code so it remains a reliable design asset rather than a drag on change.

## Related Concepts

- [[Test Pyramid]]
- [[Unit Testing]]
