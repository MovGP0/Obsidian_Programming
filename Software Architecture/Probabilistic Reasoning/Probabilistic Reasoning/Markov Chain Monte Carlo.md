---
title: Markov Chain Monte Carlo (MCMC)
---
**Markov Chain Monte Carlo** (**MCMC**) estimates probabilities by drawing samples from a distribution.

It constructs a Markov chain whose stationary distribution is the target distribution.

## Why use it

Exact inference can be too expensive when the model has many variables or dense dependencies. MCMC replaces exact sums with sample averages.

## Common algorithms

| Algorithm | Core idea |
| --------- | --------- |
| Metropolis-Hastings | Propose a new state and accept or reject it. |
| Gibbs sampling | Resample one variable at a time from its conditional distribution. |
| Hamiltonian Monte Carlo | Use gradient information to propose efficient moves in continuous spaces. |

## Use when

- exact inference is intractable,
- approximate answers are acceptable,
- a simulator or unnormalized density is available,
- uncertainty estimates matter.

MCMC can be powerful, but convergence diagnostics and mixing behavior matter.
