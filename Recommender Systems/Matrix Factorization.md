**Matrix factorization** represents users and items as vectors in a latent factor space. The model learns hidden dimensions such as genre preference, seriousness, popularity, or other factors that may not have explicit names.

## Basic model

Given a user vector `p_u` and item vector `q_i`, predict a rating by dot product:

```text
prediction(u, i) = p_u · q_i
```

With biases:

```text
prediction(u, i) = global_mean + user_bias_u + item_bias_i + p_u · q_i
```

## SVD idea

Singular Value Decomposition decomposes a matrix into factor matrices. For recommender systems, the useful idea is dimensionality reduction: approximate the sparse rating matrix with lower-dimensional user and item factors.

Classic SVD expects a dense matrix, so missing ratings must be handled carefully. Practical recommender implementations often learn factors directly from observed interactions.

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

## Strengths

- Finds latent structure not encoded in metadata.
- Often stronger than neighborhood methods on enough data.
- Produces compact user and item embeddings.

## Weaknesses

- Harder to explain.
- Needs enough interactions.
- Requires tuning factors, learning rate, regularization, epochs, and negative sampling for implicit data.

