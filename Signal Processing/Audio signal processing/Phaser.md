---
title: Phaser
---
A **phaser** creates moving spectral notches by mixing the dry signal with a chain of modulated all-pass filters. Unlike a flanger, the notches are not uniformly spaced.

## Mathematical description

An all-pass stage has unit magnitude but frequency-dependent phase. Mixing $x[n]$ with the all-pass output causes cancellation where the phase difference approaches $\pi$.

## Code example

```csharp
public static double[] OnePoleAllPassMix(double[] input, double coefficient)
{
    var output = new double[input.Length];
    var state = 0.0;
    for (var i = 0; i < input.Length; i++)
    {
        var allPass = -coefficient * input[i] + state;
        state = input[i] + coefficient * allPass;
        output[i] = 0.5 * (input[i] + allPass);
    }
    return output;
}
```

## Related

- [[Flanger]]
- [[Equalizer]]
- [[Chorus]]

## Sources

- <https://en.wikipedia.org/wiki/Phaser_(effect%29)>
- <https://ccrma.stanford.edu/~jos/pasp/Phasing_First_Order_Allpass_Filters.html>
