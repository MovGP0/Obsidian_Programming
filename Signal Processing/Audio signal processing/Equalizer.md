---
title: Audio Equalizer
---
An **audio equalizer** changes spectral balance by boosting or cutting frequency regions. It may be implemented with shelving filters, peaking filters, or filter banks.

## Mathematical description

An equalizer applies a frequency response $H(e^{j\omega})$ chosen for tone shaping. In cascaded biquad form, $H(z)=\prod_i\frac{b_{0i}+b_{1i}z^{-1}+b_{2i}z^{-2}}{1+a_{1i}z^{-1}+a_{2i}z^{-2}}$.

## Code example

```csharp
public static double[] OnePoleTone(double[] input, double coefficient)
{
    var output = new double[input.Length];
    var low = 0.0;
    for (var i = 0; i < input.Length; i++)
    {
        low += coefficient * (input[i] - low);
        output[i] = input[i] - low;
    }
    return output;
}
```

## Related

- [[Graphic EQ]]
- [[Parametric EQ]]
- [[Phaser]]

## Sources

- <https://en.wikipedia.org/wiki/Equalization_(audio%29)>
- <https://webaudio.github.io/Audio-EQ-Cookbook/audio-eq-cookbook.html>
