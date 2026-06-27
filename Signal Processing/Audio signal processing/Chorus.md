---
title: Chorus
---
**Chorus** thickens a sound by mixing it with slightly delayed, slowly modulated copies. The modulation makes one source resemble several performers with small timing and pitch differences.

## Mathematical description

A basic chorus uses $y[n]=x[n]+g x[n-D[n]]$, where $D[n]=D_0+A\sin(2\pi f_m n/f_s)$ is a low-frequency modulated delay.

## Code example

```csharp
public static double[] ChorusDelaySamples(double[] input, double coefficient)
{
    var output = new double[input.Length];
    for (var n = 0; n < input.Length; n++)
    {
        var delay = 8 + (int)(4.0 * Math.Sin(2.0 * Math.PI * coefficient * n));
        output[n] = input[n] + (n >= delay ? 0.35 * input[n - delay] : 0.0);
    }
    return output;
}
```

## Related

- [[Delay and echo]]
- [[Flanger]]
- [[Pitch shifting]]

## Sources

- <https://en.wikipedia.org/wiki/Chorus_effect>
- <https://ccrma.stanford.edu/~jos/pasp/Time_Varying_Delay_Effects.html>
