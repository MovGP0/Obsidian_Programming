---
title: Graphic EQ
---
A **graphic EQ** exposes a fixed set of frequency bands, usually with slider gains. It is practical for broad correction because each band has a visible position on the frequency axis.

## Mathematical description

A graphic equalizer approximates a desired response by summing or cascading fixed-band filters: $y[n]=\sum_b g_b (h_b*x)[n]$ for band filters $h_b$ and gains $g_b$.

## Code example

```csharp
static double ApplyGraphicEqBand(double sample, double bandPassOutput, double gainDb)
{
    return sample + bandPassOutput * (Math.Pow(10.0, gainDb / 20.0) - 1.0);
}
```

## Related

- [[Equalizer]]
- [[Parametric EQ]]
- [[Phaser]]

## Sources

- <https://en.wikipedia.org/wiki/Equalization_(audio%29)#Graphic_equalizer>
- <https://webaudio.github.io/Audio-EQ-Cookbook/audio-eq-cookbook.html>
