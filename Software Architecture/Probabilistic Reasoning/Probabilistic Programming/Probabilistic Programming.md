---
title: Probabilistic Programming
---
**Probabilistic programming** expresses probabilistic models as programs.

Instead of manually deriving an inference algorithm for each model, the programmer writes a generative process and asks an inference engine to condition it on observations.

## Core pattern

```text
sample latent variables
simulate observations
condition on actual observations
infer posterior beliefs
```

## Use when

- the model has complex control flow,
- a simulator is easier to write than a closed-form distribution,
- uncertainty should be preserved in outputs,
- model structure changes often.

## Related articles

- [[Probabilistic Programs]]
- [[Inference in Probabilistic Programs]]
- [[Markov Chain Monte Carlo]]
- [[Variational Inference]]
