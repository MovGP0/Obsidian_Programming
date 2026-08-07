---
title: Funk SVD
source: Practical Recommender Systems
source_chapter: 11
---
**Funk SVD** is a matrix factorization algorithm for recommender systems. It learns user and item vectors directly from observed ratings. Despite its name, it does not calculate a classical [[Singular Value Decomposition Recommenders|SVD]] of the complete matrix.

## Prediction model

For user $u$ and item $i$:

$$
\hat r_{ui} = \mu + b_u + b_i + p_u^Tq_i
$$

The error for an observed rating is:

$$
e_{ui} = r_{ui} - \hat r_{ui}
$$

The model minimizes squared error with regularization:

$$
\sum_{(u,i)\in K}
\left(r_{ui}-\hat r_{ui}\right)^2
+ \lambda\left(\lVert p_u\rVert^2 + \lVert q_i\rVert^2 + b_u^2 + b_i^2\right)
$$

$K$ contains only observed user-item ratings.

## Stochastic gradient descent

For each observed rating, update the parameters in the direction that reduces error:

$$
p_u \leftarrow p_u + \gamma(e_{ui}q_i-\lambda p_u)
$$

$$
q_i \leftarrow q_i + \gamma(e_{ui}p_u-\lambda q_i)
$$

Apply equivalent updates to $b_u$ and $b_i$. Use the old $p_u$ value when both vector updates are calculated.

## Training process

1. Initialize factor vectors with small random values.
2. Shuffle the observed ratings.
3. Update factors and biases for each rating.
4. Measure error on validation data.
5. Stop when validation quality no longer improves.

The important parameters are factor count, learning rate, regularization, iteration count, and initialization scale.

## Rust example: one SGD update

```rust
fn dot(a: &[f64], b: &[f64]) -> f64
{
    a.iter().zip(b).map(|(left, right)| left * right).sum()
}

fn train_one(
    user: &mut [f64],
    item: &mut [f64],
    user_bias: &mut f64,
    item_bias: &mut f64,
    global_mean: f64,
    rating: f64,
    learning_rate: f64,
    regularization: f64,
)
{
    let prediction = global_mean + *user_bias + *item_bias + dot(user, item);
    let error = rating - prediction;

    *user_bias += learning_rate * (error - regularization * *user_bias);
    *item_bias += learning_rate * (error - regularization * *item_bias);

    for factor in 0..user.len()
    {
        let old_user = user[factor];
        let old_item = item[factor];
        user[factor] += learning_rate * (error * old_item - regularization * old_user);
        item[factor] += learning_rate * (error * old_user - regularization * old_item);
    }
}
```

## Strengths

- It does not need rating imputation.
- It learns compact latent factors.
- It scales through simple local updates.

## Limits

- It optimizes rating error, which can differ from ranking quality.
- Results depend on parameter tuning and initialization.
- New users and items have no learned vector.
- Implicit feedback needs a suitable objective or sampling method.

Use [[Bayesian Personalized Ranking]] when pairwise order from implicit feedback is the main target.

## Related algorithms

- [[Matrix Factorization]]
- [[Singular Value Decomposition Recommenders]]
- [[Evaluating Recommender Systems]]

## Source

- Kim Falk, *Practical Recommender Systems*, chapter 11, sections 11.5 to 11.8.
