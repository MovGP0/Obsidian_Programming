---
title: Simulated Annealing
---
**Simulated annealing** is a local search algorithm that sometimes accepts worse moves.

This lets the search escape local optima early. Over time, the temperature decreases and the search becomes greedier.

## Acceptance rule

If a move improves the score, accept it. If it makes the score worse by $\Delta E$, accept it with probability:

$$
e^{-\Delta E / T}
$$

Here, $T$ is the temperature.

## Temperature schedule

| Temperature | Behavior |
| ----------- | -------- |
| High | More random exploration. |
| Low | More greedy exploitation. |

## Use when

- the search space has many local optima,
- exact optimality is less important than finding a good solution,
- neighbor generation is cheap.
