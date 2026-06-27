---
title: Adaptive Notch Filter
---
**Adaptive Notch Filter** removes a narrowband tone whose frequency can move over time. It is used when a fixed [[Notch Filter]] is not enough, for example when mains hum, motor vibration, acoustic feedback, or an interfering carrier drifts slowly.

The filter combines two ideas. The notch section suppresses one frequency, and an adaptation rule adjusts the notch frequency so the output power becomes smaller. In practice the adaptation must be slow enough that it follows the interfering tone without chasing the wanted broadband signal.

## Mathematical description

A second-order notch filter can place zeros on the unit circle at the estimated interference frequency $\omega_0$ and poles with radius $r$ just inside the unit circle:

$$
H(z) = \frac{1 - 2\cos(\omega_0)z^{-1} + z^{-2}}{1 - 2r\cos(\omega_0)z^{-1} + r^2z^{-2}}.
$$

The radius $r$ controls notch width. Values close to $1$ create a narrow notch; smaller values create a wider notch. An adaptive notch filter updates $\omega_0$ from an error criterion such as output power $y[n]^2$. The exact update rule varies, but the goal is the same: move the notch toward the tone that contributes most to the residual output.

Important variables:

- $x[n]$: current input sample.
- $y[n]$: filtered output sample.
- $\omega_0$: current notch frequency in radians per sample.
- $r$: pole radius, which controls notch bandwidth.
- $\mu$: adaptation step size.

## C# example

This example shows the core structure: compute notch coefficients from the current frequency estimate, filter one sample, then nudge the frequency estimate in the direction that reduces output power.

```csharp
public sealed class AdaptiveNotchFilter
{
    private readonly double _poleRadius;
    private readonly double _adaptationRate;
    private double _notchFrequencyRadians;
    private double _previousInput;
    private double _twoSamplesAgoInput;
    private double _previousOutput;
    private double _twoSamplesAgoOutput;

    public AdaptiveNotchFilter(double initialFrequencyRadians, double poleRadius, double adaptationRate)
    {
        _notchFrequencyRadians = initialFrequencyRadians;
        _poleRadius = poleRadius;
        _adaptationRate = adaptationRate;
    }

    public double Process(double inputSample)
    {
        var cosine = Math.Cos(_notchFrequencyRadians);
        var outputSample = inputSample
            - 2.0 * cosine * _previousInput
            + _twoSamplesAgoInput
            + 2.0 * _poleRadius * cosine * _previousOutput
            - _poleRadius * _poleRadius * _twoSamplesAgoOutput;

        var frequencyGradient = 2.0 * Math.Sin(_notchFrequencyRadians)
            * (_previousInput - _poleRadius * _previousOutput);
        _notchFrequencyRadians -= _adaptationRate * outputSample * frequencyGradient;

        _twoSamplesAgoInput = _previousInput;
        _previousInput = inputSample;
        _twoSamplesAgoOutput = _previousOutput;
        _previousOutput = outputSample;

        return outputSample;
    }
}
```

This is a minimal teaching implementation. Production designs usually constrain the frequency range, smooth the gradient estimate, and choose the adaptation rate from expected tone drift and signal-to-noise ratio.

## Practical notes

Use an adaptive notch filter only when the interference is narrowband. If the unwanted signal is broadband, a notch will remove too little noise while still damaging the wanted signal near the notch frequency. The two most important tuning choices are notch bandwidth and adaptation speed. A narrow notch preserves more of the desired signal but can miss a fast-moving tone. A wide notch is more forgiving but removes more useful spectrum.

The adaptation term should usually be bounded to a known frequency range. For example, a mains-hum canceller might only search near 50 Hz or 60 Hz and their expected drift range. Without such constraints the filter can lock onto a strong component of the wanted signal.

## Related

- [[Notch Filter]]
- [[Least Mean Squares]]
- [[Normalized Least Mean Squares]]
- [[_Signal Processing]]

## Sources

- [Adaptive filter overview](https://en.wikipedia.org/wiki/Adaptive_filter)
- [Pyroomacoustics adaptive filtering documentation](https://pyroomacoustics.readthedocs.io/en/pypi-release/pyroomacoustics.adaptive.html)
