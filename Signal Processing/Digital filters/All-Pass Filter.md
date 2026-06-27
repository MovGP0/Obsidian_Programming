---
title: All-Pass Filter
---
**All-Pass Filter** changes phase or group delay without changing magnitude response. It is used for phase equalization, fractional delay, and audio effects.

## Mathematical description

A first-order all-pass can be written $H(z)=\frac{a+z^{-1}}{1+a z^{-1}}$ with $|a|<1$. Its magnitude is one for all frequencies, while phase depends on $a$.

## C# example

```csharp
public sealed class FirstOrderAllPass
{
    private readonly double _a;
    private double _x1;
    private double _y1;

    public FirstOrderAllPass(double a)
    {
        _a = a;
    }

    public double Update(double x)
    {
        var y = -_a * x + _x1 + _a * _y1;
        _x1 = x;
        _y1 = y;
        return y;
    }
}
```

## Related

- [[_Signal Processing]]
- [[Bessel Filter]]
- [[Infinite Impulse Response Filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)
