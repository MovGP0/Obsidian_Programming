---
title: Singular Value Decomposition Recommenders
aliases:
  - SVD Recommenders
source: Practical Recommender Systems
source_chapter: 11
---
**Singular Value Decomposition**, or **SVD**, factors a matrix into three matrices:

$$
R = U\Sigma V^T
$$

For recommendation, $R$ is the user-item rating matrix. Truncated SVD keeps only the $k$ strongest singular values:

$$
R \approx U_k\Sigma_kV_k^T
$$

This lower-rank approximation maps users and items into a smaller latent space. The hidden dimensions can capture patterns such as genre, popularity, or style without explicit feature labels.

## Recommendation process

1. Build the rating matrix.
2. Handle missing values.
3. Factor the matrix.
4. Keep the selected number of latent factors.
5. Reconstruct predicted ratings.
6. Recommend the highest predicted unseen items.

## Missing values

Classical SVD needs a dense matrix. A zero in a sparse rating matrix usually means "unknown," not "disliked." Directly treating all missing values as zero causes bias.

Imputation can fill missing values with a global, user, or item mean. This makes SVD possible, but the filled values can dominate the real observations. [[Funk SVD]] avoids this step because it learns only from observed ratings.

## Folding in

Folding in adds a user or item to an existing factor space without a full refit. It estimates a new vector from known ratings and the fixed factor matrix. This is faster, but periodic full training is still useful.

## Bias baseline

A baseline separates common effects from latent interaction:

$$
b_{ui} = \mu + b_u + b_i
$$

The factor model then learns the residual preferences.

## Rust example: prediction from truncated factors

This example uses factor matrices that an SVD library has already calculated.

```rust
fn truncated_svd_prediction(
    user_factors: &[f64],
    singular_values: &[f64],
    item_factors: &[f64],
) -> f64
{
    assert_eq!(user_factors.len(), singular_values.len());
    assert_eq!(singular_values.len(), item_factors.len());

    user_factors.iter()
        .zip(singular_values)
        .zip(item_factors)
        .map(|((user, singular_value), item)| user * singular_value * item)
        .sum()
}

fn reconstruct_row(
    user_factors: &[f64],
    singular_values: &[f64],
    item_factor_rows: &[Vec<f64>],
) -> Vec<f64>
{
    item_factor_rows.iter()
        .map(|item| truncated_svd_prediction(user_factors, singular_values, item))
        .collect()
}
```

## Strengths

- It reduces the dimension of a large rating matrix.
- It reveals latent structure.
- It gives compact vectors for similarity and retrieval.

## Limits

- Classical SVD does not handle unknown cells directly.
- A full decomposition can be expensive.
- Factors are difficult to explain.
- New users and items still need a cold-start method.

## Related algorithms

- [[Matrix Factorization]]
- [[Funk SVD]]
- [[Cold Start Strategies]]
- [[Neighborhood Collaborative Filtering]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapter 11, sections 11.3 and 11.4.
