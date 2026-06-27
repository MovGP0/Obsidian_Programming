---
title: Schmitt Trigger
---
**Schmitt Trigger** turns an analog-like signal into a binary state using separate rising and falling thresholds. The hysteresis prevents rapid toggling near one threshold.

## Mathematical description

The output switches high when $x[n] \ge T_h$ and switches low when $x[n] \le T_l$, where $T_l < T_h$. Between thresholds, the previous state is held.

## C# example

```csharp
public sealed class SchmittTrigger
{
    private readonly double _low;
    private readonly double _high;
    private bool _state;

    public SchmittTrigger(double low, double high)
    {
        _low = low;
        _high = high;
    }

    public bool Update(double sample)
    {
        if (sample >= _high)
        {
            _state = true;
        }
        else if (sample <= _low)
        {
            _state = false;
        }

        return _state;
    }
}
```

## Related

- [[_Signal Processing]]
- [[Zero-Crossing Detector]]
- [[Peak Detector]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)
