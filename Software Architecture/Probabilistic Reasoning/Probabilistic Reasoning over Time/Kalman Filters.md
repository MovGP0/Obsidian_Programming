---
title: Kalman Filters
---
**Kalman filters** estimate hidden continuous state over time in linear-Gaussian systems.

They maintain a belief state with a mean and covariance.

## Two phases

| Phase | Meaning |
| ----- | ------- |
| Prediction | Project the state estimate forward using the motion model. |
| Update | Correct the estimate using the latest observation. |

## Assumptions

The standard Kalman filter assumes:

- linear dynamics,
- linear observations,
- Gaussian noise,
- known model parameters.

## Use when

- state is continuous,
- uncertainty is roughly Gaussian,
- models are linear or locally linearized,
- real-time filtering is needed.

For nonlinear systems, use an extended Kalman filter, unscented Kalman filter, or [[Particle Filters]].
