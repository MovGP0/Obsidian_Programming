---
title: Notch Filter
---
**Notch Filter** removes a narrow frequency band while passing nearby frequencies. It is commonly used for hum, interference tones, or mechanical resonances.

## Mathematical description

A second-order notch places zeros at $e^{\pm j\omega_0}$ and poles at $re^{\pm j\omega_0}$, with $0<r<1$. The pole radius controls notch width.

## C# example

```csharp
static (double B0, double B1, double B2, double A1, double A2) NotchBiquad(double frequencyHz, double sampleRate, double radius)
{
    var omega = 2.0 * Math.PI * frequencyHz / sampleRate;
    var cos = Math.Cos(omega);
    return (1.0, -2.0 * cos, 1.0, -2.0 * radius * cos, radius * radius);
}
```

## Related

- [[_Signal Processing]]
- [[Adaptive Notch Filter]]
- [[Infinite Impulse Response Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)