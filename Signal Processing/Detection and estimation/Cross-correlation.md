---
title: Cross-Correlation
---
**Cross-correlation** measures similarity between two signals as a function of lag and is commonly used to estimate delay or alignment.

For real discrete signals,

$$
R_{xy}[\ell] = \sum_n x[n]y[n-\ell].
$$

The lag that maximizes $R_{xy}[\ell]$ is a delay estimate when the two signals contain the same event.

```csharp
static double CrossCorrelationAtLag(ReadOnlySpan<double> x, ReadOnlySpan<double> y, int lag)
{
    var sum = 0.0;

    for (var n = 0; n < x.Length; n++)
    {
        var m = n - lag;
        if ((uint)m < y.Length)
        {
            sum += x[n] * y[m];
        }
    }

    return sum;
}
```

## Related

- [[Correlation detector]]
- [[Autocorrelation]]
- [[Phase correlation]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Cross-correlation](https://en.wikipedia.org/wiki/Cross-correlation)
- [SciPy correlate documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.correlate.html)

