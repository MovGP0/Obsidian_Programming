---
title: Sensor calibration
---
**Sensor calibration** is a signal-processing method used in control and sensor processing for this role: Bias/scale correction. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A calibrated sensor model often uses $y=S(x-b)$, where $b$ removes offset and matrix $S$ corrects scale and cross-axis errors from known reference observations.

## Code Example
```csharp
static (double X, double Y, double Z) CalibrateSensor(
    (double X, double Y, double Z) raw,
    (double X, double Y, double Z) bias,
    (double X, double Y, double Z) scale)
{
    return ((raw.X - bias.X) * scale.X, (raw.Y - bias.Y) * scale.Y, (raw.Z - bias.Z) * scale.Z);
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Low-pass filtering]]
- [[Complementary filter]]
- [[Sensor Kalman filter]]
- [[Dead reckoning]]

## Sources
- [Wikipedia: Sensor calibration](https://en.wikipedia.org/wiki/Calibration)
- [VectorNav: Inertial navigation primer](https://www.vectornav.com/resources/inertial-navigation-primer)
- [AHRS documentation](https://ahrs.readthedocs.io/en/latest/)
