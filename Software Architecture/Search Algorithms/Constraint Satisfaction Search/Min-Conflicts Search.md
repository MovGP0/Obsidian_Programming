---
title: Min-Conflicts Search
---
**Min-conflicts search** is a local search algorithm for constraint satisfaction problems.

It starts with a complete assignment, possibly inconsistent, and repairs it.

## Algorithm

1. Start with a complete assignment.
2. Pick a variable involved in a conflict.
3. Change it to the value that minimizes the number of conflicts.
4. Repeat until there are no conflicts or a step limit is reached.

## Use when

- a complete assignment is easy to construct,
- the problem is large,
- small repairs often lead toward a solution.

Min-conflicts is famously effective for large n-queens instances.
