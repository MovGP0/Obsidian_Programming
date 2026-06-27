---
title: Dead reckoning
---
**Dead reckoning** is a signal-processing method used in control and sensor processing for this role: Position integration. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
Dead reckoning integrates motion increments, for example $p_k=p_{k-1}+R(q_k)a_k\Delta t^2/2+v_{k-1}\Delta t$, so bias and heading errors accumulate over time.

## Code Example
```csharp
static void DeadReckon1D(double acceleration, double dt, ref double velocity, ref double position)
{
    velocity += acceleration * dt;
    position += velocity * dt;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Low-pass filtering]]
- [[Complementary filter]]
- [[Sensor Kalman filter]]
- [[Allan variance]]

## Sources
- [Wikipedia: Dead reckoning](https://en.wikipedia.org/wiki/Dead_reckoning)
- [VectorNav: Inertial navigation primer](https://www.vectornav.com/resources/inertial-navigation-primer)
- [AHRS documentation](https://ahrs.readthedocs.io/en/latest/)
