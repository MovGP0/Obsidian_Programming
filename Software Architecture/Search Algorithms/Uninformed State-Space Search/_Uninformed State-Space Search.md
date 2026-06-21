---
title: Uninformed State-Space Search
---
**Uninformed state-space search** explores a state space without a domain-specific heuristic. The algorithms differ mainly in frontier order, memory usage, and optimality guarantees.

| Article | Core idea | Practical use |
| ------- | --------- | ------------- |
| [[Brute-force Route Enumeration]] | Enumerate every route and select the best. | Baseline for why pathfinding needs pruning and dynamic programming. |
| [[Breadth-First Search]] | Expand an unweighted graph one layer at a time. | Shortest path by number of actions. |
| [[Depth-First Search]] | Follow one path deeply before backtracking. | Low-memory traversal and exhaustive search. |
| [[Depth-Limited Search]] | Depth-first search with a maximum depth. | Avoids infinite descent in deep or cyclic spaces. |
| [[Iterative Deepening Search]] | Repeatedly run depth-limited search with increasing limits. | Breadth-first optimality with depth-first memory. |
| [[Uniform-Cost Search]] | Expand the cheapest frontier path. | Optimal search with non-negative path costs. |
| [[Bidirectional Search]] | Search from source and target at the same time. | Reduces explored area for point-to-point queries. |

## Related groups

- [[_Informed and Heuristic Search]]
- [[_Nondeterministic and Route-Planning Search]]
