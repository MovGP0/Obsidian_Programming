---
title: Least Squares Estimation
---
**Least squares estimation** fits model parameters by minimizing the sum of squared residuals.

For linear model $y = X\beta + \epsilon$, ordinary least squares solves

$$
\hat{\beta} = \arg\min_\beta \|y - X\beta\|_2^2.
$$

When $X^TX$ is nonsingular, $\hat{\beta}=(X^TX)^{-1}X^Ty$. In DSP it is used for calibration, curve fitting, channel estimation, and adaptive filtering.

```csharp
static (double Slope, double Intercept) FitLine(double[] x, double[] y)
{
    double sx = x.Sum();
    double sy = y.Sum();
    double sxx = x.Select(v => v * v).Sum();
    double sxy = x.Zip(y, (a, b) => a * b).Sum();
    double n = x.Length;
    double slope = (n * sxy - sx * sy) / (n * sxx - sx * sx);

    return (slope, (sy - slope * sx) / n);
}
```

## Related

- [[Maximum likelihood estimation]]
- [[Recursive least squares]]
- [[Correlation detector]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Least squares](https://en.wikipedia.org/wiki/Least_squares)
- [NIST: Least squares fitting](https://www.itl.nist.gov/div898/handbook/pmd/section4/pmd431.htm)

