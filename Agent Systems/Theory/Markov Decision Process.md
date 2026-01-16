**Markov Decision Process** (MDP) provides a formal framework for modelling sequential decision-making problems in Reinforcement-Learning (RL). The goal of a MDP is to find an optimal policy.

- **State Space** set of all possible state the agent can be in
- **Action Space** the set of actions the agent can take
- **Transition Function** determines the probability of transitioning from one state to another given an action
- **Reward Function** assigns a reward to each state-action pair
- **Discount Factor** value between 0 and 1 that determines the importance of future rewards

## Methods of solving MDPs

- Dynamic Programming
- Monte Carlo Method
- Temporal Difference Learning
	- [[Q-Learning]]
	- [State–action–reward–state–action](https://en.wikipedia.org/wiki/State%E2%80%93action%E2%80%93reward%E2%80%93state%E2%80%93action) (SARSA)

## Policy gradients

Policy gradient methods optimize the policy function, which maps states to actions. Those methods may be more sample efficient than Q-Learning.

## Actor Critic

Combines the ideas of Q-learning and policy gradients. They use an actor to select actions and a critic the quality of those actions. The actor is updated using policy gradients, while the critic is updated using a Q-learning approach.

Actor-Critic methods can be more stable than Q-learning or Policy Gradient alone.

## Reward Functions

The reward function should reward the agent for information that is accurate and consistent.

| Method                          | Description                                                                                                                                                                                           |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BLEU Score**                  | Evaluates the precision of n-grams (contiguous word sequences) in generated text against reference texts, commonly used in machine translation to assess accuracy.                                    |
| **ROUGE Score**                 | Measures the recall of n-grams and the longest common subsequences between generated and reference texts, often applied in text summarization tasks.                                                  |
| **CIDEr**                       | Assesses the similarity of a generated sentence to multiple reference sentences by considering term frequency-inverse document frequency (TF-IDF) weights, tailored for image description evaluation. |
| **METEOR**                      | Calculates alignment between generated and reference texts using precision, recall, stemming, synonyms, and paraphrasing, aiming for higher correlation with human judgment.                          |
| **Knowledge Graph Consistency** | Evaluates the coherence of generated text by verifying its alignment with facts and relationships in a predefined knowledge graph, ensuring factual accuracy.                                         |

## Exploration

An agent must explore different actions to discover the best strategies. Exploration prevents the agent to be stuck in a local optimum.

| Method                | Description                                                                                                                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Epsilon Greedy**    | Selects the best-known action most of the time (with probability $1 - \epsilon$) but occasionally (with probability $\epsilon$) chooses a random action to ensure exploration of new strategies.                                            |
| **Softmax**           | Assigns probabilities to actions based on their estimated values using a softmax function, allowing for a graded preference towards better actions while still exploring lesser-known ones.                                                 |
| **Thompson Sampling** | Selects actions according to the probability that they are optimal, based on maintaining a probability distribution over the expected rewards of each action and sampling from these distributions to balance exploration and exploitation. |
