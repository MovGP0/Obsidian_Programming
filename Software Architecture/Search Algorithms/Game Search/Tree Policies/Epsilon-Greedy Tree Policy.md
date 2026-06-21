---
title: Epsilon-Greedy Tree Policy
---
An **epsilon-greedy tree policy** usually selects the best-known child, but occasionally explores a random child.

With probability $1 - \varepsilon$, choose the child with the highest average value. With probability $\varepsilon$, choose a random child.

```rust
if (random() < epsilon)
{
    // choose random child
}
else
{
    // choose child with highest average value
}
```

## Behavior

| Parameter | Effect |
| --------- | ------ |
| High $\varepsilon$ | More random exploration. |
| Low $\varepsilon$ | More greedy exploitation. |
| $\varepsilon = 0$ | Always choose the current best child. |

## Strengths

- Very easy to implement.
- Useful as a debugging baseline.
- Does not require logarithms, priors, or uncertainty models.

## Weaknesses

Exploration is blind. A bad-looking child and a barely sampled child may receive the same random treatment.

For serious [[Monte Carlo Tree Search|MCTS]], [[Upper Confidence Trees]] is usually a better default because it explores under-visited children more deliberately.
