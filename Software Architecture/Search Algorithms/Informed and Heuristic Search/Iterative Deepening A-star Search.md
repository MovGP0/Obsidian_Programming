---
title: Iterative Deepening A* Search (IDA*)
---
**Iterative Deepening A-star Search** (IDA*) combines the memory profile of [[Iterative Deepening Search]] with the cost contours of [[A-star Search]].

Instead of storing a large priority queue, IDA* performs depth-first searches bounded by an $f$-cost threshold:

$$
f(n) = g(n) + h(n)
$$

## Algorithm

1. Set the threshold to the initial state's $f$ value.
2. Run depth-first search, cutting off nodes with $f(n)$ above the threshold.
3. If no solution is found, raise the threshold to the smallest exceeded $f$ value.
4. Repeat.

## Use when

- the heuristic is admissible,
- memory is too limited for A-star,
- paths are deep,
- recomputation is cheaper than storing the full frontier.

IDA* is common in puzzles where the branching factor is manageable but A-star memory usage is too high.
