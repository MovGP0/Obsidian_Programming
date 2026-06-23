---
title: Constraint Satisfaction Search
---
**Constraint satisfaction search** assigns values to variables while satisfying constraints between them.

| Article | Core idea | Practical use |
| ------- | --------- | ------------- |
| [[Backtracking Search]] | Assign variables recursively and undo inconsistent choices. | Baseline constraint-satisfaction search. |
| [[Forward Checking]] | Remove impossible values after each assignment. | Detects dead ends earlier than plain backtracking. |
| [[Arc Consistency]] | Enforce binary constraint consistency between variables. | Constraint propagation before or during search. |
| [[Min-Conflicts Search]] | Repair complete assignments by reducing conflicts. | Large CSPs such as n-queens. |
| [[Wave Function Collapse]] | Collapse finite-domain candidates while propagating local constraints. | Procedural generation, Sudoku-style solving, and fleet-consistent Battleship heat maps. |

## Related groups

- [[_Local Search and Optimization]]
- [[_Uninformed State-Space Search]]
