---
title: Raised-Cosine Filter
---
A **raised-cosine filter** is a Nyquist pulse-shaping filter with a roll-off parameter that trades bandwidth for implementation tolerance.

## Mathematical description

Its frequency response is flat in the passband and rolls to zero over the transition band. In time, the pulse has zero crossings at integer symbol periods, which limits intersymbol interference.

## Code example

```csharp
static double RaisedCosineTap(double t, double symbolPeriod, double rolloff)
{
    var x = t / symbolPeriod;
    var denominator = 1.0 - Math.Pow(2.0 * rolloff * x, 2.0);
    var sinc = x == 0.0 ? 1.0 : Math.Sin(Math.PI * x) / (Math.PI * x);
    return sinc * Math.Cos(Math.PI * rolloff * x) / denominator;
}
```

## Related

- [[Pulse shaping]]
- [[Root-raised-cosine filter]]
- [[Gardner timing recovery]]

## Sources

- <https://en.wikipedia.org/wiki/Raised-cosine_filter>
- <https://dspguru.com/dsp/reference/raised-cosine-and-root-raised-cosine-formulas/>
