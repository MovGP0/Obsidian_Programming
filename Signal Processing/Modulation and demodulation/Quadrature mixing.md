---
title: Quadrature Mixing
---
**Quadrature mixing** translates a real signal between frequency bands by multiplying it with sine and cosine local oscillators. It is the core operation behind IQ receivers and transmitters.

## Mathematical description

With local oscillator frequency $\omega_0$, the branches are $I(t)=x(t)\cos(\omega_0 t)$ and $Q(t)=-x(t)\sin(\omega_0 t)$. Low-pass filtering removes the image at twice the oscillator frequency.

## Code example

```csharp
static (double I, double Q) QuadratureMix(double rfSample, double oscillatorPhase)
{
    var i = rfSample * Math.Cos(oscillatorPhase);
    var q = -rfSample * Math.Sin(oscillatorPhase);
    return (i, q);
}
```

## Related

- [[IQ modulation and demodulation]]
- [[Digital downconversion]]
- [[Digital upconversion]]

## Sources

- <https://en.wikipedia.org/wiki/Frequency_mixer>
- <https://en.wikipedia.org/wiki/Direct-conversion_receiver>
- <https://ccrma.stanford.edu/~jos/>
- <https://www.dsprelated.com/freebooks/>
