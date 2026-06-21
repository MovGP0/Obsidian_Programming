---
title: Backtracking Search
---
**Backtracking search** is the standard depth-first search algorithm for constraint satisfaction problems.

It incrementally assigns values to variables and backtracks when a constraint is violated.

## Algorithm

1. Choose an unassigned variable.
2. Try a value from its domain.
3. Check constraints against assigned variables.
4. Recurse if consistent.
5. Undo the assignment if it leads to failure.

## Common improvements

| Improvement | Purpose |
| ----------- | ------- |
| Minimum remaining values | Choose the most constrained variable. |
| Degree heuristic | Choose a variable involved in many constraints. |
| Least constraining value | Try values that leave more options open. |
| [[Forward Checking]] | Remove impossible future values early. |
| [[Arc Consistency]] | Propagate binary constraints more aggressively. |

## Use when

- variables have finite domains,
- constraints are explicit,
- a complete satisfying assignment is needed.
