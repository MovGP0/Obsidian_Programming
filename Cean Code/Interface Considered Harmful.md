---
title: Interface Considered Harmful
source: https://blog.cleancoder.com/uncle-bob/2015/01/08/InterfaceConsideredHarmful.html
source_title: Interface Considered Harmful
published: 2015-01-08
tags:
  - clean-code
  - clean-coder-blog
---
**Interface Considered Harmful** summarizes clean-code-style guidance from ['Interface' Considered Harmful](https://blog.cleancoder.com/uncle-bob/2015/01/08/InterfaceConsideredHarmful.html).

Interfaces are useful when they represent stable client needs, but harmful when added mechanically.
A clean abstraction is discovered from dependency direction and caller policy, not from a rule that
every class needs an interface.

## Style Guidance

- Create interfaces where they protect a higher-level policy from lower-level detail.
- Avoid one-to-one interface/class duplication when there is no independent abstraction.
- Let clients own the shape of the interface they need.

## Related Concepts

- [[Dependency Inversion Principle]]
- [[Ports and Adapters]]
