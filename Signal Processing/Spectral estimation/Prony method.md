---
title: Prony Method
---
**Prony method** fits a signal as a sum of damped complex exponentials.

The model is

$$
x[n] = \sum_{m=1}^{p} A_m z_m^n,
$$

where $z_m$ encodes damping and frequency. A prediction polynomial is estimated from samples; its roots give $z_m$, and amplitudes $A_m$ follow from a linear least-squares solve.

```csharp
static double PronyPredictionError(ReadOnlySpan<double> samples, ReadOnlySpan<double> prediction)
{
    var error = 0.0;

    for (var n = prediction.Length; n < samples.Length; n++)
    {
        var predicted = 0.0;
        for (var k = 0; k < prediction.Length; k++)
        {
            predicted -= prediction[k] * samples[n - k - 1];
        }

        error += Math.Pow(samples[n] - predicted, 2.0);
    }

    return error;
}
```

## Related

- [[AR spectral estimation]]
- [[MUSIC]]
- [[ESPRIT]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Prony's method](https://en.wikipedia.org/wiki/Prony%27s_method)
- [DSPRelated: Prony's Method](https://www.dsprelated.com/freebooks/filters/Prony_s_Method.html)

