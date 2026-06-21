---
title: Nondeterministic and Route-Planning Search
---
This group covers search with nondeterministic outcomes and specialized route-planning preprocessing.

| Article | Core idea | Practical use |
| ------- | --------- | ------------- |
| [[AND-OR Graph Search]] | Search plans that handle nondeterministic outcomes. | Contingency planning. |
| [[Road-network Hierarchy]] | Prefer local roads near endpoints and high-level roads for long distance. | Encodes structure that plain graph search misses. |
| [[Nested Dissection]] | Recursively find separator nodes and rank them. | Builds graph orderings for fast routing preprocessing. |
| [[Contraction Hierarchies]] | Contract low-ranked nodes and add shortcut edges. | Very fast exact shortest-path queries after preprocessing. |
| [[Customizable Contraction Hierarchies]] | Separate topology preprocessing from weight customization. | Keeps routing fast when traffic weights change often. |

## Related groups

- [[_Uninformed State-Space Search]]
- [[_Informed and Heuristic Search]]
