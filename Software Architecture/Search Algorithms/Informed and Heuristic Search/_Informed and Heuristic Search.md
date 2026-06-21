---
title: Informed and Heuristic Search
---
**Informed search** uses an evaluation function or heuristic to decide which frontier node to expand next.

| Article | Core idea | Practical use |
| ------- | --------- | ------------- |
| [[Priority Queue and Greedy Expansion]] | Use a heap to select the next best frontier item. | Makes best-first search practical. |
| [[Best-First Search]] | Expand the frontier node with the best evaluation score. | General framework behind greedy search, A-star, and related algorithms. |
| [[Greedy Best-First Search]] | Expand the state that appears closest to the goal. | Fast target-directed search when optimality is not required. |
| [[Dijkstra's Algorithm]] | Expand the currently cheapest known node. | Shortest paths with non-negative edge weights. |
| [[A-star Search]] | Combine known path cost with estimated remaining cost. | Optimal target-directed search with admissible heuristics. |
| [[Weighted A-star Search]] | Bias A-star toward the heuristic with a weight. | Faster satisficing search when optimality can be relaxed. |
| [[Iterative Deepening A-star Search]] | Run depth-first contours over increasing f-cost limits. | A-star-like optimality with lower memory. |
| [[Recursive Best-First Search]] | Best-first search using recursion and backed-up f-limits. | Memory-bounded heuristic search. |
| [[Simplified Memory-Bounded A-star Search]] | Keep the best frontier nodes that fit in memory. | A-star-style search under memory limits. |
| [[Local Beam Search]] | Keep several candidate states and expand them together. | Heuristic search over large spaces. |
| [[Online Search]] | Interleave acting, sensing, and learning. | Unknown environments where the agent cannot plan everything up front. |

## Related groups

- [[_Uninformed State-Space Search]]
- [[_Local Search and Optimization]]
