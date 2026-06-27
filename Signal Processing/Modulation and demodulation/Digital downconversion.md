---
title: Digital Downconversion
---
**Digital downconversion** (**DDC**) shifts sampled RF or IF data to baseband and reduces the sample rate after filtering. It is a standard front-end block in software-defined radios.

## Mathematical description

A DDC computes $z[n]=x[n]e^{-j2\pi f_0 n/f_s}$, low-pass filters $z[n]$, then decimates by $M$ when the filtered bandwidth permits it.

## Code example

```csharp
static (double I, double Q) DownconvertSample(double sample, double phase)
{
    return (sample * Math.Cos(phase), -sample * Math.Sin(phase));
}
```

## Related

- [[Quadrature mixing]]
- [[Digital upconversion]]
- [[IQ modulation and demodulation]]

## Sources

- <https://en.wikipedia.org/wiki/Digital_down_converter>
- <https://pysdr.org/content/sampling.html#digital-downconversion>
- <https://ccrma.stanford.edu/~jos/>
- <https://www.dsprelated.com/freebooks/>
