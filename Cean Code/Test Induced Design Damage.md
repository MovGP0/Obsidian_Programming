---
title: Test Induced Design Damage
source: https://blog.cleancoder.com/uncle-bob/2014/05/01/Design-Damage.html
source_title: Test Induced Design Damage?
published: 2014-05-01
tags:
  - clean-code
  - clean-coder-blog
---

**Test Induced Design Damage** summarizes clean-code-style guidance from [Test Induced Design Damage?](https://blog.cleancoder.com/uncle-bob/2014/05/01/Design-Damage.html).

Tests can reveal design pressure, but bad testing style can also distort production code. The goal
is not testability at any price; it is clean boundaries that make behavior easy to verify.

## Style Guidance

- Do not expose private implementation only to satisfy fragile tests.
- Improve design through stable abstractions when testing friction points to coupling.
- Distinguish design damage from design discovery.

## Related Concepts

- [[Testability]]
- [[Encapsulation]]
