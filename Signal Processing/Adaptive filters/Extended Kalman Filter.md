---
title: Extended Kalman Filter (EKF)
---
**Extended Kalman Filter** (**EKF**) adapts the [[Kalman Filter]] to nonlinear systems. It is used when the state evolves through a nonlinear function, the sensor measures a nonlinear function of the state, or both.

The EKF keeps the Kalman filter's prediction-correction structure, but it linearizes the nonlinear model at the current estimate. That local linear approximation is good when the uncertainty is small enough that the nonlinear function behaves almost like a line around the estimate.

Typical uses include robot localization, radar tracking with range-bearing measurements, battery state-of-charge estimation, and sensor fusion for navigation.

## Mathematical description

The nonlinear process and measurement models are

$$
\mathbf{x}_k = f(\mathbf{x}_{k-1}, \mathbf{u}_k) + \mathbf{w}_k,
$$

$$
\mathbf{z}_k = h(\mathbf{x}_k) + \mathbf{v}_k.
$$

The EKF predicts the state by evaluating the nonlinear process model:

$$
\hat{\mathbf{x}}_{k|k-1} = f(\hat{\mathbf{x}}_{k-1|k-1}, \mathbf{u}_k).
$$

For covariance, it uses the Jacobian of the process model:

$$
\mathbf{F}_k = \left.\frac{\partial f}{\partial \mathbf{x}}\right|_{\hat{\mathbf{x}}_{k-1|k-1}}.
$$

The predicted covariance is

$$
\mathbf{P}_{k|k-1} = \mathbf{F}_k\mathbf{P}_{k-1|k-1}\mathbf{F}_k^T + \mathbf{Q}.
$$

During correction, the measurement prediction is $\hat{\mathbf{z}}_k = h(\hat{\mathbf{x}}_{k|k-1})$. The measurement Jacobian is

$$
\mathbf{H}_k = \left.\frac{\partial h}{\partial \mathbf{x}}\right|_{\hat{\mathbf{x}}_{k|k-1}}.
$$

The innovation is $\mathbf{z}_k - \hat{\mathbf{z}}_k$, and the Kalman gain is computed with $\mathbf{H}_k$ just as the linear filter uses $\mathbf{H}$.

Important variables:

- `StateEstimate`: the current best estimate $\hat{x}$.
- `EstimateVariance`: the scalar covariance $P$ in this simplified example.
- `MeasurementFunction`: nonlinear function $h(x)$ that predicts the sensor reading.
- `MeasurementSlope`: derivative $dh/dx$ evaluated at the current estimate.
- `MeasurementNoiseVariance`: measurement covariance $R$.

## C# example

This scalar EKF correction updates a nonlinear measurement. For example, the hidden state could be distance and the sensor could report squared distance. The code uses descriptive names instead of matrix notation so the EKF roles are visible.

```csharp
public sealed class ScalarExtendedKalmanFilter
{
    public double StateEstimate { get; private set; }
    public double EstimateVariance { get; private set; } = 1.0;

    public void Predict(Func<double, double> processModel, double processSlope, double processNoiseVariance)
    {
        StateEstimate = processModel(StateEstimate);
        EstimateVariance = processSlope * EstimateVariance * processSlope + processNoiseVariance;
    }

    public double Correct(
        double measurement,
        Func<double, double> measurementFunction,
        double measurementSlope,
        double measurementNoiseVariance)
    {
        var predictedMeasurement = measurementFunction(StateEstimate);
        var innovation = measurement - predictedMeasurement;
        var innovationVariance = measurementSlope * EstimateVariance * measurementSlope
            + measurementNoiseVariance;
        var kalmanGain = EstimateVariance * measurementSlope / innovationVariance;

        StateEstimate += kalmanGain * innovation;
        EstimateVariance *= 1.0 - kalmanGain * measurementSlope;

        return StateEstimate;
    }
}
```

The scalar form hides the matrix multiplications, but it keeps the defining EKF step: evaluate nonlinear functions for the estimate and use derivatives for uncertainty propagation.

## Related

- [[Kalman Filter]]
- [[Unscented Kalman Filter]]
- [[Particle Filter]]
- [[Sensor Extended Kalman filter]]

## Sources

- [KalmanFilter.net](https://www.kalmanfilter.net/)
- [Kalman filter one-dimensional example](https://www.kalmanfilter.net/kalman1d.html)
