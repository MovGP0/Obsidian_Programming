---
title: Welch method
---
**Welch method** reduces periodogram variance by averaging spectra from overlapping, windowed signal segments.

For segment $m$ with window $w[n]$, the segment spectrum is

$$
P_m[k] = \frac{1}{U f_s}\left|\sum_{n=0}^{L-1} w[n]x_m[n]e^{-j2\pi kn/L}\right|^2,
$$

where $U = \sum_n w^2[n]$. The Welch estimate is $\hat{S}_{xx}[k] = \frac{1}{M}\sum_m P_m[k]$. Overlap improves data use, while averaging trades frequency resolution for lower variance.

```csharp
static double WelchBin(ReadOnlySpan<double> samples, int segmentLength, int hop, int bin)
{
    var total = 0.0;
    var segments = 0;

    for (var start = 0; start + segmentLength <= samples.Length; start += hop)
    {
        var real = 0.0;
        var imag = 0.0;
        var windowPower = 0.0;

        for (var n = 0; n < segmentLength; n++)
        {
            var window = 0.5 - 0.5 * Math.Cos(2.0 * Math.PI * n / (segmentLength - 1));
            var angle = -2.0 * Math.PI * bin * n / segmentLength;
            real += samples[start + n] * window * Math.Cos(angle);
            imag += samples[start + n] * window * Math.Sin(angle);
            windowPower += window * window;
        }

        total += (real * real + imag * imag) / windowPower;
        segments++;
    }

    return total / Math.Max(segments, 1);
}
```

## Related

- [[Periodogram]]
- [[Bartlett method]]
- [[Multitaper method]]
- [[_Signal Processing]]

## Sources

- [SciPy welch documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.welch.html)
- [Wikipedia: Welch's method](https://en.wikipedia.org/wiki/Welch%27s_method)

