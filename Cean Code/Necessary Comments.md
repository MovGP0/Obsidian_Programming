---
title: Necessary Comments
source: https://blog.cleancoder.com/uncle-bob/2017/02/23/NecessaryComments.html
source_title: Necessary Comments
published: 2017-02-23
tags:
  - clean-code
  - clean-coder-blog
---
**Necessary Comments** summarizes clean-code-style guidance from [Necessary Comments](https://blog.cleancoder.com/uncle-bob/2017/02/23/NecessaryComments.html).

Comments are a fallback for cases where code, tests, and names cannot carry the necessary meaning by themselves. The clean-code pressure is still to make the code clearer first.

## Style Guidance

- Prefer expressive names, small functions, and readable structure before adding commentary.
- Use comments for intent, constraints, warnings, legal text, or explanations that cannot be encoded cleanly in the code.
- Avoid comments that restate implementation mechanics; they create another artifact that can drift from the code.

## Related Concepts

- [[Clean Code Comments]]
- [[Self Documenting Code]]
