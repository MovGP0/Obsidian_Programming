---
title: Butterworth Filter
---
**Butterworth Filter** is an IIR filter family with a maximally flat passband. It trades transition steepness for smooth magnitude behavior.

## Mathematical description

The analog low-pass magnitude squared response is $|H(j\Omega)|^2=\frac{1}{1+(\Omega/\Omega_c)^{2N}}$. Digital filters are usually produced by mapping the analog prototype with a bilinear transform.

## C# example

```csharp
static (double B0, double B1, double B2, double A1, double A2) ButterworthLowPass(double cutoffHz, double sampleRate)
{
    var omega = 2.0 * Math.PI * cutoffHz / sampleRate;
    var cos = Math.Cos(omega);
    var sin = Math.Sin(omega);
    var q = 1.0 / Math.Sqrt(2.0);
    var alpha = sin / (2.0 * q);
    var a0 = 1.0 + alpha;

    return ((1.0 - cos) / (2.0 * a0), (1.0 - cos) / a0, (1.0 - cos) / (2.0 * a0), -2.0 * cos / a0, (1.0 - alpha) / a0);
}
```

## Related

- [[_Signal Processing]]
- [[Infinite Impulse Response Filter]]
- [[Chebyshev Type I Filter]]

## Sources

- [MIT OpenCourseWare digital Butterworth filters](https://ocw.mit.edu/courses/res-6-008-digital-signal-processing-spring-2011/resources/lecture-16-digital-butterworth-filters/)