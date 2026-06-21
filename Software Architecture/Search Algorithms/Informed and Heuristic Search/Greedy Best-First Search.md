---
title: Greedy Best-First Search
---
**Greedy best-first search** expands the state that appears closest to the goal according to a heuristic.

The priority is:

$$
f(n) = h(n)
$$

It ignores the cost already paid to reach the state.

## Properties

| Property | Behavior |
| -------- | -------- |
| Complete | Not necessarily, unless repeated states and finite spaces are handled carefully. |
| Optimal | No. |
| Main strength | Can be fast when the heuristic points directly toward the goal. |
| Main weakness | Can chase misleading heuristics. |

## Relationship to A-star

[[A-star Search]] uses:

$$
f(n) = g(n) + h(n)
$$

Greedy best-first search uses only $h(n)$. It is often faster but less reliable.
