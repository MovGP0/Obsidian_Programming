---
title: When to Mock
source: https://blog.cleancoder.com/uncle-bob/2014/05/10/WhenToMock.html
source_title: When to Mock
published: 2014-05-10
tags:
  - clean-code
  - clean-coder-blog
---

**When to Mock** summarizes clean-code-style guidance from [When to Mock](https://blog.cleancoder.com/uncle-bob/2014/05/10/WhenToMock.html).

Mocks are design tools for isolating behavior at boundaries, not a default replacement for real
collaborators. Over-mocking couples tests to implementation details.

## Style Guidance

- Mock across architectural boundaries or slow, nondeterministic, external dependencies.
- Avoid mocking every internal class; that tends to freeze implementation structure.
- Prefer tests that specify behavior through stable interfaces.

## Related Concepts

- [[Test Double]]
- [[Mock Object]]
