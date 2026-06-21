---
title: Progressive Widening
---
**Progressive widening** limits how many children a node may expand. It is useful when the branching factor is huge or continuous.

Instead of expanding all possible moves immediately, allow more children only as the node receives more visits:

$$
k \leq c N^\alpha
$$

| Symbol | Meaning |
| ------ | ------- |
| $k$ | Number of expanded children. |
| $N$ | Node visit count. |
| $c$ | Widening constant. |
| $\alpha$ | Growth exponent. |

## Intuition

Early in search, the algorithm should not spend all of its budget creating thousands of children with one visit each. Progressive widening keeps the tree narrow at first, then gradually opens more actions as evidence accumulates.

## Use when

- The legal action set is very large.
- Actions are continuous.
- A game has many card combinations, deck-building choices, worker placements, or tactical subchoices.
- Generating every legal child is expensive.

## Relation to tree policy

Progressive widening is not only a scoring rule like [[Upper Confidence Trees]]. It changes which children are available to the tree policy at all.

It is commonly combined with UCT or [[Polynomial Upper Confidence Trees]].
