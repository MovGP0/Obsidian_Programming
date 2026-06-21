---
title: Local Beam Search
---
**Local beam search** keeps $k$ candidate states instead of one.

At each step, it generates successors from all $k$ states and keeps the best $k$ successors overall.

## Difference from parallel hill climbing

Parallel hill climbing runs $k$ independent searches. Local beam search shares information because all successors compete for the same beam.

## Stochastic beam search

Stochastic beam search selects the next beam probabilistically, biased toward better states. This helps preserve diversity and avoid premature convergence.

## Use when

- the state space is too large for complete search,
- a heuristic can rank states,
- keeping several alternatives is better than committing to one path,
- exact optimality is not required.
