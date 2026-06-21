---
title: Probabilistic Programs
---
**Probabilistic programs** are programs that include random choices and observations.

They describe a generative model:

```text
prior assumptions
random choices
simulated data
observations
posterior query
```

## Key operations

| Operation | Meaning |
| --------- | ------- |
| sample | Draw a value from a distribution. |
| observe | Condition the model on evidence. |
| infer | Compute or approximate the posterior distribution. |

## Example shape

```text
disease = sample(prior)
symptoms = sample(symptom_model(disease))
observe(symptoms == actual_symptoms)
infer(disease)
```

## Use when

- probabilistic assumptions should be executable,
- domain models include branching logic,
- posterior uncertainty should be returned rather than a single estimate.
