---
title: Recursive Least Squares (RLS)
---
**Recursive Least Squares** (**RLS**) is an adaptive-filter algorithm that updates filter coefficients by minimizing a weighted least-squares error over all past samples. It converges much faster than [[Least Mean Squares]], but it requires more computation and more state.

RLS is useful when the unknown system changes and fast tracking matters, such as channel equalization or system identification with short training periods. Its main cost is the inverse correlation matrix, which grows with the square of the number of taps.

## Mathematical description

For input vector $\mathbf{x}[n]$, desired sample $d[n]$, and weights $\mathbf{w}[n]$, RLS minimizes

$$
J[n] = \sum_{i=0}^{n} \lambda^{n-i}\left(d[i] - \mathbf{w}^T[n]\mathbf{x}[i]\right)^2.
$$

The forgetting factor $\lambda$ gives less weight to older samples. A value near $1$ remembers a long history; a smaller value tracks changes more quickly.

The standard update is

$$
\mathbf{k}[n] = \frac{\mathbf{P}[n-1]\mathbf{x}[n]}{\lambda + \mathbf{x}^T[n]\mathbf{P}[n-1]\mathbf{x}[n]},
$$

$$
e[n] = d[n] - \mathbf{w}^T[n-1]\mathbf{x}[n],
$$

$$
\mathbf{w}[n] = \mathbf{w}[n-1] + \mathbf{k}[n]e[n],
$$

where $\mathbf{P}$ is the inverse correlation matrix.

## C# example

This scalar version shows the RLS mechanics without matrix code. `inverseInputPower` is the one-dimensional version of $\mathbf{P}$.

```csharp
static double UpdateScalarRls(
    double inputSample,
    double desiredSample,
    ref double weight,
    ref double inverseInputPower,
    double forgettingFactor)
{
    var gain = inverseInputPower * inputSample
        / (forgettingFactor + inputSample * inverseInputPower * inputSample);

    var filterOutput = weight * inputSample;
    var error = desiredSample - filterOutput;

    weight += gain * error;
    inverseInputPower = (inverseInputPower - gain * inputSample * inverseInputPower)
        / forgettingFactor;

    return error;
}
```

For a multi-tap filter, `weight` becomes a vector and `inverseInputPower` becomes the matrix $\mathbf{P}$.

## Practical notes

RLS can converge in far fewer samples than LMS because it uses an estimate of the input correlation structure. That speed is valuable when the environment changes quickly, but it also makes numerical conditioning more important.

The forgetting factor controls memory. A value such as `0.99` remembers a long history and produces smooth estimates. A smaller value tracks changes faster, but it gives noisy measurements more influence and can make the coefficient estimate jitter.

## Common mistakes

RLS is sometimes chosen only because it is faster than LMS, but its covariance matrix must remain well conditioned. Poor initialization can make the early updates too aggressive.

Start with a diagonal inverse-correlation matrix whose scale reflects uncertainty. A large initial value means "learn quickly because the current weights are uncertain"; a smaller value means "change cautiously."

The output error is useful diagnostically. A falling error indicates that the filter is learning the unknown system; a sudden error increase can indicate that the system changed or that the forgetting factor is too close to one for the current conditions.

## Related

- [[Least Mean Squares]]
- [[Normalized Least Mean Squares]]
- [[Wiener Filter]]
- [[Echo cancellation]]

## Sources

- [Adaptive filter overview](https://en.wikipedia.org/wiki/Adaptive_filter)
- [Pyroomacoustics adaptive filtering documentation](https://pyroomacoustics.readthedocs.io/en/pypi-release/pyroomacoustics.adaptive.html)
