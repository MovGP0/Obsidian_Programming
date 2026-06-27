---
title: Energy Detector
---
**Energy detector** decides signal presence from accumulated signal power, often when the waveform shape is unknown.

For a block of $N$ samples, the test statistic is

$$
E = \sum_{n=0}^{N-1} |x[n]|^2.
$$

The detector compares $E$ with a threshold. It is simple and robust to unknown phase, but sensitive to noise-power uncertainty.

```csharp
static bool EnergyDetected(ReadOnlySpan<double> frame, double noisePower, double thresholdRatio, out double energy)
{
    energy = 0.0;

    foreach (var sample in frame)
    {
        energy += sample * sample;
    }

    energy /= frame.Length;
    return energy > noisePower * thresholdRatio;
}
```

## Related

- [[Threshold detector]]
- [[Matched filter detector]]
- [[Autocorrelation]]
- [[_Signal Processing]]

## Sources

- [PMC: Energy detection for spectrum sensing](https://pmc.ncbi.nlm.nih.gov/articles/PMC8141112/)
- [Wikipedia: Detection theory](https://en.wikipedia.org/wiki/Detection_theory)

