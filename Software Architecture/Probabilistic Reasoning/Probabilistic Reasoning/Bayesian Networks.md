---
title: Bayesian Networks
---
**Bayesian networks** represent a joint probability distribution as a directed acyclic graph.

Each node is a random variable. Each directed edge represents a direct dependency. Each node has a conditional probability distribution given its parents.

## Factorization

For variables $X_1, \dots, X_n$:

$$
P(X_1, \dots, X_n)
=
\prod_i P(X_i \mid Parents(X_i))
$$

## Why they are useful

Bayesian networks make independence assumptions explicit. That lets a large joint distribution be represented by smaller local conditional distributions.

## Common queries

- prediction from causes to effects,
- diagnosis from effects to causes,
- explaining away between alternative causes,
- sensitivity analysis under evidence.

## Inference algorithms

Use [[Variable Elimination]] for exact inference in smaller or structured networks. Use [[Belief Propagation]] for tree-shaped or factor-graph-style models. Use [[Markov Chain Monte Carlo]] when exact inference is too expensive.
