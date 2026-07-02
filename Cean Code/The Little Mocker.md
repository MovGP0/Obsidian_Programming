---
title: The Little Mocker
source: https://blog.cleancoder.com/uncle-bob/2014/05/14/TheLittleMocker.html
source_title: The Little Mocker
published: 2014-05-14
tags:
  - clean-code
  - clean-coder-blog
---

**The Little Mocker** summarizes clean-code-style guidance from [The Little Mocker](https://blog.cleancoder.com/uncle-bob/2014/05/14/TheLittleMocker.html).

Different test doubles serve different purposes. Clear vocabulary around dummies, stubs, spies,
mocks, and fakes helps tests express intent instead of tool mechanics.

## Style Guidance

- Choose the simplest test double that communicates the test's purpose.
- Use mocks when the important assertion is an interaction, not merely returned state.
- Keep test double setup readable enough that the tested behavior remains central.

## Related Concepts

- [[Test Double]]
- [[Unit Testing]]
