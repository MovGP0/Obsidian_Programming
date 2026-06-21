---
title: Online Search
---
**Online search** interleaves planning, acting, sensing, and learning.

Unlike offline search, the agent does not know the complete state space or transition model in advance.

## Core idea

1. Observe the current state.
2. Choose an action based on known information.
3. Execute the action.
4. Observe the result.
5. Update the internal model or value estimates.
6. Continue.

## Example: LRTA*

**Learning Real-Time A-star** (LRTA*) updates heuristic estimates while the agent moves through the environment.

It is useful when the agent must act before it can compute a complete plan.

## Use when

- the environment is initially unknown,
- actions reveal new state information,
- planning time is limited,
- the agent must learn while acting.
