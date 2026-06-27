---
title: Parametric EQ
---
A **parametric EQ** uses tunable center frequency, gain, and bandwidth or Q. It gives more precise tone shaping than fixed-band graphic equalizers.

## Mathematical description

A peaking biquad changes gain near center frequency $\omega_0$ with quality factor $Q$. Its transfer function is $H(z)=(b_0+b_1z^{-1}+b_2z^{-2})/(a_0+a_1z^{-1}+a_2z^{-2})$.

## Code example

```csharp
static (double B0, double B1, double B2, double A1, double A2) PeakingEq(double frequencyHz, double q, double gainDb, double sampleRate)
{
    var a = Math.Pow(10.0, gainDb / 40.0);
    var omega = 2.0 * Math.PI * frequencyHz / sampleRate;
    var alpha = Math.Sin(omega) / (2.0 * q);
    var cos = Math.Cos(omega);
    var a0 = 1.0 + alpha / a;
    return ((1.0 + alpha * a) / a0, -2.0 * cos / a0, (1.0 - alpha * a) / a0, -2.0 * cos / a0, (1.0 - alpha / a) / a0);
}
```

## Related

- [[Equalizer]]
- [[Graphic EQ]]
- [[Phaser]]

## Sources

- <https://en.wikipedia.org/wiki/Equalization_(audio%29)#Parametric_equalizer>
- <https://webaudio.github.io/Audio-EQ-Cookbook/audio-eq-cookbook.html>
