---
title: Monte Carlo Tree Search (MCTS)
---
**Monte Carlo Tree Search** (**MCTS**) is a search algorithm for choosing actions in large decision spaces. Instead of exhaustively evaluating the whole game tree, it builds a partial tree from sampled play and spends more simulations on moves that look promising.

MCTS is often used for games and planning problems where the branching factor is too large for minimax or full-width search.

## Core loop

A typical MCTS iteration has four phases:

1. **Selection**: start at the root and repeatedly choose a child node.
2. **Expansion**: add one or more children when an expandable node is reached.
3. **Simulation / rollout**: estimate the value of the new state, often by playing randomly, using a heuristic, or calling a value model.
4. **Backpropagation**: update visit counts and value estimates along the selected path.

After many iterations, the root move is usually chosen by highest visit count or highest estimated value.

## Tree policy

The selection rule used in phase 1 is called the **tree policy**. It decides which child to visit while descending the current search tree.

The central problem is the **exploration vs. exploitation trade-off**:

| Goal | Meaning |
| ---- | ------- |
| Exploitation | Prefer moves that already look good. |
| Exploration | Still try moves that have not been sampled much. |

Dedicated tree-policy articles:

| Policy | Core idea |
| ------ | --------- |
| [[Upper Confidence Trees\|UCT]] | Add an uncertainty bonus to average reward. |
| [[Epsilon-Greedy Tree Policy\|Epsilon-greedy]] | Usually choose the best child, sometimes choose randomly. |
| [[Softmax Tree Policy\|Softmax / Boltzmann]] | Sample from a value-weighted probability distribution. |
| [[Thompson Sampling Tree Policy\|Thompson sampling]] | Sample from child-value uncertainty estimates. |
| [[Polynomial Upper Confidence Trees\|PUCT]] | Combine value estimates with a policy prior. |
| [[Rapid Action Value Estimation and All Moves As First\|RAVE / AMAF]] | Reuse rollout move information across positions. |
| [[Progressive Widening\|Progressive widening]] | Expand more children only as visits increase. |
| [[Progressive Bias\|Progressive bias]] | Add a decaying heuristic term to the score. |
| [[Exponential Weights for Exploration and Exploitation\|EXP3]] | Use adversarial bandit weighting. |

## Rollout or value evaluation

Classic MCTS often uses random playouts. For many strategy games, random play is too weak to produce useful estimates.

Instead, the search can stop at a depth and evaluate the state:

```text
value = heuristic_evaluate(state)
```

or:

```text
value = neural_network_value(state)
```

This is not a tree policy. It belongs to the simulation or evaluation phase, but it strongly affects how useful the tree statistics become.

## Practical choice

| Situation | Good choice |
| --------- | ----------- |
| Simple baseline | [[Upper Confidence Trees\|UCT]] |
| Huge branching factor | [[Upper Confidence Trees\|UCT]] plus [[Progressive Widening\|progressive widening]] |
| Good hand-written heuristics | [[Upper Confidence Trees\|UCT]] plus [[Progressive Bias\|progressive bias]] |
| Learned policy available | [[Polynomial Upper Confidence Trees\|PUCT]] |
| Poor random rollouts | Heuristic or neural value evaluation |
| Hidden information game | Information Set MCTS or belief-state MCTS |
| Simultaneous or adversarial uncertainty | [[Exponential Weights for Exploration and Exploitation\|EXP3]], regret matching, or opponent-model variants |

For a complex modern board game such as Dune: Imperium, plain UCT is probably only a baseline. A stronger search would likely need:

1. Information Set MCTS for hidden cards, intrigue, and unknown hands.
2. [[Progressive Widening]] for large decision spaces.
3. Heuristic evaluation instead of purely random rollouts.
4. [[Polynomial Upper Confidence Trees]] if a learned or hand-designed policy prior is available.
5. Opponent modelling, because other players affect board spaces, combat, and card-market dynamics.

UCB/UCT is a good default because it is simple, robust, and mathematically motivated. For complex games, it usually needs substantial engineering around it.
