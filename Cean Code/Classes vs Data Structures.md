---
title: Classes vs Data Structures
source: https://blog.cleancoder.com/uncle-bob/2019/06/16/ObjectsAndDataStructures.html
source_title: Classes vs. Data Structures
published: 2019-06-16
tags:
  - clean-code
  - clean-coder-blog
---

**Classes vs Data Structures** summarizes clean-code-style guidance from [Classes vs. Data Structures](https://blog.cleancoder.com/uncle-bob/2019/06/16/ObjectsAndDataStructures.html).

Objects hide data and expose behavior; data structures expose data and have behavior elsewhere.
Mixing both styles casually produces code that is hard to extend in either direction.

## Style Guidance

- Use objects when behavior should vary behind an abstraction.
- Use data structures when operations are naturally external and the shape is simple to expose.
- Avoid hybrid types that expose fields while also pretending to encapsulate behavior.

## Related Concepts

- [[Object Oriented Programming]]
- [[Data Transfer Object]]
