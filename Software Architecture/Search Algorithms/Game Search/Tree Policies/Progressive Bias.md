---
title: Progressive Bias
---
**Progressive bias** adds a decaying heuristic term to a tree policy such as [[Upper Confidence Trees]].

One common score is:

$$
\text{score}_i =
\bar X_i
+
C \sqrt{\frac{\ln N}{n_i}}
+
\frac{H_i}{n_i + 1}
$$

| Symbol | Meaning |
| ------ | ------- |
| $\bar X_i$ | Average reward or value of child $i$. |
| $N$ | Parent visits. |
| $n_i$ | Child visits. |
| $C$ | Exploration constant. |
| $H_i$ | Heuristic evaluation of child $i$. |

## Intuition

The heuristic $H_i$ has strong influence early, when the child has few visits. As $n_i$ increases, the heuristic term decays and real simulation data dominates.

## Strengths

- Practical when good hand-written heuristics exist.
- Helps guide early search before statistics are reliable.
- Can be simpler than training a [[Policy Networks|policy network]].

## Weaknesses

Bad heuristics can mislead the search. Progressive bias works best when the heuristic is useful but not trusted permanently.
