---
title: Dynamic Bayesian Networks (DBNs)
---
**Dynamic Bayesian networks** (**DBNs**) extend [[Bayesian Networks]] across time.

They represent each time step as a slice of variables and define dependencies within and between slices.

## Core idea

A DBN usually specifies:

- an initial state distribution,
- dependencies inside a time slice,
- transition dependencies from one slice to the next,
- observation dependencies.

## Relationship to other models

| Model | Relationship |
| ----- | ------------ |
| [[Hidden Markov Models]] | A simple DBN with one hidden state variable per time step. |
| [[Kalman Filters]] | A continuous linear-Gaussian DBN. |
| [[Particle Filters]] | Approximate inference method for nonlinear DBNs. |

## Use when

- several hidden and observed variables interact over time,
- a single state variable is too coarse,
- temporal structure should remain explicit.
