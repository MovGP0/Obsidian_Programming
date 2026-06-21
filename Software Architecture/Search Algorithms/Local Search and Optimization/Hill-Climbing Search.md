---
title: Hill-Climbing Search
---
**Hill-climbing search** repeatedly moves from the current state to a better neighboring state.

It is a local search algorithm: it keeps only the current candidate rather than a full search tree.

## Algorithm

1. Start with an initial state.
2. Evaluate neighboring states.
3. Move to a better neighbor.
4. Stop when no neighbor improves the score.

## Failure modes

| Problem | Meaning |
| ------- | ------- |
| Local maximum | Better than neighbors but not globally best. |
| Plateau | Many neighbors have similar value. |
| Ridge | Progress requires moves that are not locally obvious. |

## Variants

- stochastic hill climbing,
- first-choice hill climbing,
- random-restart hill climbing.

Random restarts are often the simplest way to make hill climbing more robust.
