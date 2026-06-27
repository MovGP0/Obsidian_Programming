---
title: Least Mean Squares (LMS)
---
**Least Mean Squares** (**LMS**) is an adaptive-filter algorithm that learns filter coefficients from streaming data. It is commonly used for echo cancellation, active noise control, channel equalization, and system identification when the desired output is known or can be estimated.

LMS is attractive because it is simple: run a FIR filter, measure the error, and move each coefficient a small amount in the direction that would have reduced that error. The tradeoff is convergence speed. A small step size is stable but slow; a large step size adapts quickly but can diverge.

## Mathematical description

Let $\mathbf{x}[n]$ be the input vector containing the current and delayed samples, and let $\mathbf{w}[n]$ be the adaptive filter weights. The filter output is

$$
y[n] = \mathbf{w}^T[n]\mathbf{x}[n].
$$

Given the desired signal $d[n]$, the instantaneous error is

$$
e[n] = d[n] - y[n].
$$

LMS updates the weights by

$$
\mathbf{w}[n+1] = \mathbf{w}[n] + \mu e[n]\mathbf{x}[n],
$$

where $\mu$ is the step size. The update is a stochastic-gradient approximation to minimizing mean squared error $E\{e^2[n]\}$.

Important variables:

- `inputVector`: delayed input samples $\mathbf{x}[n]$.
- `weights`: adaptive coefficients $\mathbf{w}[n]$.
- `desiredSample`: target signal $d[n]$.
- `stepSize`: adaptation rate $\mu$.

## C# example

```csharp
static double UpdateLmsFilter(
    ReadOnlySpan<double> inputVector,
    double desiredSample,
    Span<double> weights,
    double stepSize)
{
    var filterOutput = 0.0;

    for (var tap = 0; tap < weights.Length; tap++)
    {
        filterOutput += weights[tap] * inputVector[tap];
    }

    var error = desiredSample - filterOutput;

    for (var tap = 0; tap < weights.Length; tap++)
    {
        weights[tap] += stepSize * error * inputVector[tap];
    }

    return error;
}
```

The method returns the error because many adaptive-filter systems monitor it to decide whether the filter has converged.

## Practical notes

LMS works best when the input signal is persistently exciting, meaning the input contains enough variation to identify the filter coefficients. If the input is nearly constant or silent, the algorithm has little information and may update in an unhelpful direction.

The step size is the main stability control. If the weights oscillate or the error grows, reduce `stepSize`. If convergence is correct but too slow, increase it carefully or switch to [[Normalized Least Mean Squares]], which compensates for changing input power.

## Common mistakes

Do not interpret a single low error sample as convergence. LMS error is noisy because each update uses one instantaneous gradient estimate. Look at error power over a window.

Also avoid using LMS when the desired signal is not aligned with the input vector. Even a one-sample delay error can make the algorithm learn the wrong impulse response.

## Related

- [[Normalized Least Mean Squares]]
- [[Recursive Least Squares]]
- [[Adaptive Notch Filter]]
- [[Finite Impulse Response Filter]]

## Sources

- [Adaptive filter overview](https://en.wikipedia.org/wiki/Adaptive_filter)
- [Pyroomacoustics adaptive filtering documentation](https://pyroomacoustics.readthedocs.io/en/pypi-release/pyroomacoustics.adaptive.html)
