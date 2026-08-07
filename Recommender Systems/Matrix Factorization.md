---
title: Matrix Factorization
source: Practical Recommender Systems
source_chapter: 11
---
**Matrix factorization** represents users and items as vectors in a latent factor space. The model learns hidden dimensions such as genre preference, seriousness, popularity, or other factors that may not have explicit names.

## Basic model

Given a user vector `p_u` and item vector `q_i`, predict a rating by dot product:

$$
\hat{r}_{ui} = p_u \cdot q_i
$$

With biases:

$$
\hat{r}_{ui} = \mu + b_u + b_i + p_u \cdot q_i
$$

## SVD idea

Singular Value Decomposition decomposes a matrix into factor matrices. For recommender systems, the useful idea is dimensionality reduction: approximate the sparse rating matrix with lower-dimensional user and item factors.

Classic SVD expects a dense matrix, so missing ratings must be handled carefully. Practical recommender implementations often learn factors directly from observed interactions.

See [[Singular Value Decomposition Recommenders]] for classical SVD and [[Funk SVD]] for direct factor learning.

## Funk SVD / gradient descent

Funk SVD learns user and item factors by minimizing prediction error on known ratings.

```csharp
public sealed class MatrixFactorModel
{
    public double GlobalMean { get; init; }
    public Dictionary<string, double[]> UserFactors { get; } = [];
    public Dictionary<string, double[]> ItemFactors { get; } = [];
    public Dictionary<string, double> UserBiases { get; } = [];
    public Dictionary<string, double> ItemBiases { get; } = [];

    public double Predict(string userId, string itemId)
    {
        var user = UserFactors[userId];
        var item = ItemFactors[itemId];
        var dot = 0.0;

        for (var i = 0; i < user.Length; i++)
        {
            dot += user[i] * item[i];
        }

        return GlobalMean
            + UserBiases.GetValueOrDefault(userId)
            + ItemBiases.GetValueOrDefault(itemId)
            + dot;
    }
}
```

## Training step sketch

```csharp
static void TrainOne(
    double[] user,
    double[] item,
    double error,
    double learningRate,
    double regularization)
{
    for (var factor = 0; factor < user.Length; factor++)
    {
        var userValue = user[factor];
        var itemValue = item[factor];

        user[factor] += learningRate * ((error * itemValue) - (regularization * userValue));
        item[factor] += learningRate * ((error * userValue) - (regularization * itemValue));
    }
}
```

## Rust example: factor model

```rust
use std::collections::HashMap;

struct MatrixFactorModel
{
    global_mean: f64,
    user_factors: HashMap<String, Vec<f64>>,
    item_factors: HashMap<String, Vec<f64>>,
    user_biases: HashMap<String, f64>,
    item_biases: HashMap<String, f64>,
}

impl MatrixFactorModel
{
    fn predict(&self, user_id: &str, item_id: &str) -> Option<f64>
    {
        let user = self.user_factors.get(user_id)?;
        let item = self.item_factors.get(item_id)?;
        let dot = user.iter().zip(item).map(|(left, right)| left * right).sum::<f64>();

        Some(
            self.global_mean
                + self.user_biases.get(user_id).copied().unwrap_or(0.0)
                + self.item_biases.get(item_id).copied().unwrap_or(0.0)
                + dot,
        )
    }
}
```

## Strengths

- Finds latent structure not encoded in metadata.
- Often stronger than neighborhood methods on enough data.
- Produces compact user and item embeddings.

## Weaknesses

- Harder to explain.
- Needs enough interactions.
- Requires tuning factors, learning rate, regularization, epochs, and negative sampling for implicit data.

## Related algorithms

- [[Neighborhood Collaborative Filtering]]
- [[Bayesian Personalized Ranking]]
- [[Hybrid Recommenders]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapter 11.
