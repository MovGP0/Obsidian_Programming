---
title: Polynomial Upper Confidence Trees (PUCT)
---
**Polynomial Upper Confidence Trees** (**PUCT**) is a tree policy that combines value estimates with a policy prior. It is the selection rule associated with AlphaGo and AlphaZero-style search.

The score for child $i$ is commonly written as:

$$
\text{PUCT}_i =
Q_i + c_{\text{puct}} P_i \frac{\sqrt{N}}{1+n_i}
$$

| Symbol | Meaning |
| ------ | ------- |
| $Q_i$ | Estimated value of move $i$. |
| $P_i$ | Prior probability from a [[Policy Networks\|policy network]] or heuristic. |
| $N$ | Parent visits. |
| $n_i$ | Child visits. |
| $c_{\text{puct}}$ | Exploration constant. |

## Intuition

PUCT explores moves that the policy thinks are promising, especially if they are under-visited.

The value term $Q_i$ says what search has learned so far. The prior term $P_i$ says where search should look early.

## Strengths

- Excellent when the prior is useful.
- Works naturally with policy/value networks.
- Focuses MCTS on plausible moves in huge action spaces.

## Weaknesses

- Depends strongly on prior quality.
- Bad priors can suppress rare but correct actions.
- Requires careful tuning of $c_{\text{puct}}$ and training-time exploration.

PUCT is usually more appropriate than plain [[Upper Confidence Trees]] when a learned policy or strong hand-written prior is available.
