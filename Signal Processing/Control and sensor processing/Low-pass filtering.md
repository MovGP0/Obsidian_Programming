---
title: Low-pass filtering
---
**Low-pass filtering** is a signal-processing method used in control and sensor processing for this role: Sensor smoothing. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A discrete filter forms $y[n]=\sum_k h[k]x[n-k]$ in one dimension or $Y[i,j]=\sum_u\sum_v K[u,v]X[i-u,j-v]$ for images; kernel choice controls smoothing, edges, or phase.

## Code Example
```csharp
static double FirstOrderLowPass(double previous, double measurement, double cutoffHz, double dt)
{
    var rc = 1.0 / (2.0 * Math.PI * cutoffHz);
    var alpha = dt / (rc + dt);
    return previous + alpha * (measurement - previous);
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Complementary filter]]
- [[Sensor Kalman filter]]
- [[Dead reckoning]]
- [[Allan variance]]

## Sources
- [Wikipedia: Low-pass filtering](https://en.wikipedia.org/wiki/Low-pass_filter)
- [VectorNav: Inertial navigation primer](https://www.vectornav.com/resources/inertial-navigation-primer)
- [AHRS documentation](https://ahrs.readthedocs.io/en/latest/)
