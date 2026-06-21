---
title: Weighted A* Search
---
**Weighted A-star search** changes [[A-star Search]] by giving the heuristic more influence:

$$
f(n) = g(n) + w h(n)
$$

where $w > 1$.

## Intuition

A larger weight makes the search more goal-directed. It often expands fewer nodes than A-star, but it may return a suboptimal path.

| Weight | Behavior |
| ------ | -------- |
| $w = 1$ | Standard A-star. |
| $w > 1$ | More greedy, usually faster, less optimal. |

## Use when

- a good-enough solution is acceptable,
- search time matters more than exact optimality,
- the heuristic is informative,
- the cost of exhaustive optimal search is too high.

Weighted A-star is a practical bridge between [[Greedy Best-First Search]] and optimal A-star.
