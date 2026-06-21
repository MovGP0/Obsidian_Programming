---
title: Belief Propagation
---
**Belief propagation** computes marginal beliefs by sending messages between variables and factors.

It is exact on tree-structured graphical models and approximate on graphs with loops.

## Core idea

Each node sends a message summarizing what it knows to its neighbors. After messages converge or a schedule completes, local beliefs can be computed from incoming messages.

## Variants

| Variant | Use |
| ------- | --- |
| Sum-product | Compute marginal probabilities. |
| Max-product | Compute most likely assignments. |
| Loopy belief propagation | Approximate inference on graphs with cycles. |

## Use when

- the model has tree or near-tree structure,
- many marginal probabilities are needed,
- local message passing fits the architecture.

For arbitrary dense graphs, [[Variable Elimination]] or sampling may be easier to reason about.
