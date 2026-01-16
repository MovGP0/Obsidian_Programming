[Q-Learning](https://en.wikipedia.org/wiki/Q-learning) is a model-free reinforcement learning algorithm that seeks to learn the optimal action-selection policy by estimating the optimal **Q-function** (also known as the **state-action value function**). This function represents the expected cumulative reward an agent can obtain by taking a specific action in a given state and subsequently following the optimal policy.

$$Q(s, a) \leftarrow Q(s, a) + \alpha \left[ r + \gamma \max_{a'} \left( Q(s', a') - Q(s, a) \right) \right]$$
## Bellman Optimality

The optimal Q-function, denoted as $$Q^*(s, a)$$satisfies the **Bellman optimality equation**:

$$Q^*(s, a) = \mathbb{E} \left[ R_{t+1} + \gamma \max_{a'} Q^*(s_{t+1}, a') \mid s_t = s, a_t = a \right]$$
where:

- $s$ represents the current state.
- $a$ represents the action taken in state ss.
- $R_{t+1}$ is the reward received after taking action aa in state $s$.
- $s_{t+1}$ is the next state resulting from action $a$.
- $a'$ represents possible actions in state $s_{t+1}$.
- $\gamma$ (gamma) is the discount factor ($0 ≤ \gamma < 1$), determining the importance of future rewards.
- $\mathbb{E}$ denotes the expectation operator, accounting for any stochasticity in state transitions and rewards.

The Bellman optimality equation expresses that the optimal Q-value for a state-action pair $(s, a)$ equals the expected reward from taking action $a$ in state $s$, plus the discounted maximum Q-value of the subsequent state-action pairs.

In Q-learning, the Q-values are iteratively updated using the following update rule:

$$Q(s_t, a_t) \leftarrow Q(s_t, a_t) + \alpha \left[ R_{t+1} + \gamma\, \max_{a'} \left( Q(s_{t+1}, a') - Q(s_t, a_t) \right) \right]$$
where:

- $\alpha$ (alpha) is the learning rate ($0 < \alpha ≤ 1$), determining the extent to which new information overrides the old.

This update rule adjusts the current Q-value $Q(s_t, a_t)$ towards the target value $R_{t+1} + \gamma \max_{a'} Q(s_{t+1}, a')$, which comprises the immediate reward plus the discounted estimate of the optimal future Q-value.

Through repeated application of this update across various state-action pairs, Q-learning converges to the optimal Q-function $Q^*$, enabling the agent to act optimally by selecting actions that maximize $Q^*(s, a)$ in each state.
