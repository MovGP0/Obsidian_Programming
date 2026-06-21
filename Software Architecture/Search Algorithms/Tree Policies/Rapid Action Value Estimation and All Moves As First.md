---
title: Rapid Action Value Estimation (RAVE) and All Moves As First (AMAF)
---
**Rapid Action Value Estimation** (**RAVE**) and **All Moves As First** (**AMAF**) are tree-policy extensions that reuse rollout information more aggressively.

The idea is: if a move appears later in a rollout and seems good, treat that as partial evidence that the move might also be good earlier.

## Intuition

In some games, move order is flexible. A move that is useful later may also be useful now. RAVE uses this extra signal to improve early value estimates before ordinary node statistics have enough visits.

## Strengths

- Can improve early search efficiency.
- Useful when rollouts contain informative repeated actions.
- Can reduce the cold-start problem for rarely visited nodes.

## Weaknesses

RAVE can be biased when move order matters strongly. A move that is good later may be illegal, weak, or strategically wrong earlier.

Because of that, RAVE-style estimates are usually blended with ordinary [[Upper Confidence Trees]] statistics and decay as real node-specific data accumulates.
