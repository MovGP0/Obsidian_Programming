---
title: Hidden Markov Models (HMMs)
---
**Hidden Markov models** (**HMMs**) model a sequence of hidden states that produce noisy observations.

They have two main components:

| Component | Meaning |
| --------- | ------- |
| Transition model | $P(X_t \mid X_{t-1})$ |
| Observation model | $P(E_t \mid X_t)$ |

## Common algorithms

| Task | Algorithm |
| ---- | --------- |
| Filtering | Forward algorithm. |
| Smoothing | Forward-backward algorithm. |
| Most likely state sequence | Viterbi algorithm. |
| Learning parameters | Baum-Welch / EM. |

## Use when

- hidden state is discrete,
- observations arrive as a sequence,
- the Markov assumption is acceptable.

For continuous linear-Gaussian systems, use [[Kalman Filters]]. For nonlinear or non-Gaussian systems, use [[Particle Filters]].
