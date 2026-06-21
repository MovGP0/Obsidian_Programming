---
title: Recursive Best-First Search (RBFS)
---
**Recursive best-first search** (**RBFS**) is a memory-bounded best-first search.

It behaves like [[A-star Search]], but stores only the current recursion path and backed-up estimates for alternatives.

## Core idea

RBFS recursively follows the best child while remembering the best alternative $f$-cost. If the current path becomes worse than the best alternative, it backtracks.

## Properties

| Property | Behavior |
| -------- | -------- |
| Complete | Yes, under the usual finite-branching and positive-cost assumptions. |
| Optimal | Yes, with an admissible heuristic. |
| Memory | Linear in search depth. |
| Cost | Can regenerate nodes many times. |

## Use when

- A-star's memory use is too high,
- optimality still matters,
- recomputation is acceptable.

RBFS is conceptually important because it shows that best-first search can be adapted to tight memory limits.
