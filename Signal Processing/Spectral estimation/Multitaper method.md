---
title: Multitaper method
---
**Multitaper method** estimates a spectrum by applying several orthogonal tapers to the same data and averaging the resulting eigenspectra.

With tapers $v_p[n]$, each tapered periodogram is

$$
P_p[k] = \left|\sum_{n=0}^{N-1} v_p[n]x[n]e^{-j2\pi kn/N}\right|^2.
$$

The estimate $\hat{S}_{xx}[k] = \sum_p a_p P_p[k]$ reduces leakage and variance without cutting the record into many short segments. Discrete prolate spheroidal sequences are common tapers.

```csharp
static double MultitaperBin(ReadOnlySpan<double> samples, IReadOnlyList<double[]> tapers, ReadOnlySpan<double> weights, int bin)
{
    var estimate = 0.0;

    for (var t = 0; t < tapers.Count; t++)
    {
        var real = 0.0;
        var imag = 0.0;

        for (var n = 0; n < samples.Length; n++)
        {
            var angle = -2.0 * Math.PI * bin * n / samples.Length;
            real += samples[n] * tapers[t][n] * Math.Cos(angle);
            imag += samples[n] * tapers[t][n] * Math.Sin(angle);
        }

        estimate += weights[t] * (real * real + imag * imag);
    }

    return estimate;
}
```

## Related

- [[Periodogram]]
- [[Welch method]]
- [[Bartlett method]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Multitaper](https://en.wikipedia.org/wiki/Multitaper)
- [SciPy DPSS window documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.windows.dpss.html)

