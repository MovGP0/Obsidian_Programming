---
title: Bayesian Personalized Ranking
aliases:
  - BPR
source: Practical Recommender Systems
source_chapter: 13
---
**Bayesian Personalized Ranking**, or **BPR**, learns a personal order of items from implicit feedback. It does not try to reproduce rating values. It learns that a user should rank an observed item above an unobserved item.

## Training data

Each training sample is a triple $(u,i,j)$:

- User $u$ interacted with positive item $i$.
- User $u$ did not interact with sampled item $j$.
- The model should produce $\hat x_{ui} > \hat x_{uj}$.

An unobserved item is not a confirmed dislike. BPR uses it as a working negative sample.

## Objective

Define the score difference:

$$
\hat x_{uij} = \hat x_{ui} - \hat x_{uj}
$$

The regularized BPR objective is commonly written as:

$$
\max_\Theta
\sum_{(u,i,j)\in D}
\ln\sigma(\hat x_{uij})
- \lambda\lVert\Theta\rVert^2
$$

where:

$$
\sigma(x)=\frac{1}{1+e^{-x}}
$$

Maximizing the objective increases the positive item's score relative to the sampled negative item.

## BPR with matrix factorization

With user vector $p_u$ and item vectors $q_i$ and $q_j$:

$$
\hat x_{uij}=p_u^T(q_i-q_j)
$$

Stochastic gradient descent repeatedly samples a user, one positive item, and one negative item. It then updates the three vectors.

## Rust example: one BPR update

```rust
fn dot(a: &[f64], b: &[f64]) -> f64
{
    a.iter().zip(b).map(|(left, right)| left * right).sum()
}

fn sigmoid(value: f64) -> f64
{
    1.0 / (1.0 + (-value).exp())
}

fn train_triplet(
    user: &mut [f64],
    positive_item: &mut [f64],
    negative_item: &mut [f64],
    learning_rate: f64,
    regularization: f64,
)
{
    let score_difference = dot(user, positive_item) - dot(user, negative_item);
    let gradient = sigmoid(-score_difference);

    for factor in 0..user.len()
    {
        let old_user = user[factor];
        let old_positive = positive_item[factor];
        let old_negative = negative_item[factor];

        user[factor] += learning_rate
            * (gradient * (old_positive - old_negative) - regularization * old_user);
        positive_item[factor] += learning_rate
            * (gradient * old_user - regularization * old_positive);
        negative_item[factor] += learning_rate
            * (-gradient * old_user - regularization * old_negative);
    }
}
```

## Sampling choices

- Uniform negative sampling is simple.
- Popularity-aware sampling trains on harder negatives.
- Exposure-aware sampling avoids treating unseen items as dislikes when the user did not have a chance to see them.
- Resampling each epoch gives more pair coverage than storing all triples.

## Strengths

- It directly optimizes pairwise order.
- It fits implicit signals such as purchases, plays, and clicks.
- It works with matrix factorization and other score models.

## Limits

- Negative samples can be false negatives.
- Pairwise quality does not guarantee a diverse final list.
- Popular items can dominate sampling and exposure.
- New users and items still need fallback methods.

Evaluate BPR with ranking metrics such as MAP or NDCG, not only RMSE.

## Related algorithms

- [[Ranking and Learning to Rank]]
- [[Funk SVD]]
- [[Matrix Factorization]]
- [[Evaluating Recommender Systems]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapter 13, sections 13.4 to 13.6.
