---
title: Make the Magic go away
source: https://blog.cleancoder.com/uncle-bob/2015/08/06/LetTheMagicDie.html
source_title: Make the Magic go away.
published: 2015-08-06
tags:
  - clean-code
  - clean-coder-blog
---
**Make the Magic go away** summarizes clean-code-style guidance from [Make the Magic go away.](https://blog.cleancoder.com/uncle-bob/2015/08/06/LetTheMagicDie.html).

Magic abstractions that hide important control flow or dependencies make systems harder to reason
about. Clean design favors explicit boundaries and understandable mechanisms.

## Style Guidance

- Prefer code paths a maintainer can trace without private framework knowledge.
- Use conventions and frameworks where they reduce real noise, but expose important decisions explicitly.
- Be suspicious when a tool makes code look small by moving essential behavior out of sight.

## Related Concepts

- [[Explicit Dependencies]]
- [[Framework Coupling]]
