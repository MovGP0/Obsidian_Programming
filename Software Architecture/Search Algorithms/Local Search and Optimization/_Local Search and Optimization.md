---
title: Local Search and Optimization
---
**Local search** works with one or more complete candidate states and tries to improve them. It does not normally preserve a full path from the initial state.

| Article | Core idea | Practical use |
| ------- | --------- | ------------- |
| [[Hill-Climbing Search]] | Repeatedly move to a better neighboring state. | Fast local optimization. |
| [[Simulated Annealing]] | Sometimes accept worse moves to escape local optima. | Optimization with rugged landscapes. |
| [[Branch-and-Bound Search]] | Prune partial solutions whose lower bound cannot beat the incumbent. | Exact combinatorial optimization. |
| [[Genetic Algorithms]] | Evolve populations with selection, crossover, and mutation. | Large combinatorial optimization spaces. |

## Related groups

- [[_Informed and Heuristic Search]]
- [[_Constraint Satisfaction Search]]
