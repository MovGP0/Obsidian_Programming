---
title: Quantifying Uncertainty
---
**Quantifying uncertainty** means assigning formal degrees of belief to propositions, events, states, and outcomes.

Probability is the main language for uncertainty. Utility is the main language for preference. Together they support rational decisions under uncertainty.

## Core questions

| Question | Concept |
| -------- | ------- |
| How likely is this? | [[Probability Theory]] |
| How should belief change after evidence? | [[Bayes' Rule]] |
| What information can be ignored? | [[Conditional Independence]] |
| Which action is best under uncertainty? | [[Expected Utility]] |

## Probability vs. uncertainty

Probability does not only represent randomness in the world. It can also represent incomplete information.

For example:

- a coin toss is uncertain because the outcome is physically hard to predict,
- a diagnosis is uncertain because the available symptoms are incomplete,
- an opponent's card is uncertain because it is hidden.

## Decision-theoretic view

Probability tells you what may happen. Utility tells you how much you care.

The expected value of an action is:

$$
EU(a) = \sum_s P(s \mid a) U(s)
$$

Choose the action with the highest expected utility when probabilities and utilities are known.
