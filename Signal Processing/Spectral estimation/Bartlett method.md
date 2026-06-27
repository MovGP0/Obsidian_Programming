---
title: Bartlett method
---
**Bartlett method** averages non-overlapping periodograms to reduce spectral-estimate variance.

Split $N$ samples into $M$ blocks of length $L$. For each block, compute a periodogram $P_m[k]$, then average:

$$
\hat{S}_{xx}[k] = \frac{1}{M}\sum_{m=0}^{M-1} P_m[k].
$$

Compared with [[Welch method]], Bartlett uses no overlap and often a rectangular window, so it is simpler but usually less statistically efficient.

```csharp
static double BartlettBin(ReadOnlySpan<double> samples, int blockLength, int bin)
{
    var total = 0.0;
    var blocks = samples.Length / blockLength;

    for (var block = 0; block < blocks; block++)
    {
        var real = 0.0;
        var imag = 0.0;

        for (var n = 0; n < blockLength; n++)
        {
            var angle = -2.0 * Math.PI * bin * n / blockLength;
            real += samples[block * blockLength + n] * Math.Cos(angle);
            imag += samples[block * blockLength + n] * Math.Sin(angle);
        }

        total += real * real + imag * imag;
    }

    return total / Math.Max(blocks, 1);
}
```

## Related

- [[Periodogram]]
- [[Welch method]]
- [[Multitaper method]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Bartlett's method](https://en.wikipedia.org/wiki/Bartlett%27s_method)
- [SciPy periodogram documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.periodogram.html)

