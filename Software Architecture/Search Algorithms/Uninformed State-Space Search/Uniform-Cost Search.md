---
title: Uniform-Cost Search (UCS)
---
**Uniform-cost search** (**UCS**) expands the frontier path with the lowest total path cost.

It is the general state-space version of [[Dijkstra's Algorithm]].

## Algorithm

1. Put the initial state in a priority queue with cost `0`.
2. Repeatedly pop the state with the lowest path cost.
3. If it is a goal, return the path.
4. Expand successors and enqueue them with accumulated path cost.
5. Ignore stale or more expensive paths to states already reached cheaper.

## Properties

| Property | Behavior |
| -------- | -------- |
| Complete | Yes, if step costs are positive and not arbitrarily close to zero. |
| Optimal | Yes, for non-negative path costs. |
| Expansion order | Cheapest path first. |

## Use when

- actions have different costs,
- optimality matters,
- no useful heuristic is available.
