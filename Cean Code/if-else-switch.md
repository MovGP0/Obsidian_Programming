---
title: if-else-switch
source: https://blog.cleancoder.com/uncle-bob/2021/03/06/ifElseSwitch.html
source_title: if-else-switch
published: 2021-03-06
tags:
  - clean-code
  - clean-coder-blog
---

**if-else-switch** summarizes clean-code-style guidance from [if-else-switch](https://blog.cleancoder.com/uncle-bob/2021/03/06/ifElseSwitch.html).

Conditionals are not automatically bad, but repeated conditional dispatch over the same choices is a
design smell. Polymorphism or table-driven dispatch can isolate variation and reduce repeated edits.

## Style Guidance

- Keep simple local conditionals when they are clearer than abstraction.
- Refactor repeated type or mode switches when each new case forces scattered edits.
- Make the variation explicit through polymorphism, strategy objects, maps, or other dispatch mechanisms that fit the language.

## Related Concepts

- [[Polymorphism]]
- [[Strategy Pattern]]
