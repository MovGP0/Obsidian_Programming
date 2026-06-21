---
title: Decision Networks
---
**Decision networks**, also called **influence diagrams**, extend [[Bayesian Networks]] with actions and utilities.

They are used to choose actions under uncertainty.

## Node types

| Node type | Meaning |
| --------- | ------- |
| Chance node | Uncertain variable. |
| Decision node | Action chosen by the decision maker. |
| Utility node | Preference or payoff. |

## Core idea

1. Observe available evidence.
2. For each possible action, compute expected utility.
3. Choose the action with maximum expected utility.

$$
a^* = \arg\max_a EU(a)
$$

## Use when

- uncertainty and actions both matter,
- decisions depend on observed evidence,
- utilities are explicit,
- the model is small enough for decision-theoretic inference.

For sequential decisions, use [[Markov Decision Processes]] or [[Partially Observable Markov Decision Processes]].
