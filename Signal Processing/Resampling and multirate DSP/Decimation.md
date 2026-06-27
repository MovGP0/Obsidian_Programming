---
title: Decimation
---
**Decimation** lowers a discrete signal's sample rate by keeping every $M$-th sample after anti-alias filtering.

The basic operation is

$$
y[n] = v[nM],
$$

where $v[n]$ is $x[n]$ low-pass filtered below the new Nyquist limit $f_s/(2M)$. Filtering before downsampling prevents high-frequency content from folding into the retained band.

```csharp
static double DecimatedFirOutput(ReadOnlySpan<double> input, ReadOnlySpan<double> taps, int factor, int outputIndex)
{
    var inputCenter = outputIndex * factor;
    var sum = 0.0;

    for (var tap = 0; tap < taps.Length; tap++)
    {
        var sample = inputCenter - tap;
        if ((uint)sample < input.Length)
        {
            sum += input[sample] * taps[tap];
        }
    }

    return sum;
}
```

## Related

- [[Interpolation]]
- [[Rational resampling]]
- [[CIC decimator-interpolator]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Decimation](https://en.wikipedia.org/wiki/Decimation_%28signal_processing%29)
- [SciPy decimate documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.decimate.html)

