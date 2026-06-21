---
title: Conditional Independence
---
**Conditional independence** says that two variables become independent once another variable is known.

Variables $X$ and $Y$ are conditionally independent given $Z$ when:

$$
P(X, Y \mid Z) = P(X \mid Z)P(Y \mid Z)
$$

Equivalently:

$$
P(X \mid Y, Z) = P(X \mid Z)
$$

## Why it matters

Conditional independence is what makes large probabilistic models tractable.

Without independence structure, a joint distribution over many variables needs an enormous table. With independence assumptions, the distribution can be factorized.

## Example

A disease can cause fever and cough. Once the disease is known, fever and cough may be treated as independent symptoms in a simple model.

This does not mean fever and cough are independent overall. It means the disease explains their dependence.

## Use in models

Conditional independence is central to:

- [[Bayesian Networks]],
- [[Dynamic Bayesian Networks]],
- [[Hidden Markov Models]],
- [[Belief Propagation]].
