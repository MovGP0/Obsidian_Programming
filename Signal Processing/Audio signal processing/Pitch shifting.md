---
title: Pitch Shifting
---
**Pitch shifting** changes perceived pitch without changing duration. Common methods use phase vocoders, granular processing, or time-domain overlap techniques.

## Mathematical description

A phase-vocoder pitch shifter often time-stretches by factor $r$ and then resamples by $r$ so duration returns to its original length while spectral peaks move.

## Code example

```csharp
static double PitchShiftSample(ReadOnlySpan<double> stretched, int outputIndex, double pitchRatio)
{
    var source = outputIndex * pitchRatio;
    var i = (int)Math.Floor(source);
    var mu = source - i;
    return (1.0 - mu) * stretched[i] + mu * stretched[i + 1];
}
```

## Related

- [[Time stretching]]
- [[Pitch detection]]
- [[Vocoder]]

## Sources

- <https://en.wikipedia.org/wiki/Pitch_shift>
- <https://en.wikipedia.org/wiki/Phase_vocoder>
