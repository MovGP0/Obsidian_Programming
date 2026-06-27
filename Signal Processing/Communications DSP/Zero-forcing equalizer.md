---
title: Zero-Forcing Equalizer
---
A **zero-forcing equalizer** inverts the channel response to cancel intersymbol interference. It is simple but can amplify noise near channel spectral nulls.

## Mathematical description

In the frequency domain, $W(f)=1/H(f)$ so that $W(f)H(f)=1$. Practical designs limit or regularize the inverse when $|H(f)|$ is small.

## Code example

```csharp
static (double Real, double Imag) ZeroForceBin((double Real, double Imag) y, (double Real, double Imag) h)
{
    var denominator = h.Real * h.Real + h.Imag * h.Imag;
    return ((y.Real * h.Real + y.Imag * h.Imag) / denominator,
        (y.Imag * h.Real - y.Real * h.Imag) / denominator);
}
```

## Related

- [[MMSE equalizer]]
- [[Channel estimation]]
- [[Decision feedback equalizer]]

## Sources

- <https://en.wikipedia.org/wiki/Zero-forcing_equalizer>
- <https://en.wikipedia.org/wiki/Equalization_(communications%29)>
