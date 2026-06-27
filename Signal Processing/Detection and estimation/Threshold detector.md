---
title: Threshold Detector
---
**Threshold detector** decides whether a signal or event is present by comparing a statistic with a chosen threshold.

For statistic $T(x)$ and threshold $\gamma$, the decision rule is

$$
T(x) \mathop{\gtrless}_{H_0}^{H_1} \gamma.
$$

The threshold sets the tradeoff between probability of detection $P_D$ and probability of false alarm $P_{FA}$. Hysteresis or debouncing is often added for noisy real-time signals.

```csharp
static bool HysteresisThreshold(double statistic, double low, double high, bool previousState)
{
    if (statistic >= high)
    {
        return true;
    }

    if (statistic <= low)
    {
        return false;
    }

    return previousState;
}
```

## Related

- [[Energy detector]]
- [[Matched filter detector]]
- [[Correlation detector]]
- [[_Signal Processing]]

## Sources

- [Wikipedia: Detection theory](https://en.wikipedia.org/wiki/Detection_theory)
- [Wikipedia: Receiver operating characteristic](https://en.wikipedia.org/wiki/Receiver_operating_characteristic)

