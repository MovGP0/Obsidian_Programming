---
title: Correlation Detector
---
**Correlation detector** detects a known pattern by measuring similarity between an input segment and a reference signal.

The statistic is an inner product or normalized correlation:

$$
\rho = \frac{\sum_n x[n]r[n]}{\sqrt{\sum_n x^2[n]}\sqrt{\sum_n r^2[n]}}.
$$

Normalization makes the score less sensitive to amplitude changes. The detection threshold is selected from the expected noise and false-alarm requirements.

```csharp
static bool CorrelationDetected(ReadOnlySpan<double> signal, ReadOnlySpan<double> reference, double threshold, out int offset)
{
    var result = DetectMatchedFilter(signal, reference);
    offset = result.Offset;
    return result.Score >= threshold;
}
```

## Related

- [[Matched filter detector]]
- [[Cross-correlation]]
- [[Phase correlation]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Cross-correlation](https://en.wikipedia.org/wiki/Cross-correlation)
- [SciPy correlate documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.correlate.html)

