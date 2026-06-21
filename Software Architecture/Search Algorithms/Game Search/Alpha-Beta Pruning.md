---
title: Alpha-Beta Pruning
---
**Alpha-beta pruning** speeds up [[Minimax Search]] by ignoring branches that cannot affect the final decision.

It tracks two bounds:

| Bound | Meaning |
| ----- | ------- |
| $\alpha$ | Best score MAX can force so far. |
| $\beta$ | Best score MIN can force so far. |

When $\alpha \geq \beta$, the remaining children can be pruned.

## Why it works

If a player already has a better option elsewhere, there is no need to fully evaluate a branch that the opponent can force to be worse.

## Move ordering

Alpha-beta pruning is most effective when strong moves are searched first.

With perfect move ordering, alpha-beta can roughly double the reachable search depth compared with plain minimax for the same number of evaluated leaves.

## Use when

- minimax is applicable,
- exact adversarial search is desired,
- a depth limit and evaluation function are available.
