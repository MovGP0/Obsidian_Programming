---
title: Expectimax Search
---
**Expectimax search** extends game-tree search with chance nodes.

It is used when outcomes are stochastic, such as dice rolls, random card draws, or probabilistic events.

## Node types

| Node type | Backup rule |
| --------- | ----------- |
| MAX | Take the maximum child value. |
| MIN | Take the minimum child value, if there is an adversary. |
| CHANCE | Take the probability-weighted average. |

For a chance node:

$$
V(s) = \sum_i P(s_i \mid s) V(s_i)
$$

## Use when

- the environment has random outcomes,
- probabilities are known or estimated,
- decisions should maximize expected utility.

For adversarial stochastic games, expectimax becomes **expectiminimax** by including both opponent choice and chance nodes.
