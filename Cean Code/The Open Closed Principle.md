---
title: The Open Closed Principle
source: https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html
source_title: The Open Closed Principle
published: 2014-05-12
tags:
  - clean-code
  - clean-coder-blog
---

**The Open Closed Principle** summarizes clean-code-style guidance from [The Open Closed Principle](https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html).

The Open Closed Principle pushes volatile decisions behind stable interfaces so behavior can be
extended with less modification to existing, working code.

## Style Guidance

- Identify likely variation points from current requirements, not speculative architecture.
- Use abstractions to protect stable policy from volatile detail.
- Prefer extension mechanisms that reduce churn in tested code.

## Related Concepts

- [[SOLID]]
- [[Dependency Inversion Principle]]
