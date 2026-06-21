---
title: Game Search
---
**Game search** chooses actions when outcomes depend on opponents, chance, sampling, or learned policies.

| Article | Core idea | Practical use |
| ------- | --------- | ------------- |
| [[Minimax Search]] | Choose moves assuming an optimal adversary. | Deterministic two-player zero-sum games. |
| [[Negamax Search]] | Express minimax using score symmetry. | Compact game-tree engines. |
| [[Alpha-Beta Pruning]] | Prune minimax branches that cannot affect the result. | Faster exact adversarial search. |
| [[Expectimax Search]] | Add chance nodes to game trees. | Games with dice, draws, or stochastic outcomes. |
| [[Monte Carlo Tree Search]] | Build a partial game tree from sampled simulations. | Large decision spaces with expensive full-width search. |
| [[_Tree Policies\|Tree Policies]] | Selection rules used while descending an MCTS tree. | Compare UCT, PUCT, progressive widening, and related policies. |
| [[Policy Networks]] | Estimate promising actions from a game or planning state. | Guides MCTS and reinforcement-learning agents in huge action spaces. |

## Related groups

- [[_Informed and Heuristic Search]]
- [[_Local Search and Optimization]]
