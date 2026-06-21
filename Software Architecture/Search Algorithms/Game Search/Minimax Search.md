---
title: Minimax Search
---
**Minimax search** chooses a move by assuming that the opponent will also play optimally.

It is the classical game-tree algorithm for deterministic, two-player, zero-sum games with perfect information.

## Core idea

| Node type | Choice |
| --------- | ------ |
| MAX | Choose the child with the highest value. |
| MIN | Choose the child with the lowest value. |

Terminal positions are scored from MAX's perspective. Non-terminal values are backed up from their children.

## Algorithm

```text
minimax(state):
    if terminal(state):
        return utility(state)
    if max_turn(state):
        return max(minimax(child) for child in successors(state))
    return min(minimax(child) for child in successors(state))
```

## Use when

- the game is turn-based,
- there is no hidden information,
- the opponent is adversarial,
- a useful evaluation function exists for depth-limited search.

Use [[Alpha-Beta Pruning]] to make minimax practical at larger depths.
