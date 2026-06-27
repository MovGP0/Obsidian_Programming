---
title: Extended Kalman filter
---
**Extended Kalman filter** is a signal-processing method used in control and sensor processing for this role: Nonlinear sensor fusion. It gives a compact operation that can be tuned from signal statistics and used as one stage in a larger DSP pipeline.

## Mathematical Description
A linear tracking step predicts $x_k = F x_{k-1} + B u_k$ and $P_k = F P_{k-1} F^T + Q$, then corrects with $K_k = P_k H^T (H P_k H^T + R)^{-1}$ and $x_k = x_k + K_k(z_k - Hx_k)$.

## Code Example
```csharp
static double SensorEkfUpdate(double x, ref double p, double z, Func<double, double> h, double hJacobian, double q, double r)
{
    p += q;
    var innovation = z - h(x);
    var s = hJacobian * p * hJacobian + r;
    var k = p * hJacobian / s;
    x += k * innovation;
    p *= 1.0 - k * hJacobian;
    return x;
}
```

## Related
- [[_Signal Processing|Signal Processing]]
- [[Low-pass filtering]]
- [[Complementary filter]]
- [[Sensor Kalman filter]]
- [[Dead reckoning]]

## Sources
- [Wikipedia: Extended Kalman filter](https://en.wikipedia.org/wiki/Extended_Kalman_filter)
- [VectorNav: Inertial navigation primer](https://www.vectornav.com/resources/inertial-navigation-primer)
- [AHRS documentation](https://ahrs.readthedocs.io/en/latest/)
