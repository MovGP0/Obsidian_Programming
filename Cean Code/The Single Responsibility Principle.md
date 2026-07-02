---
title: The Single Responsibility Principle
source: https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html
source_title: The Single Responsibility Principle
published: 2014-05-08
tags:
  - clean-code
  - clean-coder-blog
---

**The Single Responsibility Principle** summarizes clean-code-style guidance from [The Single Responsibility Principle](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html).

The Single Responsibility Principle is about isolating reasons to change. A module should be shaped
around one actor or source of requested change, not around a vague idea of doing only one small
thing.

## Style Guidance

- Group code by cohesive policy and reason for change.
- Split modules when different actors would request different changes to the same code.
- Do not use SRP as a blanket rule for tiny classes; the useful boundary is change pressure.

## Related Concepts

- [[SOLID]]
- [[Cohesion]]
