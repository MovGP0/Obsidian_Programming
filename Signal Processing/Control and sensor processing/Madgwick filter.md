---
title: Madgwick filter
---
**Madgwick filter** is a signal-processing method used in control and sensor processing for this role: IMU orientation estimation. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A discrete filter forms $y[n]=\sum_k h[k]x[n-k]$ in one dimension or $Y[i,j]=\sum_u\sum_v K[u,v]X[i-u,j-v]$ for images; kernel choice controls smoothing, edges, or phase.

## Code Example
```csharp
static void MadgwickCorrect(ref double q0, ref double q1, ref double q2, ref double q3, double gx, double gy, double gz, double beta, double dt)
{
    q1 += 0.5 * gx * dt - beta * q1 * dt;
    q2 += 0.5 * gy * dt - beta * q2 * dt;
    q3 += 0.5 * gz * dt - beta * q3 * dt;
    var norm = Math.Sqrt(q0 * q0 + q1 * q1 + q2 * q2 + q3 * q3);
    q0 /= norm;
    q1 /= norm;
    q2 /= norm;
    q3 /= norm;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Low-pass filtering]]
- [[Complementary filter]]
- [[Sensor Kalman filter]]
- [[Dead reckoning]]

## Sources
- [Wikipedia: Madgwick filter](https://ahrs.readthedocs.io/en/latest/filters/madgwick.html)
- [VectorNav: Inertial navigation primer](https://www.vectornav.com/resources/inertial-navigation-primer)
- [AHRS documentation](https://ahrs.readthedocs.io/en/latest/)
