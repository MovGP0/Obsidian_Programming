---
title: Short-Time Fourier Transform (STFT)
---
**Short-Time Fourier Transform (STFT)** applies a Fourier transform to overlapping windows of a signal. It describes how frequency content changes over time.

## Mathematical description

The STFT is $X(m,k)=\sum_n x[n]w[n-mH]e^{-j2\pi kn/N}$, where $w$ is the analysis window and $H$ is the hop size.

## C# example

```csharp
static List<double[]> StftMagnitudes(ReadOnlySpan<double> samples, int windowSize, int hopSize)
{
    var frames = new List<double[]>();

    for (var start = 0; start + windowSize <= samples.Length; start += hopSize)
    {
        var magnitudes = new double[windowSize];

        for (var k = 0; k < windowSize; k++)
        {
            var real = 0.0;
            var imag = 0.0;

            for (var n = 0; n < windowSize; n++)
            {
                var window = 0.5 - 0.5 * Math.Cos(2.0 * Math.PI * n / (windowSize - 1));
                var angle = -2.0 * Math.PI * k * n / windowSize;
                real += samples[start + n] * window * Math.Cos(angle);
                imag += samples[start + n] * window * Math.Sin(angle);
            }

            magnitudes[k] = Math.Sqrt(real * real + imag * imag);
        }

        frames.Add(magnitudes);
    }

    return frames;
}
```

## Related

- [[_Signal Processing]]
- [[Discrete Fourier Transform]]
- [[Wavelet Transform]]

## Sources

- [NumPy Fourier transform reference](https://numpy.org/doc/stable/reference/routines.fft.html)
- [SciPy FFT tutorial](https://docs.scipy.org/doc/scipy/tutorial/fft.html)