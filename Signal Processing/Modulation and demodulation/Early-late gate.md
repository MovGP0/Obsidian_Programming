---
title: Early-Late Gate
---
The **early-late gate** is a timing synchronization detector that samples slightly before and after the expected symbol instant. The timing loop moves toward the side with larger matched-filter energy.

## Mathematical description

With early and late samples $y_E$ and $y_L$, an error detector is $e=|y_E|^2-|y_L|^2$. Positive and negative error values indicate opposite timing corrections.

## Code example

```csharp
static double EarlyLateTimingError(double earlyEnergy, double lateEnergy)
{
    return earlyEnergy - lateEnergy;
}
```

## Related

- [[Gardner timing recovery]]
- [[Mueller and Muller recovery]]
- [[Pulse shaping]]

## Sources

- <https://wirelesspi.com/early-late-bit-synchronizer-in-digital-communication/>
- <https://wirelesspi.com/early-late-bit-synchronizer-in-digital-communication/>
