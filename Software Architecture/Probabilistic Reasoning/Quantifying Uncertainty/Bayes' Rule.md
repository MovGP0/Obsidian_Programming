---
title: Bayes' Rule
---
**Bayes' rule** updates belief in a hypothesis after observing evidence.

$$
P(H \mid E) =
\frac{P(E \mid H)P(H)}{P(E)}
$$

| Term | Meaning |
| ---- | ------- |
| $P(H)$ | Prior belief in the hypothesis. |
| $P(E \mid H)$ | Likelihood of evidence if the hypothesis is true. |
| $P(E)$ | Marginal probability of the evidence. |
| $P(H \mid E)$ | Posterior belief after seeing the evidence. |

## Intuition

Evidence increases belief in a hypothesis when that evidence is more likely under the hypothesis than under alternatives.

## Normalized form

When comparing several hypotheses:

$$
P(H_i \mid E) = \alpha P(E \mid H_i)P(H_i)
$$

Here, $\alpha$ is a normalization constant that makes all posterior probabilities sum to one.

## Use when

- evidence arrives after an initial belief,
- diagnostic reasoning is needed,
- model parameters or hidden states must be inferred from observations.
