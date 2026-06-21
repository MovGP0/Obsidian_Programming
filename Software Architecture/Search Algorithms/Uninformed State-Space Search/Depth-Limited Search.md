---
title: Depth-Limited Search (DLS)
---
**Depth-limited search** (**DLS**) is [[Depth-First Search|depth-first search]] with a maximum depth.

It prevents DFS from descending forever in infinite or cyclic state spaces.

## Algorithm

1. Search depth-first from the initial state.
2. Stop expanding a node when the depth limit is reached.
3. Return success, failure, or cutoff.

The cutoff result matters because it distinguishes "no solution exists" from "a solution may exist deeper than the limit."

## Properties

| Property | Behavior |
| -------- | -------- |
| Complete | Only if the depth limit reaches a solution. |
| Optimal | No, unless all solutions are at the same depth and the first found is acceptable. |
| Memory | Linear in the depth limit. |

## Use when

- there is a known maximum useful depth,
- cycles or infinite branches are possible,
- [[Iterative Deepening Search]] is too expensive for the use case.
