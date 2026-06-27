---
title: Maximum Likelihood Estimation
---
**Maximum likelihood estimation** (**MLE**) chooses parameters that make the observed data most probable under a statistical model.

For observations $x$ and parameters $\theta$, the estimate is

$$
\hat{\theta} = \arg\max_\theta L(\theta;x) = \arg\max_\theta p(x|\theta).
$$

It is usually easier to maximize the log-likelihood $\ell(\theta)=\log L(\theta;x)$. In signal processing, MLE appears in frequency, delay, channel, and noise-parameter estimation.

```csharp
static double EstimateNoiseVarianceMaximumLikelihood(ReadOnlySpan<double> residuals)
{
    var sumSquares = 0.0;

    foreach (var residual in residuals)
    {
        sumSquares += residual * residual;
    }

    return sumSquares / residuals.Length;
}
```

## Related

- [[Least squares estimation]]
- [[Recursive least squares]]
- [[Threshold detector]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Maximum likelihood estimation](https://en.wikipedia.org/wiki/Maximum_likelihood_estimation)
- [NIST: Maximum likelihood estimation](https://www.itl.nist.gov/div898/handbook/eda/section3/eda3652.htm)

