---
title: Variable Elimination
---
**Variable elimination** is an exact inference algorithm for graphical models.

It answers a query by summing out hidden variables one at a time.

## Core idea

1. Write the joint distribution as a product of factors.
2. Incorporate evidence by restricting factors.
3. Choose an elimination order for hidden variables.
4. Multiply factors that mention the next variable.
5. Sum that variable out.
6. Normalize the remaining factor for the query.

## Why elimination order matters

The same query can be cheap or expensive depending on the largest intermediate factor created during elimination.

Good elimination orders exploit the graph structure.

## Use when

- exact answers are required,
- the network is small enough or structured enough,
- factor sizes remain manageable.

When intermediate factors become too large, consider [[Markov Chain Monte Carlo]] or [[Variational Inference]].
