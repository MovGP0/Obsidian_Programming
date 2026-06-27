---
title: Vocoder
---
A **vocoder** transfers the spectral envelope of one signal, often speech, onto another carrier. Classic channel vocoders use band-pass analysis filters and envelope followers.

## Mathematical description

For bands $b$, the analysis signal produces envelopes $e_b[n]$. The output sums carrier bands shaped by those envelopes: $y[n]=\sum_b e_b[n](h_b*c)[n]$.

## Code example

```csharp
static double VocoderBand(double modulatorBand, double carrierBand, ref double envelope, double attack)
{
    envelope += attack * (Math.Abs(modulatorBand) - envelope);
    return envelope * carrierBand;
}
```

## Related

- [[Pitch detection]]
- [[Pitch shifting]]
- [[Equalizer]]

## Sources

- <https://en.wikipedia.org/wiki/Vocoder>
- <https://en.wikipedia.org/wiki/Vocoder>
