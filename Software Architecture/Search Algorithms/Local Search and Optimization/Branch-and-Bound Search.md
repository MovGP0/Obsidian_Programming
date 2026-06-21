---
title: Branch-and-Bound Search
---
**Branch-and-bound search** is an exact search method for optimization problems.

It explores partial solutions, but prunes any branch whose best possible completion cannot beat the best complete solution found so far.

## Core terms

| Term | Meaning |
| ---- | ------- |
| Incumbent | Best complete solution found so far. |
| Bound | Optimistic estimate of the best solution reachable from a partial solution. |
| Branch | Split the problem into subproblems. |
| Prune | Discard a subproblem whose bound is not competitive. |

## Algorithm

1. Start with an initial partial solution.
2. Compute a bound.
3. If the bound cannot beat the incumbent, prune it.
4. Otherwise branch into smaller subproblems.
5. Update the incumbent when a better complete solution is found.

## Use when

- the goal is an optimal solution,
- useful lower or upper bounds are available,
- brute-force enumeration is too large,
- pruning can remove large parts of the search space.

Branch-and-bound is common in combinatorial optimization, scheduling, routing, and integer programming.
