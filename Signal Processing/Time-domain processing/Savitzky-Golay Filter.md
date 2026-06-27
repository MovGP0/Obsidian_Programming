---
title: Savitzky-Golay Filter
---
**Savitzky-Golay Filter** smooths samples by fitting a low-degree polynomial over a moving window and evaluating the polynomial near the center. It is useful when peaks or derivatives must retain their shape.

## Mathematical description

For each window, solve a least-squares polynomial fit $p(t)$ and emit $y[n] = p(0)$ or a derivative $p^{(m)}(0)$. Fixed window and degree choices can be precomputed as FIR coefficients.

## C# example

```csharp
public static double SavitzkyGolay5Point(double x0, double x1, double x2, double x3, double x4)
{
    return (-3.0 * x0 + 12.0 * x1 + 17.0 * x2 + 12.0 * x3 - 3.0 * x4) / 35.0;
}
```

## Related

- [[_Signal Processing]]
- [[Moving Average Filter]]
- [[Differentiator]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)