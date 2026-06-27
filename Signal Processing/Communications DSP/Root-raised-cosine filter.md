---
title: Root-Raised-Cosine Filter
---
A **root-raised-cosine filter** (**RRC**) splits a raised-cosine response between transmitter and receiver. Cascading matched RRC filters gives the full raised-cosine Nyquist response.

## Mathematical description

If $H_{RC}(f)$ is the raised-cosine response, then an RRC filter has $H_{RRC}(f)=\sqrt{H_{RC}(f)}$. The receive RRC also maximizes SNR as a matched filter when the pulse is known.

## Code example

```csharp
static double RootRaisedCosineTap(double t, double symbolPeriod, double rolloff)
{
    if (Math.Abs(t) < 1.0e-12)
    {
        return 1.0 + rolloff * (4.0 / Math.PI - 1.0);
    }

    var x = t / symbolPeriod;
    var numerator = Math.Sin(Math.PI * x * (1.0 - rolloff)) + 4.0 * rolloff * x * Math.Cos(Math.PI * x * (1.0 + rolloff));
    var denominator = Math.PI * x * (1.0 - Math.Pow(4.0 * rolloff * x, 2.0));
    return numerator / denominator;
}
```

## Related

- [[Raised-cosine filter]]
- [[Pulse shaping]]
- [[Gardner timing recovery]]

## Sources

- <https://en.wikipedia.org/wiki/Root-raised-cosine_filter>
- <https://dspguru.com/dsp/reference/raised-cosine-and-root-raised-cosine-formulas/>
