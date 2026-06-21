---
title: Negamax Search
---
**Negamax search** is a compact form of [[Minimax Search]] for two-player zero-sum games.

It relies on score symmetry:

$$
\text{value}_{player}(s) = -\text{value}_{opponent}(s)
$$

## Core idea

Instead of writing separate MAX and MIN cases, always score from the current player's perspective and negate the child result.

```text
negamax(state):
    if terminal(state):
        return utility_for_current_player(state)
    return max(-negamax(child) for child in successors(state))
```

## Why engines use it

Negamax reduces duplicated logic. This makes it easier to add:

- [[Alpha-Beta Pruning]],
- move ordering,
- transposition tables,
- iterative deepening,
- quiescence search.

It computes the same decisions as minimax when the game is zero-sum and the evaluation function is symmetric.
