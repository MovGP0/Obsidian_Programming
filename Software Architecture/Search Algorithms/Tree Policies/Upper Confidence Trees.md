---
title: Upper Confidence Trees (UCT)
---
**Upper Confidence Trees** (**UCT**) is the classic tree policy for [[Monte Carlo Tree Search]]. It applies **Upper Confidence Bounds** (**UCB**) to tree nodes.

UCT balances two goals:

| Goal | Meaning |
| ---- | ------- |
| Exploitation | Prefer moves that already look good. |
| Exploration | Still try moves that have not been sampled much. |

The score for child $i$ is:

$$
\text{UCB}_i =
\bar X_i + C \sqrt{\frac{\ln N}{n_i}}
$$

| Symbol | Meaning |
| ------ | ------- |
| $\bar X_i$ | Average reward or value of child $i$ so far. |
| $n_i$ | Number of times child $i$ has been visited. |
| $N$ | Number of times the parent node has been visited. |
| $C$ | Exploration constant. |

MCTS selects the child with the highest score.

## Intuition

The average reward $\bar X_i$ is the exploitation term. It prefers children that have performed well.

The second term is the exploration bonus:

$$
C \sqrt{\frac{\ln N}{n_i}}
$$

It is large when a child has few visits and shrinks as $n_i$ increases.

## Example

Assume a parent node has been visited $N = 100$ times and use $C = 1.4$.

| Move | Visits $n_i$ | Average reward $\bar X_i$ |
| ---- | -----------: | ------------------------: |
| A | 50 | 0.60 |
| B | 10 | 0.55 |
| C | 2 | 0.40 |

Approximate UCB scores:

| Move | Exploitation | Exploration bonus | UCB score |
| ---- | -----------: | ----------------: | --------: |
| A | 0.60 | 0.42 | 1.02 |
| B | 0.55 | 0.95 | 1.50 |
| C | 0.40 | 2.12 | 2.52 |

Move C currently looks weak, but it has only been tried twice. UCT may select it because the value estimate is still uncertain. If C keeps performing badly, its average reward remains low and its exploration bonus decays.

## Caveat

UCB comes from the multi-armed bandit setting. Game trees violate some of its assumptions because rewards depend on later choices, opponent behavior, and rollout policy. UCT still works well as a baseline, but complex games often need [[Polynomial Upper Confidence Trees]], [[Progressive Widening]], [[Progressive Bias]], or stronger value evaluation.
