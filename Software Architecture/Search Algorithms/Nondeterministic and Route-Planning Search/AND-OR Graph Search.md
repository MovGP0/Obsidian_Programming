---
title: AND-OR Graph Search
---
**AND-OR graph search** finds plans for nondeterministic environments.

In ordinary search, an action leads to one known successor. In nondeterministic search, an action may lead to several possible outcomes.

## Node types

| Node type | Meaning |
| --------- | ------- |
| OR node | The agent chooses one action. |
| AND node | The plan must handle every possible outcome of that action. |

## Result

The result is not just a linear path. It is a contingent plan:

```text
do action A
if outcome 1: follow plan P1
if outcome 2: follow plan P2
```

## Use when

- actions have uncertain outcomes,
- the agent can observe which outcome occurred,
- a plan must be robust to multiple possible futures.
