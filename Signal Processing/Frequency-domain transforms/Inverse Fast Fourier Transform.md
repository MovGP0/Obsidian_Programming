---
title: Inverse Fast Fourier Transform (IFFT)
---
**Inverse Fast Fourier Transform (IFFT)** reconstructs time-domain samples from complex frequency bins using the inverse DFT computed efficiently. It is used after spectral editing, OFDM demodulation, and convolution.

## Mathematical description

The inverse transform is $x[n] = \frac{1}{N}\sum_{k=0}^{N-1}X[k]e^{j2\pi kn/N}$. Implementations usually reuse the FFT with conjugation and scaling.

## C# example

```csharp
static void InverseFftViaConjugate(Span<(double Real, double Imag)> spectrum)
{
    for (var i = 0; i < spectrum.Length; i++)
    {
        spectrum[i] = (spectrum[i].Real, -spectrum[i].Imag);
    }

    Radix2Fft(spectrum);

    for (var i = 0; i < spectrum.Length; i++)
    {
        spectrum[i] = (spectrum[i].Real / spectrum.Length, -spectrum[i].Imag / spectrum.Length);
    }
}
```

## Related

- [[_Signal Processing]]
- [[Fast Fourier Transform]]
- [[Discrete Fourier Transform]]

## Sources

- [NumPy Fourier transform reference](https://numpy.org/doc/stable/reference/routines.fft.html)
- [SciPy FFT tutorial](https://docs.scipy.org/doc/scipy/tutorial/fft.html)