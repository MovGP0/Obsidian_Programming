---
title: Tree Policies
---
**Tree policies** are the selection rules used inside [[Monte Carlo Tree Search]]. They decide which child node to visit while descending the current search tree.

The tree policy is where MCTS handles the exploration vs. exploitation trade-off.

| Policy                                                   | Core idea                                                       | Use when                                                           |
| -------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| [[Upper Confidence Trees]]                               | Add an uncertainty bonus to average reward.                     | You need a simple, strong MCTS baseline.                           |
| [[Epsilon-Greedy Tree Policy]]                           | Usually choose the best child, sometimes choose randomly.       | You need a trivial baseline or debugging policy.                   |
| [[Softmax Tree Policy]]                                  | Sample children from a value-weighted probability distribution. | You want smoother probabilistic selection.                         |
| [[Thompson Sampling Tree Policy]]                        | Sample from uncertainty estimates and pick the best sample.     | You can model child-value uncertainty explicitly.                  |
| [[Polynomial Upper Confidence Trees]]                    | Combine value estimates with a policy prior.                    | You have a useful learned or heuristic prior.                      |
| [[Rapid Action Value Estimation and All Moves As First]] | Reuse rollout move information across earlier positions.        | Move ordering is flexible enough that later moves are informative. |
| [[Progressive Widening]]                                 | Expand more children only as visits increase.                   | The branching factor is very large or continuous.                  |
| [[Progressive Bias]]                                     | Add a decaying heuristic term to UCT.                           | You have useful domain heuristics.                                 |
| [[Exponential Weights for Exploration and Exploitation]] | Use adversarial bandit weighting.                               | Rewards are adversarial or strongly non-stationary.                |

## See also

- [[Monte Carlo Tree Search]]
- [[Policy Networks]]
