---
title: Discrete Fourier Transform (DFT)
---
**Discrete Fourier Transform (DFT)** maps a finite sequence of samples into uniformly spaced complex frequency bins. It is the reference definition behind FFT implementations.

## Mathematical description

The DFT is $X[k] = \sum_{n=0}^{N-1}x[n]e^{-j2\pi kn/N}$. Each bin measures correlation with a complex sinusoid at normalized frequency $k/N$.

## C# example

```csharp
using System.Numerics;

public static Complex[] Dft(ReadOnlySpan<double> samples)
{
    var spectrum = new Complex[samples.Length];

    for (var k = 0; k < samples.Length; k++)
    {
        for (var n = 0; n < samples.Length; n++)
        {
            var angle = -2.0 * Math.PI * k * n / samples.Length;
            spectrum[k] += samples[n] * Complex.FromPolarCoordinates(1.0, angle);
        }
    }

    return spectrum;
}
```

## Related

- [[_Signal Processing]]
- [[Fast Fourier Transform]]
- [[Inverse Fast Fourier Transform]]

## Sources

- [NumPy Fourier transform reference](https://numpy.org/doc/stable/reference/routines.fft.html)
- [SciPy FFT tutorial](https://docs.scipy.org/doc/scipy/tutorial/fft.html)