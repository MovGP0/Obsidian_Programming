---
title: Phase-Locked Loop (PLL)
---
A **phase-locked loop** (**PLL**) tracks the phase and frequency of an input signal with feedback. Digital PLLs appear in carrier recovery, clock recovery, and tone tracking.

## Mathematical description

A simple loop updates phase by $\hat{\theta}_{n+1}=\hat{\theta}_n+\hat{\omega}_n+K_p e_n$ and frequency by $\hat{\omega}_{n+1}=\hat{\omega}_n+K_i e_n$, where $e_n$ is the phase-detector error.

## Code example

```csharp
static void PllStep((double I, double Q) input, ref double phase, ref double frequency, double kp, double ki)
{
    var error = Math.Atan2(input.Q, input.I) - phase;
    frequency += ki * error;
    phase += frequency + kp * error;
}
```

## Related

- [[Costas loop]]
- [[Gardner timing recovery]]
- [[Early-late gate]]

## Sources

- <https://en.wikipedia.org/wiki/Phase-locked_loop>
- <https://www.dsprelated.com/freebooks/sasp/Phase_Locked_Loops.html>
