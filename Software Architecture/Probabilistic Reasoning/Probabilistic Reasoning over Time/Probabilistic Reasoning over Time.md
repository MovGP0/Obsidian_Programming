---
title: Probabilistic Reasoning over Time
---
**Probabilistic reasoning over time** tracks uncertain states that evolve and produce observations.

The core pattern is:

```text
previous belief -> prediction -> observation -> updated belief
```

## Common tasks

| Task | Meaning |
| ---- | ------- |
| Filtering | Estimate the current state from observations so far. |
| Prediction | Estimate a future state. |
| Smoothing | Estimate a past state using later evidence. |
| Most likely sequence | Find the most likely hidden state path. |

## Model choices

| Model | Use when |
| ----- | -------- |
| [[Markov Models]] | The current state depends mainly on the previous state. |
| [[Hidden Markov Models]] | State is discrete and hidden, observations are noisy. |
| [[Kalman Filters]] | State is continuous, linear, and Gaussian. |
| [[Particle Filters]] | State is nonlinear, non-Gaussian, or represented by samples. |
| [[Dynamic Bayesian Networks]] | The time-slice model has several interacting variables. |
