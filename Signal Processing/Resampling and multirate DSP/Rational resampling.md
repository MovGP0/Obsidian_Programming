---
title: Rational Resampling
---
**Rational resampling** converts a sample rate by a rational factor $L/M$ using interpolation, filtering, and decimation.

The conceptual chain is

$$
x[n] \xrightarrow{\uparrow L} u[n] \xrightarrow{h[n]} v[n] \xrightarrow{\downarrow M} y[n].
$$

The filter cutoff must protect both the upsampled images and the downsampled aliasing boundary. Practical implementations usually combine the phases into a polyphase filter bank.

```csharp
static double UpFirDnOutput(ReadOnlySpan<double> input, ReadOnlySpan<double> taps, int interpolation, int decimation, int outputIndex)
{
    var phase = (outputIndex * decimation) % interpolation;
    var center = outputIndex * decimation / interpolation;
    var sum = 0.0;

    for (var tap = phase; tap < taps.Length; tap += interpolation)
    {
        var sample = center - tap / interpolation;
        if ((uint)sample < input.Length)
        {
            sum += input[sample] * taps[tap];
        }
    }

    return sum;
}
```

## Related

- [[Decimation]]
- [[Interpolation]]
- [[Polyphase resampling]]
- [[_Signal Processing]]

## Sources

- [SciPy resample_poly documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.resample_poly.html)
- [Wikipedia: Sample-rate conversion](https://en.wikipedia.org/wiki/Sample-rate_conversion)

