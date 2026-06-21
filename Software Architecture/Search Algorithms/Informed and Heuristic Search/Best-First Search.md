---
title: Best-First Search
---
**Best-first search** is a general search framework that always expands the frontier node with the best evaluation score.

The evaluation function is usually written as:

$$
f(n)
$$

Different choices of $f(n)$ produce different algorithms.

| Algorithm | Evaluation |
| --------- | ---------- |
| [[Greedy Best-First Search]] | $f(n) = h(n)$ |
| [[Uniform-Cost Search]] | $f(n) = g(n)$ |
| [[A-star Search]] | $f(n) = g(n) + h(n)$ |
| [[Weighted A-star Search]] | $f(n) = g(n) + w h(n)$ |

## Core idea

1. Put the initial state in a priority queue.
2. Remove the node with the best priority.
3. Test for a goal.
4. Expand successors.
5. Insert or update frontier entries.

## Use when

- frontier nodes can be ranked,
- a priority queue is affordable,
- the evaluation function captures useful problem knowledge.

Best-first search is a framework, not one specific optimality guarantee. Completeness and optimality depend on the chosen evaluation function and state-space assumptions.
