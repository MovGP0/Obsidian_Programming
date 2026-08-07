---
title: Feature-weighted Linear Stacking
aliases:
  - FWLS
source: Practical Recommender Systems
source_chapter: 12
---
**Feature-weighted linear stacking**, or **FWLS**, is a hybrid recommendation algorithm. It combines predictions from base recommenders, but the weight of each prediction changes with user, item, or context features.

A fixed linear ensemble uses one weight per recommender:

$$
\hat r_{ui} = \sum_{m=1}^{M} \alpha_m f_m(u,i)
$$

FWLS makes each weight a function of meta-features $z_k(u,i)$:

$$
\hat r_{ui}
= \sum_{m=1}^{M}\sum_{k=1}^{K}
\beta_{mk}f_m(u,i)z_k(u,i)
$$

The products $f_mz_k$ become features in a linear regression model.

## Useful meta-features

- Number of user ratings.
- Number of item ratings.
- Age of the item.
- Completeness of item metadata.
- Confidence of a similarity score.
- User or item segment.
- Time, device, or location context.

For example, the model can give more weight to [[Content-based Filtering]] for a new item. It can give more weight to [[Neighborhood Collaborative Filtering]] after the item gets enough interactions.

## Training process

1. Split interaction data without leaking test information.
2. Train each base recommender.
3. Generate base predictions for stacking training rows.
4. Calculate the meta-features for the same rows.
5. Create every base-prediction and meta-feature product.
6. Fit a regularized linear regression model.
7. Use the fitted model to combine online predictions.

Out-of-fold predictions are safer than predictions from a base model on its own training rows.

## Rust example

```rust
fn fwls_predict(
    base_predictions: &[f64],
    meta_features: &[f64],
    coefficients: &[Vec<f64>],
) -> f64
{
    assert_eq!(base_predictions.len(), coefficients.len());
    assert!(coefficients.iter().all(|row| row.len() == meta_features.len()));

    base_predictions.iter()
        .zip(coefficients)
        .map(|(prediction, weights)|
        {
            let adaptive_weight = weights.iter()
                .zip(meta_features)
                .map(|(coefficient, feature)| coefficient * feature)
                .sum::<f64>();
            prediction * adaptive_weight
        })
        .sum()
}

fn example() -> f64
{
    let predictions = [4.2, 3.8];
    let meta_features = [1.0, 0.1, 25.0];
    let coefficients = vec![
        vec![0.3, 0.5, 0.01],
        vec![0.7, -0.2, -0.01],
    ];

    fwls_predict(&predictions, &meta_features, &coefficients)
}
```

## Strengths

- It adapts to different data conditions.
- It keeps base recommenders independent.
- Linear coefficients are easier to inspect than a complex ranker.

## Limits

- It creates many interaction features.
- Correlated base models can produce unstable weights.
- Bad validation design can cause leakage.
- Base scores must have consistent meaning or normalization.

## Related algorithms

- [[Hybrid Recommenders]]
- [[Cold Start Strategies]]
- [[Ranking and Learning to Rank]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapter 12, section 12.5.
