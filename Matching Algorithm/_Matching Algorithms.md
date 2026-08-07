---
title: Matching Algorithms
---
**Matching algorithms** compare, rank, or assign people, items, or other entities. The term can describe different problems. A compatibility score, a recommendation rank, and a stable assignment do not have the same objective.

## OkCupid case study

The original OkCupid system separated two decisions:

1. [[OkCupid Matching Algorithm|The matching algorithm]] calculated a mutual compatibility score for two users. It used their answers, acceptable partner answers, and personal importance weights.
2. [[OkCupid Question Selection Algorithm|The question selection algorithm]] decided which unanswered questions to show first. OkCupid said that it ranked questions by how well they divided the population.

```mermaid
flowchart LR
    Questions[Selected questions] --> Answers[User answers and preferences]
    Answers --> PairScore[Directional satisfaction scores]
    PairScore --> MutualScore[Mutual match percentage]
    MutualScore --> Ranking[Candidate ranking]
```

The question selector controls what data enters the system. The matching algorithm controls how that shared data becomes a pair score. A poor question order can delay useful data even when the pair-score formula is correct.

## Problem types

| Problem | Objective | Typical methods |
| --- | --- | --- |
| Pair compatibility | Estimate how well two entities satisfy each other | [[OkCupid Matching Algorithm]], weighted similarity, probabilistic models |
| Question selection | Select the next question that gives useful information | [[OkCupid Question Selection Algorithm]], entropy, information gain, active learning |
| Candidate recommendation | Rank people or items for one user | [[Neighborhood Collaborative Filtering]], [[Content-based Filtering]], [[Matrix Factorization]], [[Hybrid Recommenders]] |
| Grouping | Find segments with similar categorical or numeric data | k-modes, [[K-means Clustering]] |
| Two-sided assignment | Assign agents when both sides have ranked preferences | Gale-Shapley stable matching |

## Related and alternative algorithms

- [[Similarity Measures]] provides Jaccard, cosine, Pearson, Manhattan, and Euclidean comparisons.
- [[Neighborhood Collaborative Filtering]] finds candidates from similar users or items.
- [[Content-based Filtering]] compares explicit profile features.
- [[Matrix Factorization]] learns latent factors from an interaction matrix.
- [[Hybrid Recommenders]] combines multiple candidate generators and rankers.
- [Gale and Shapley's original stable-matching paper](https://doi.org/10.1080/00029890.1962.11989827) solves an assignment problem. It does not calculate romantic compatibility.
- [Decision trees in scikit-learn](https://scikit-learn.org/stable/modules/tree.html) describe entropy-based splits that can support adaptive question selection.

## Primary historical sources

- [OkCupid FAAAQ: Frequently Asked-For Answers About Questions](https://web.archive.org/web/20110103221822/http://www.okcupid.com/faaaq)
- [Christian Rudder: Inside OKCupid, the math of online dating](https://www.ted.com/talks/christian_rudder_inside_okcupid_the_math_of_online_dating)
- [OkTrends: How Races and Religions Match in Online Dating](https://gwern.net/doc/psychology/okcupid/howracesandreligionsmatchinonlinedating.html)
- [How a Math Genius Hacked OkCupid to Find True Love](https://www.wired.com/2014/01/how-to-hack-okcupid/)
