---
title: Depth-First Search (DFS)
---
**Depth-first search** (**DFS**) explores one path as far as possible before backtracking.

It uses a stack, either explicitly or through recursion.

## Algorithm

1. Start at the initial state.
2. Choose one unvisited successor.
3. Continue recursively until a goal, dead end, or repeated state is reached.
4. Backtrack and try the next successor.

## Properties

| Property | Behavior |
| -------- | -------- |
| Complete | No, unless the state space is finite and repeated states are handled. |
| Optimal | No. |
| Time | Can be exponential in depth. |
| Memory | Linear in search depth for tree search. |

## Use when

- memory is tight,
- any solution is enough,
- the search space is finite or depth-limited,
- exhaustive traversal is needed.

For infinite or very deep spaces, prefer [[Depth-Limited Search]] or [[Iterative Deepening Search]].
