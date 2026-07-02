---
title: Screaming Architecture
source: https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html
source_title: Screaming Architecture
published: 2011-09-30
tags:
  - clean-code
  - clean-coder-blog
---
**Screaming Architecture** summarizes clean-code-style guidance from [Screaming Architecture](https://blog.cleancoder.com/uncle-bob/2011/09/30/Screaming-Architecture.html).

A codebase should reveal the business system it implements before it reveals the framework it uses.
Folder and module structure should make use cases and policies visible.

## Style Guidance

- Organize top-level code around the application domain, not only around technical layers.
- Keep frameworks as delivery details rather than the identity of the system.
- A reader should be able to infer what the system does from its primary package names.

## Related Concepts

- [[Clean Architecture]]
- [[Package by Feature]]
