---
title: Softmax Tree Policy
---
A **softmax tree policy**, also called **Boltzmann exploration**, samples children probabilistically based on their estimated values.

The probability of selecting child $i$ is:

$$
P(i) = \frac{e^{\bar X_i / \tau}}{\sum_j e^{\bar X_j / \tau}}
$$

| Symbol | Meaning |
| ------ | ------- |
| $\bar X_i$ | Estimated value of child $i$. |
| $\tau$ | Temperature. |

## Temperature

| Temperature | Behavior |
| ----------- | -------- |
| High $\tau$ | More random. |
| Low $\tau$ | More greedy. |
| Near zero | Approaches argmax selection. |

## Strengths

- Smoother than [[Epsilon-Greedy Tree Policy]].
- Gives every child a probability instead of using a hard random-vs-best split.
- Useful when the search should remain stochastic.

## Weaknesses

Plain softmax does not directly account for visit-count uncertainty. A rarely visited child with a low current estimate may still be ignored too aggressively.

In [[Monte Carlo Tree Search|MCTS]], softmax is often a baseline or a component of a larger strategy rather than the strongest tree policy by itself.
