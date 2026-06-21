---
title: Partially Observable Markov Decision Processes (POMDPs)
---
**Partially observable Markov decision processes** (**POMDPs**) extend [[Markov Decision Processes]] to hidden state.

The agent does not know the true state directly. It maintains a belief state: a probability distribution over possible states.

## Components

A POMDP adds an observation model:

$$
P(o \mid s, a)
$$

The agent chooses actions based on belief, not known state.

## Why they are hard

Planning must reason about:

- what actions do to the world,
- what observations reveal,
- how beliefs change,
- which actions are useful for gathering information.

## Use when

- state is partially hidden,
- observations are noisy,
- information-gathering actions matter,
- decisions are sequential.
