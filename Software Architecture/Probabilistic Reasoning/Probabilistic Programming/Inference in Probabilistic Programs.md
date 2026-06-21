---
title: Inference in Probabilistic Programs
---
**Inference in probabilistic programs** computes posterior beliefs from a model and observations.

The same probabilistic program can often be paired with different inference strategies.

## Common strategies

| Strategy | Use when |
| -------- | -------- |
| Exact enumeration | The latent space is small and discrete. |
| [[Markov Chain Monte Carlo]] | The posterior is complex but can be sampled. |
| Sequential Monte Carlo | Observations arrive over time or the model is sequential. |
| [[Variational Inference]] | Fast approximate inference is more important than exact sampling. |

## Challenges

- high-dimensional latent spaces,
- rare evidence,
- discrete and continuous variables mixed together,
- model branches that make inference difficult,
- diagnosing convergence or approximation quality.

## Use when

- a generative model is already written as code,
- different inference engines should be tested without rewriting the model,
- uncertainty needs to flow through a software system.
