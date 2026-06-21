---
title: Thompson Sampling Tree Policy
---
**Thompson sampling** is a tree policy based on sampling from uncertainty estimates. Instead of adding an explicit confidence bonus, it models each child's value as a distribution.

For binary win/loss rewards, one common model is a Beta distribution:

$$
\theta_i \sim \operatorname{Beta}(\alpha_i, \beta_i)
$$

The policy samples one $\theta_i$ for each child and chooses the child with the highest sample.

## Intuition

A child with little data has a wider posterior distribution, so it has more chances to produce a high optimistic sample. A child with many observations has a tighter distribution, so selection becomes more stable.

## Strengths

- Handles uncertainty naturally.
- Often strong in bandit problems.
- Can be less brittle than manually tuning an exploration bonus.

## Weaknesses

- Requires a useful statistical model for rewards.
- Can be more complex than [[Upper Confidence Trees]].
- Is less common in classical [[Monte Carlo Tree Search|MCTS]] implementations than UCT or [[Polynomial Upper Confidence Trees]].
