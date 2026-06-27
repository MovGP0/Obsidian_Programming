---
title: Matched Filter Detector
---
**Matched filter detector** detects a known waveform in noise by correlating the input with a time-reversed copy of the expected signal.

For template $s[n]$, the matched-filter statistic is

$$
y[k] = \sum_n x[n]s[n-k].
$$

In additive white Gaussian noise, this maximizes output signal-to-noise ratio for the known signal shape.

```csharp
static (int Offset, double Score) DetectMatchedFilter(ReadOnlySpan<double> signal, ReadOnlySpan<double> template)
{
    var bestOffset = 0;
    var bestScore = double.NegativeInfinity;

    for (var offset = 0; offset <= signal.Length - template.Length; offset++)
    {
        var score = 0.0;
        for (var i = 0; i < template.Length; i++)
        {
            score += signal[offset + i] * template[template.Length - 1 - i];
        }

        if (score > bestScore)
        {
            bestScore = score;
            bestOffset = offset;
        }
    }

    return (bestOffset, bestScore);
}
```

## Related

- [[Correlation detector]]
- [[Cross-correlation]]
- [[Energy detector]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Matched filter](https://en.wikipedia.org/wiki/Matched_filter)
- [SciPy correlate documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.correlate.html)

