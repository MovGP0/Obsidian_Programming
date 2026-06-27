---
title: Median Filter
---
**Median Filter** removes isolated spikes by replacing each sample with the median of a neighborhood. Unlike a mean filter, a median filter is nonlinear and resists outliers.

## Mathematical description

For a window $W_n = \{x[n-r], \dots, x[n+r]\}$, the output is $y[n] = \operatorname{median}(W_n)$. The operation preserves edges better than linear averaging when noise is impulsive.

## C# example

```csharp
public static double Median(ReadOnlySpan<double> window)
{
    var values = window.ToArray();
    Array.Sort(values);
    var middle = values.Length / 2;

    return values.Length % 2 == 0
        ? 0.5 * (values[middle - 1] + values[middle])
        : values[middle];
}
```

## Related

- [[_Signal Processing]]
- [[Moving Average Filter]]
- [[Peak Detector]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)