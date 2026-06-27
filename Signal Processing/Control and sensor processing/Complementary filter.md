---
title: Complementary filter
---
**Complementary filter** is a signal-processing method used in control and sensor processing for this role: Sensor fusion. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A discrete filter forms $y[n]=\sum_k h[k]x[n-k]$ in one dimension or $Y[i,j]=\sum_u\sum_v K[u,v]X[i-u,j-v]$ for images; kernel choice controls smoothing, edges, or phase.

## Code Example
```csharp
static double ComplementaryAngle(double previousAngle, double gyroRate, double accelerometerAngle, double dt, double alpha)
{
    var gyroIntegrated = previousAngle + gyroRate * dt;
    return alpha * gyroIntegrated + (1.0 - alpha) * accelerometerAngle;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Low-pass filtering]]
- [[Sensor Kalman filter]]
- [[Dead reckoning]]
- [[Allan variance]]

## Sources
- [Wikipedia: Complementary filter](https://ahrs.readthedocs.io/en/latest/filters/complementary.html)
- [VectorNav: Inertial navigation primer](https://www.vectornav.com/resources/inertial-navigation-primer)
- [AHRS documentation](https://ahrs.readthedocs.io/en/latest/)
