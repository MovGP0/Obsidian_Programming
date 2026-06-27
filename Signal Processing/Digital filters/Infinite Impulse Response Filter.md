---
title: Infinite Impulse Response Filter (IIR)
---
**Infinite Impulse Response Filter (IIR)** uses feedback, so a small number of coefficients can produce sharp frequency responses. Stability depends on pole locations.

## Mathematical description

The direct-form equation is $y[n]=\sum_{k=0}^{M}b_kx[n-k]-\sum_{k=1}^{N}a_ky[n-k]$. The impulse response can continue indefinitely because prior outputs feed future outputs.

## C# example

```csharp
public sealed class Biquad
{
    private readonly double _b0;
    private readonly double _b1;
    private readonly double _b2;
    private readonly double _a1;
    private readonly double _a2;
    private double _x1;
    private double _x2;
    private double _y1;
    private double _y2;

    public Biquad(double b0, double b1, double b2, double a1, double a2)
    {
        _b0 = b0;
        _b1 = b1;
        _b2 = b2;
        _a1 = a1;
        _a2 = a2;
    }

    public double Update(double x)
    {
        var y = _b0 * x + _b1 * _x1 + _b2 * _x2 - _a1 * _y1 - _a2 * _y2;
        _x2 = _x1;
        _x1 = x;
        _y2 = _y1;
        _y1 = y;
        return y;
    }
}
```

## Related

- [[_Signal Processing]]
- [[Butterworth Filter]]
- [[All-Pass Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)
