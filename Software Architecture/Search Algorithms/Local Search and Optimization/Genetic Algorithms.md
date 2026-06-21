---
title: Genetic Algorithms
---
**Genetic algorithms** search by evolving a population of candidate solutions.

Each candidate is evaluated by a fitness function. Better candidates are more likely to be selected for reproduction.

## Core loop

1. Create an initial population.
2. Evaluate fitness.
3. Select parents.
4. Create children with crossover and mutation.
5. Replace part or all of the population.
6. Repeat.

## Operators

| Operator | Meaning |
| -------- | ------- |
| Selection | Prefer fitter candidates as parents. |
| Crossover | Combine parts of two candidates. |
| Mutation | Randomly alter a candidate. |

## Use when

- the solution representation can be encoded cleanly,
- the search space is large and rugged,
- approximate solutions are acceptable,
- gradient information is unavailable.
