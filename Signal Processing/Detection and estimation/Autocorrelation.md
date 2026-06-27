---
title: Autocorrelation
---
**Autocorrelation** measures how similar a signal is to a delayed version of itself.

For a finite real sequence,

$$
R_{xx}[\ell] = \sum_n x[n]x[n-\ell].
$$

Peaks away from zero lag indicate periodicity, echo spacing, or repeating structure. Autocorrelation also feeds autoregressive estimators such as [[Yule-Walker method]].

```csharp
static double[] AutocorrelationSeries(ReadOnlySpan<double> samples, int maxLag)
{
    var result = new double[maxLag + 1];

    for (var lag = 0; lag <= maxLag; lag++)
    {
        for (var n = lag; n < samples.Length; n++)
        {
            result[lag] += samples[n] * samples[n - lag];
        }

        result[lag] /= samples.Length - lag;
    }

    return result;
}
```

## Related

- [[Cross-correlation]]
- [[Yule-Walker method]]
- [[Energy detector]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Autocorrelation](https://en.wikipedia.org/wiki/Autocorrelation)
- [SciPy correlate documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.correlate.html)

