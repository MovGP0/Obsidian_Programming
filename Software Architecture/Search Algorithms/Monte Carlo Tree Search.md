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

## UCB and UCT

During the selection phase, MCTS commonly uses **Upper Confidence Bounds** (**UCB**) to decide which child node to explore next. In trees this is usually called **Upper Confidence bounds applied to Trees** (**UCT**).

The problem is the **exploration vs. exploitation trade-off**:

| Goal | Meaning |
| ---- | ------- |
| Exploitation | Prefer moves that already look good. |
| Exploration | Still try moves that have not been sampled much. |

UCB gives each child move a score:

$$
\text{UCB}_i =
\bar X_i + C \sqrt{\frac{\ln N}{n_i}}
$$

| Symbol | Meaning |
| ------ | ------- |
| $\bar X_i$ | Average reward or value of child $i$ so far. |
| $n_i$ | Number of times child $i$ has been visited. |
| $N$ | Number of times the parent node has been visited. |
| $C$ | Exploration constant. |

MCTS selects the child with the highest UCB score.

The formula has two parts:

$$
\bar X_i
$$

This is the **exploitation term**. It prefers moves that have performed well.

$$
C \sqrt{\frac{\ln N}{n_i}}
$$

This is the **exploration bonus**. It prefers moves that have not been tried much yet.

As $n_i$ increases, the exploration bonus shrinks. As $N$ increases, all children gradually receive more pressure to be explored.

## Example

Assume a parent node has been visited $N = 100$ times and use $C = 1.4$.

| Move | Visits $n_i$ | Average reward $\bar X_i$ |
| ---- | -----------: | ------------------------: |
| A | 50 | 0.60 |
| B | 10 | 0.55 |
| C | 2 | 0.40 |

Approximate UCB scores:

| Move | Exploitation | Exploration bonus | UCB score |
| ---- | -----------: | ----------------: | --------: |
| A | 0.60 | 0.42 | 1.02 |
| B | 0.55 | 0.95 | 1.50 |
| C | 0.40 | 2.12 | 2.52 |

Move C currently looks weak, but it has only been tried twice. UCT may select it because the value estimate is still uncertain. If C keeps performing badly, its average reward remains low and its exploration bonus decays.

## Why UCB is useful

UCB comes from the **multi-armed bandit** setting. Each move is like a slot machine arm with an unknown expected reward. The algorithm should find good arms without wasting too many trials on bad ones.

UCB handles this by adding an optimism bonus to uncertain actions. A rarely visited move is treated as potentially good until enough evidence says otherwise.

UCT works well as a baseline, but the assumptions are imperfect in a game tree. Rewards are not truly independent and stationary, because a move's value depends on later choices, opponent behavior, and the policy used during rollouts.

## Alternatives and extensions

### Epsilon-greedy selection

With probability $1 - \varepsilon$, choose the best-known move. With probability $\varepsilon$, choose a random move.

```rust
if (random() < epsilon)
{
    // choose random child
}
else
{
    // choose child with highest average value
}
```

This is easy to implement, but exploration is blind. It does not focus on actions whose estimates are uncertain.

### Softmax exploration

**Softmax**, also called **Boltzmann exploration**, chooses moves probabilistically based on estimated value:

$$
P(i) = \frac{e^{\bar X_i / \tau}}{\sum_j e^{\bar X_j / \tau}}
$$

| Temperature | Behavior |
| ----------- | -------- |
| High $\tau$ | More random. |
| Low $\tau$ | More greedy. |

Softmax is smoother than epsilon-greedy, but plain softmax does not directly account for visit-count uncertainty.

### Thompson sampling

**Thompson sampling** models uncertainty statistically and samples from each move's posterior distribution. For binary win/loss rewards, a common model is:

$$
\theta_i \sim \operatorname{Beta}(\alpha_i, \beta_i)
$$

The selected move is the one with the highest sampled $\theta_i$.

This can be strong in bandit problems, but it is less common in classical MCTS than UCT.

### Polynomial Upper Confidence Trees (PUCT)

**Polynomial Upper Confidence Trees** (**PUCT**) combines value estimates with a policy prior. It is the selection rule associated with AlphaGo and AlphaZero-style search.

$$
\text{PUCT}_i =
Q_i + c_{\text{puct}} P_i \frac{\sqrt{N}}{1+n_i}
$$

| Symbol | Meaning |
| ------ | ------- |
| $Q_i$ | Estimated value of move $i$. |
| $P_i$ | Prior probability from a policy network or heuristic. |
| $N$ | Parent visits. |
| $n_i$ | Child visits. |
| $c_{\text{puct}}$ | Exploration constant. |

PUCT says: explore moves that the policy thinks are promising, especially if they are under-visited.

It is excellent when the prior is good. It is misleading when the prior is poor.

### Rapid Action Value Estimation (RAVE) and All Moves As First (AMAF)

The idea behind **Rapid Action Value Estimation** (**RAVE**) and **All Moves As First** (**AMAF**) is to reuse rollout information more aggressively. If a move appears later in a rollout and looks good, RAVE treats that as partial evidence that the move might also be good earlier.

This can improve early search efficiency in games where move order is flexible. It can be biased when move order matters strongly.

### Progressive widening

**Progressive widening** is useful when the branching factor is huge. Instead of expanding all possible moves immediately, the node is allowed to add more children only as visits increase:

$$
k \leq c N^\alpha
$$

Here, $k$ is the number of expanded children.

This matters for games with many legal actions, continuous actions, card combinations, deck-building choices, or complex board states.

### Progressive bias

**Progressive bias** adds a heuristic term to UCB:

$$
\text{score}_i =
\bar X_i
+
C \sqrt{\frac{\ln N}{n_i}}
+
\frac{H_i}{n_i + 1}
$$

The heuristic $H_i$ has strong influence early, but decays as real simulation data accumulates.

This is practical when good domain heuristics exist. Bad heuristics can mislead the search.

### Heuristic or neural value evaluation

Classic MCTS often uses random playouts. For many strategy games, random play is too weak to produce useful estimates.

Instead, the search can stop at a depth and evaluate the state:

```text
value = heuristic_evaluate(state)
```

or:

```text
value = neural_network_value(state)
```

This is often necessary for complex games where full rollouts are noisy, slow, or unrealistic.

### EXP3

**EXP3** is a bandit algorithm for adversarial reward settings. It assigns probabilities to actions and updates them multiplicatively.

It has theory for adversarial and non-stationary rewards, but is less common in game-tree MCTS than UCT or PUCT.

## Practical choice

| Situation | Good choice |
| --------- | ----------- |
| Simple baseline | UCT |
| Huge branching factor | UCT plus progressive widening |
| Good hand-written heuristics | UCT plus progressive bias |
| Learned policy available | PUCT |
| Poor random rollouts | Heuristic or neural value evaluation |
| Hidden information game | Information Set MCTS or belief-state MCTS |
| Simultaneous or adversarial uncertainty | EXP3, regret matching, or opponent-model variants |

For a complex modern board game such as Dune: Imperium, plain UCT is probably only a baseline. A stronger search would likely need:

1. Information Set MCTS for hidden cards, intrigue, and unknown hands.
2. Progressive widening for large decision spaces.
3. Heuristic evaluation instead of purely random rollouts.
4. PUCT if a learned or hand-designed policy prior is available.
5. Opponent modelling, because other players affect board spaces, combat, and card-market dynamics.

UCB/UCT is a good default because it is simple, robust, and mathematically motivated. For complex games, it usually needs substantial engineering around it.
