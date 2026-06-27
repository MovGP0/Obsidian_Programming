---
title: Outlier rejection
---
**Outlier rejection** is a signal-processing method used in control and sensor processing for this role: Remove bad samples. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Robust rejection compares residuals to a threshold such as $|x-\operatorname{median}(x)| > k\cdot1.4826\operatorname{MAD}$ or gates measurements by normalized innovation squared.

## Code Example
```csharp
static bool AcceptMeasurement(double measurement, double median, double mad, double threshold)
{
    var normalizedDeviation = Math.Abs(measurement - median) / Math.Max(1.4826 * mad, 1.0e-12);
    return normalizedDeviation <= threshold;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Low-pass filtering]]
- [[Complementary filter]]
- [[Sensor Kalman filter]]
- [[Dead reckoning]]

## Sources
- [Wikipedia: Outlier rejection](https://en.wikipedia.org/wiki/Outlier)
- [VectorNav: Inertial navigation primer](https://www.vectornav.com/resources/inertial-navigation-primer)
- [AHRS documentation](https://ahrs.readthedocs.io/en/latest/)
