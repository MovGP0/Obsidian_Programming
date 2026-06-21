---
title: Markov Models
---
**Markov models** describe systems where the next state depends only on the current state.

The first-order Markov assumption is:

$$
P(X_{t+1} \mid X_0, \dots, X_t)
=
P(X_{t+1} \mid X_t)
$$

## Transition model

A Markov model needs transition probabilities:

$$
P(X_{t+1} \mid X_t)
$$

For discrete states, these can be represented as a transition matrix.

## Use when

- the system evolves step by step,
- recent state is enough for prediction,
- observations are either direct or handled by a separate observation model.

When states are hidden and observations are noisy, use [[Hidden Markov Models]].
