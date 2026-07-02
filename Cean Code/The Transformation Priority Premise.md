---
title: The Transformation Priority Premise
source: https://blog.cleancoder.com/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html
source_title: The Transformation Priority Premise
published: 2013-05-27
tags:
  - clean-code
  - clean-coder-blog
---

**The Transformation Priority Premise** summarizes clean-code-style guidance from [The Transformation Priority Premise](https://blog.cleancoder.com/uncle-bob/2013/05/27/TheTransformationPriorityPremise.html).

The Transformation Priority Premise describes a rough ordering of code transformations in TDD, from
simple to more general. The idea is to evolve behavior through small, controlled generalizations.

## Style Guidance

- Prefer the smallest transformation that makes the next test pass honestly.
- Let tests force generality gradually instead of jumping to speculative solutions.
- Use transformation awareness to keep TDD steps small and reversible.

## Related Concepts

- [[Test Driven Development]]
- [[Code Transformation]]
