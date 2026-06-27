---
title: Mahony filter
---
**Mahony filter** is a signal-processing method used in control and sensor processing for this role: IMU orientation estimation. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A discrete filter forms $y[n]=\sum_k h[k]x[n-k]$ in one dimension or $Y[i,j]=\sum_u\sum_v K[u,v]X[i-u,j-v]$ for images; kernel choice controls smoothing, edges, or phase.

## Code Example
```csharp
static void MahonyFeedback(double errorX, double errorY, double errorZ, ref double biasX, ref double biasY, ref double biasZ, double kp, double ki, double dt)
{
    biasX += ki * errorX * dt;
    biasY += ki * errorY * dt;
    biasZ += ki * errorZ * dt;
    var correctedGyroX = kp * errorX + biasX;
    _ = correctedGyroX + kp * errorY + biasY + kp * errorZ + biasZ;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Low-pass filtering]]
- [[Complementary filter]]
- [[Sensor Kalman filter]]
- [[Dead reckoning]]

## Sources
- [Wikipedia: Mahony filter](https://en.wikipedia.org/wiki/Attitude_control)
- [VectorNav: Inertial navigation primer](https://www.vectornav.com/resources/inertial-navigation-primer)
- [AHRS documentation](https://ahrs.readthedocs.io/en/latest/)
