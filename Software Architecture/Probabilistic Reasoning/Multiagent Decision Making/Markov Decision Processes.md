---
title: Markov Decision Processes (MDPs)
---
**Markov decision processes** (**MDPs**) model sequential decision making under uncertainty with fully observable state.

An MDP contains:

| Component | Meaning |
| --------- | ------- |
| States | Possible situations. |
| Actions | Choices available to the agent. |
| Transition model | $P(s' \mid s, a)$ |
| Reward function | $R(s, a, s')$ |
| Discount factor | How future rewards are weighted. |

## Goal

Find a policy:

$$
\pi(s) \rightarrow a
$$

that maximizes expected cumulative reward.

## Use when

- state is observable,
- actions have uncertain outcomes,
- decisions happen over multiple steps,
- rewards define what the agent should optimize.

When the state is hidden or only partially observed, use [[Partially Observable Markov Decision Processes]].
