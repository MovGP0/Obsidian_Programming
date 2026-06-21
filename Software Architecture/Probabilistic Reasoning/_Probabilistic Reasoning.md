---
title: Probabilistic Reasoning
---
This folder covers reasoning and decision making under uncertainty: how uncertainty is quantified, represented, updated over time, implemented in probabilistic programs, and used when multiple agents interact.

## Topic map

| Topic | Use when | Start here |
| ----- | -------- | ---------- |
| [[Quantifying Uncertainty]] | You need probability, utility, or decision-theoretic language for uncertainty. | Probability basics, Bayes' rule, independence, expected utility. |
| [[Probabilistic Reasoning]] | You need to represent uncertain relationships between variables and answer queries. | Bayesian networks, variable elimination, belief propagation, sampling. |
| [[Probabilistic Reasoning over Time]] | The hidden state changes over time and observations arrive sequentially. | Markov models, HMMs, Kalman filters, particle filters. |
| [[Probabilistic Programming]] | You want to express a generative model as code and let an inference engine answer questions. | Model, observe, infer; MCMC and variational inference. |
| [[Multiagent Decision Making]] | Several agents make decisions and each agent's outcome depends on others. | Game theory, MDPs, POMDPs, multiagent systems. |

## Algorithm and concept index

| Area | Articles |
| ---- | -------- |
| Foundations | [[Probability Theory]], [[Bayes' Rule]], [[Conditional Independence]], [[Expected Utility]] |
| Graphical models | [[Bayesian Networks]], [[Variable Elimination]], [[Belief Propagation]], [[Markov Chain Monte Carlo]] |
| Time | [[Markov Models]], [[Hidden Markov Models]], [[Kalman Filters]], [[Particle Filters]], [[Dynamic Bayesian Networks]] |
| Probabilistic programming | [[Probabilistic Programs]], [[Inference in Probabilistic Programs]], [[Variational Inference]] |
| Decision making | [[Decision Networks]], [[Value of Information]], [[Markov Decision Processes]], [[Partially Observable Markov Decision Processes]], [[Game Theory]], [[Multiagent Systems]] |

## How to choose

If the problem is mostly about updating beliefs after evidence, start with [[Bayes' Rule]] and [[Bayesian Networks]].

If the same uncertain process repeats over time, start with [[Probabilistic Reasoning over Time]]. Use [[Hidden Markov Models]] for discrete hidden states, [[Kalman Filters]] for linear-Gaussian continuous states, and [[Particle Filters]] when the model is nonlinear or non-Gaussian.

If the model is easier to describe as a simulator than as tables and equations, consider [[Probabilistic Programming]].

If actions matter, not just beliefs, move to [[Expected Utility]], [[Decision Networks]], [[Markov Decision Processes]], or [[Partially Observable Markov Decision Processes]].

If other decision makers adapt to your choices, use [[Multiagent Decision Making]] and [[Game Theory]] rather than a single-agent decision model.
