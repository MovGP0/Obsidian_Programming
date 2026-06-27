---
title: Flanger
---
A **flanger** mixes a signal with a very short modulated delay, producing moving comb-filter notches. Feedback increases the metallic sweep.

## Mathematical description

The delay form is $y[n]=x[n]+g x[n-D[n]]$ with $D[n]$ often below about 10 ms. The varying delay moves the comb-filter zeros through frequency.

## Code example

```csharp
public static double[] Flange(double[] input, double coefficient)
{
    var output = new double[input.Length];
    for (var n = 0; n < input.Length; n++)
    {
        var delay = 2 + (int)(2.0 * (1.0 + Math.Sin(2.0 * Math.PI * coefficient * n)));
        output[n] = input[n] + (n >= delay ? 0.7 * input[n - delay] : 0.0);
    }
    return output;
}
```

## Related

- [[Chorus]]
- [[Phaser]]
- [[Delay and echo]]

## Sources

- <https://en.wikipedia.org/wiki/Flanging>
- <https://ccrma.stanford.edu/~jos/pasp/Flanging.html>
