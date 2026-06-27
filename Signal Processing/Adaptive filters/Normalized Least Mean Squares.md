---
title: Normalized Least Mean Squares (NLMS)
---
**Normalized Least Mean Squares** (**NLMS**) is a variant of [[Least Mean Squares]] that scales the coefficient update by the current input power. It solves a practical LMS problem: the same step size can be too small for quiet inputs and unstable for loud inputs.

NLMS is especially useful for acoustic echo cancellation and channel identification, where the input amplitude can change significantly over time. By dividing by input energy, the update becomes closer to a "constant fractional correction" rather than an absolute correction.

## Mathematical description

The LMS update is

$$
\mathbf{w}[n+1] = \mathbf{w}[n] + \mu e[n]\mathbf{x}[n].
$$

NLMS replaces the fixed step with a normalized one:

$$
\mathbf{w}[n+1] = \mathbf{w}[n] + \frac{\mu}{\epsilon + \mathbf{x}^T[n]\mathbf{x}[n]} e[n]\mathbf{x}[n].
$$

The small constant $\epsilon$ prevents division by zero when the input vector is silent. The parameter $\mu$ is usually chosen between $0$ and $2$ for the idealized algorithm, although real systems use more conservative values.

Important variables:

- `inputPower`: $\mathbf{x}^T\mathbf{x}$, the energy in the current delay-line vector.
- `regularization`: $\epsilon$, a small positive value.
- `normalizedStep`: the effective step size after input-power normalization.

## C# example

```csharp
static double UpdateNlmsFilter(
    ReadOnlySpan<double> inputVector,
    double desiredSample,
    Span<double> weights,
    double stepSize,
    double regularization = 1.0e-9)
{
    var filterOutput = 0.0;
    var inputPower = regularization;

    for (var tap = 0; tap < weights.Length; tap++)
    {
        filterOutput += weights[tap] * inputVector[tap];
        inputPower += inputVector[tap] * inputVector[tap];
    }

    var error = desiredSample - filterOutput;
    var normalizedStep = stepSize * error / inputPower;

    for (var tap = 0; tap < weights.Length; tap++)
    {
        weights[tap] += normalizedStep * inputVector[tap];
    }

    return error;
}
```

Compared with LMS, the only structural difference is `inputPower`. That small change makes the adaptation much less sensitive to changing signal level.

## Practical notes

NLMS is usually the safer first choice for acoustic echo cancellation because speech and music have large level changes. A loud input vector automatically gets a smaller effective update, while a quiet vector gets a larger one.

The `regularization` value is not just a numerical trick. In real systems it also controls how aggressively the filter adapts during silence. A larger value prevents sudden coefficient jumps when the input power is very small.

## Common mistakes

NLMS still needs a meaningful desired signal. Normalization improves stability, but it does not fix wrong alignment, double-talk in echo cancellation, or an input vector that is unrelated to the target.

Another common mistake is setting `stepSize` near the theoretical limit and assuming it is safe. Quantization, clipping, and nonstationary signals often require a smaller value.

## Related

- [[Least Mean Squares]]
- [[Recursive Least Squares]]
- [[Adaptive Notch Filter]]
- [[Echo cancellation]]

## Sources

- [Adaptive filter overview](https://en.wikipedia.org/wiki/Adaptive_filter)
- [Pyroomacoustics adaptive filtering documentation](https://pyroomacoustics.readthedocs.io/en/pypi-release/pyroomacoustics.adaptive.html)
