---
title: Clean Architecture
source: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
source_title: The Clean Architecture
published: 2012-08-13
tags:
  - clean-code
  - clean-coder-blog
---

**Clean Architecture** summarizes clean-code-style guidance from [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html).

Clean Architecture organizes systems so business rules are independent of frameworks, databases,
UIs, and external agencies. Dependencies should point inward toward policy.

## Style Guidance

- Keep enterprise and application rules independent from delivery mechanisms.
- Use boundaries so UI, database, and frameworks can change without rewriting core policy.
- Make source-code dependencies point from details toward stable abstractions and policies.

## Related Concepts

- [[Dependency Rule]]
- [[Ports and Adapters]]
- [[Hexagonal Architecture]]
