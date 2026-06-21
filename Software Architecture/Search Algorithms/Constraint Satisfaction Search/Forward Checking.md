---
title: Forward Checking
---
**Forward checking** is a constraint-propagation technique used with [[Backtracking Search]].

After assigning a variable, it removes values from neighboring unassigned variables that would violate constraints.

## Example

If `X = red` and `Y` must have a different color, forward checking removes `red` from `Y`'s domain.

If any unassigned variable loses all values, the search can backtrack immediately.

## Strengths

- Detects dead ends earlier than plain backtracking.
- Simple to implement.
- Works well with variable-ordering heuristics.

## Limitation

Forward checking only looks one step ahead. [[Arc Consistency]] can propagate implications further through the constraint graph.
