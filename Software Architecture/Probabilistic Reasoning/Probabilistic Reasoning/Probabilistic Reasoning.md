---
title: Probabilistic Reasoning
---
**Probabilistic reasoning** answers questions about uncertain variables using a probability model.

Typical queries include:

- prediction: what will happen?
- diagnosis: what caused this evidence?
- filtering: what is true now?
- smoothing: what was true earlier?
- decision support: which action has the best expected utility?

## Model types

| Model | Use when |
| ----- | -------- |
| [[Bayesian Networks]] | Variables have directed causal or dependency structure. |
| [[Markov Models]] | State evolves step by step. |
| [[Dynamic Bayesian Networks]] | A Bayesian network repeats over time. |
| [[Probabilistic Programs]] | A generative process is easier to write as code. |

## Inference styles

| Inference style | Articles |
| --------------- | -------- |
| Exact inference | [[Variable Elimination]], [[Belief Propagation]] |
| Sampling inference | [[Markov Chain Monte Carlo]], [[Particle Filters]] |
| Approximate optimization | [[Variational Inference]] |

## Use when

- evidence is incomplete or noisy,
- variables are uncertain but related,
- the system should maintain beliefs rather than only boolean facts.
