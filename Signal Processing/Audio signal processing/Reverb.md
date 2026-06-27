---
title: Reverb
---
**Reverb** simulates acoustic reflections that persist after the direct sound. Algorithmic reverbs combine delays, feedback, diffusion, and filtering to create a room-like decay.

## Mathematical description

A convolution reverb computes $y[n]=\sum_k h[k]x[n-k]$ using an impulse response $h$. Algorithmic reverbs approximate the dense tail with feedback delay networks and all-pass diffusion.

## Code example

```csharp
static double SchroederComb(double input, double delayed, ref double dampingState, double feedback, double damping)
{
    dampingState += damping * (delayed - dampingState);
    return input + feedback * dampingState;
}
```

## Related

- [[Delay and echo]]
- [[Phaser]]
- [[Flanger]]

## Sources

- <https://en.wikipedia.org/wiki/Reverberation>
- <https://ccrma.stanford.edu/~jos/pasp/Artificial_Reverberation.html>
