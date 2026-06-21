---
title: Probability Theory
---
**Probability theory** provides rules for reasoning about uncertain events.

## Basic notation

| Notation | Meaning |
| -------- | ------- |
| $P(A)$ | Probability that event $A$ is true. |
| $P(A, B)$ | Joint probability of $A$ and $B$. |
| $P(A \mid B)$ | Conditional probability of $A$ given $B$. |
| $\neg A$ | Event $A$ is false. |

## Core rules

Complement:

$$
P(\neg A) = 1 - P(A)
$$

Product rule:

$$
P(A, B) = P(A \mid B) P(B)
$$

Sum rule:

$$
P(A) = \sum_b P(A, b)
$$

Bayes' rule follows from applying the product rule in two directions.

## Use when

- uncertainty must be represented numerically,
- evidence changes belief,
- several uncertain variables interact,
- decisions should account for likelihoods.
