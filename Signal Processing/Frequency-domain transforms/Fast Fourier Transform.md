---
title: Fast Fourier Transform (FFT)
---
**Fast Fourier Transform (FFT)** computes the DFT using factorization instead of direct summation. It is the standard practical transform for spectra, convolution, and filter banks.

## Mathematical description

Radix-2 FFT splits the DFT into even and odd subsequences: $X[k] = E[k] + W_N^k O[k]$ and $X[k+N/2] = E[k] - W_N^k O[k]$, where $W_N=e^{-j2\pi/N}$.

## C# example

```csharp
static void Radix2Fft(Span<(double Real, double Imag)> x)
{
    for (var size = 2; size <= x.Length; size *= 2)
    {
        var half = size / 2;
        var angleStep = -2.0 * Math.PI / size;

        for (var start = 0; start < x.Length; start += size)
        {
            for (var k = 0; k < half; k++)
            {
                var angle = angleStep * k;
                var wr = Math.Cos(angle);
                var wi = Math.Sin(angle);
                var even = x[start + k];
                var odd = x[start + k + half];
                var tr = wr * odd.Real - wi * odd.Imag;
                var ti = wr * odd.Imag + wi * odd.Real;

                x[start + k] = (even.Real + tr, even.Imag + ti);
                x[start + k + half] = (even.Real - tr, even.Imag - ti);
            }
        }
    }
}
```

## Related

- [[_Signal Processing]]
- [[Discrete Fourier Transform]]
- [[Inverse Fast Fourier Transform]]

## Sources

- [NumPy Fourier transform reference](https://numpy.org/doc/stable/reference/routines.fft.html)
- [SciPy FFT tutorial](https://docs.scipy.org/doc/scipy/tutorial/fft.html)