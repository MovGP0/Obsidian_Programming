---
title: Variational Inference
---
**Variational inference** approximates a hard posterior distribution with a simpler distribution.

It turns inference into optimization.

## Core idea

Choose a family of distributions $q(z)$ and find the member closest to the true posterior $p(z \mid x)$.

The usual objective is the evidence lower bound:

$$
\operatorname{ELBO}(q)
=
E_q[\log p(x, z)]
-
E_q[\log q(z)]
$$

## Compared with MCMC

| Method | Tends to be |
| ------ | ----------- |
| [[Markov Chain Monte Carlo]] | More asymptotically exact, often slower. |
| Variational inference | Faster, biased by approximation family. |

## Use when

- fast approximate inference is needed,
- data is large,
- the model supports differentiable optimization,
- a compact posterior approximation is acceptable.
