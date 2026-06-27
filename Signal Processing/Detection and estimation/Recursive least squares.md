---
title: Recursive Least Squares
---
**Recursive least squares** (**RLS**) updates least-squares model parameters online as each new sample arrives.

For regressor $x_n$, target $d_n$, estimate $w$, covariance $P$, and forgetting factor $\lambda$, the gain is

$$
k_n = \frac{P_{n-1}x_n}{\lambda + x_n^TP_{n-1}x_n}.
$$

Then $w_n = w_{n-1} + k_n(d_n - x_n^Tw_{n-1})$. RLS converges quickly but costs more than LMS-style methods.

```rust
fn rls_scalar(weight: f64, covariance: f64, x: f64, desired: f64, lambda: f64) -> (f64, f64) {
    let gain = covariance * x / (lambda + x * covariance * x);
    let error = desired - weight * x;
    let next_weight = weight + gain * error;
    let next_covariance = (covariance - gain * x * covariance) / lambda;

    (next_weight, next_covariance)
}
```

## Related

- [[Least squares estimation]]
- [[Maximum likelihood estimation]]
- [[Correlation detector]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Recursive least squares filter](https://en.wikipedia.org/wiki/Recursive_least_squares_filter)
- [Wikipedia: Least squares](https://en.wikipedia.org/wiki/Least_squares)

