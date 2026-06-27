---
title: Digital Upconversion
---
**Digital upconversion** (**DUC**) interpolates a baseband signal, filters images, and mixes it to a higher digital IF or RF-centered band.

## Mathematical description

A DUC inserts $L-1$ zeros between samples, applies an interpolation filter, then computes $x[n]=\Re\{z[n]e^{j2\pi f_0 n/f_s}\}$ for a real output stream.

## Code example

```csharp
static double UpconvertIqSample(double i, double q, double phase)
{
    return i * Math.Cos(phase) - q * Math.Sin(phase);
}
```

## Related

- [[Digital downconversion]]
- [[Quadrature mixing]]
- [[IQ modulation and demodulation]]

## Sources

- <https://en.wikipedia.org/wiki/Digital_up_converter>
- <https://pysdr.org/content/sampling.html#direct-digital-synthesis>
- <https://ccrma.stanford.edu/~jos/>
- <https://www.dsprelated.com/freebooks/>
