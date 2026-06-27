---
title: Discrete Hartley Transform
---
**Discrete Hartley Transform** is a real-valued transform related to the DFT. It can be convenient when both input and output should stay real.

## Mathematical description

The DHT is $H[k]=\sum_{n=0}^{N-1}x[n]\operatorname{cas}(2\pi kn/N)$, where $\operatorname{cas}(\theta)=\cos\theta+\sin\theta$.

## C# example

```csharp
static double[] DiscreteHartleyTransform(ReadOnlySpan<double> samples)
{
    var output = new double[samples.Length];

    for (var k = 0; k < output.Length; k++)
    {
        for (var n = 0; n < samples.Length; n++)
        {
            var angle = 2.0 * Math.PI * k * n / samples.Length;
            output[k] += samples[n] * (Math.Cos(angle) + Math.Sin(angle));
        }
    }

    return output;
}
```

## Related

- [[_Signal Processing]]
- [[Discrete Fourier Transform]]
- [[Fast Fourier Transform]]

## Sources

- [NumPy Fourier transform reference](https://numpy.org/doc/stable/reference/routines.fft.html)
- [SciPy FFT tutorial](https://docs.scipy.org/doc/scipy/tutorial/fft.html)