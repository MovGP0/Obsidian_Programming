---
title: Sample-Rate Conversion
---
**Sample-rate conversion** changes a sampled signal from one sampling frequency to another while preserving the represented bandlimited waveform.

For an ideal bandlimited signal, reconstruction and resampling can be written as

$$
y[m] = \sum_n x[n]\operatorname{sinc}\left(\frac{m}{R} - n\right),
$$

where $R = f_\text{out}/f_\text{in}$. Real systems approximate this with finite impulse response filters, polyphase banks, or asynchronous fractional-delay structures.

```csharp
static double WindowedSincSample(ReadOnlySpan<double> samples, double sourceTime, int radius)
{
    var center = (int)Math.Floor(sourceTime);
    var sum = 0.0;
    var weight = 0.0;

    for (var i = center - radius; i <= center + radius; i++)
    {
        if ((uint)i >= samples.Length)
        {
            continue;
        }

        var x = sourceTime - i;
        var sinc = x == 0.0 ? 1.0 : Math.Sin(Math.PI * x) / (Math.PI * x);
        var window = 0.5 + 0.5 * Math.Cos(Math.PI * x / radius);
        sum += samples[i] * sinc * window;
        weight += sinc * window;
    }

    return sum / weight;
}
```

## Related

- [[Rational resampling]]
- [[Sinc interpolation]]
- [[Farrow structure]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Sample-rate conversion](https://en.wikipedia.org/wiki/Sample-rate_conversion)
- [SciPy resample documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.resample.html)

