---
title: Particle Filters
---
**Particle filters** represent belief over hidden state with a set of weighted samples.

They are also called sequential Monte Carlo methods.

## Core loop

1. Propagate particles through the transition model.
2. Weight particles by how well they explain the new observation.
3. Resample particles according to their weights.
4. Use the particle cloud as the new belief state.

## Strengths

- Handles nonlinear dynamics.
- Handles non-Gaussian beliefs.
- Can represent multiple hypotheses.

## Weaknesses

- Needs enough particles to cover likely states.
- Can suffer from particle degeneracy.
- Resampling can lose diversity.

Use particle filters when [[Kalman Filters]] are too restrictive.
