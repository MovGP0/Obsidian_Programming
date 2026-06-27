---
title: Costas Loop
---
A **Costas loop** is a carrier-recovery PLL for suppressed-carrier modulation such as BPSK and QPSK. It uses the baseband I and Q branches to estimate carrier phase error.

## Mathematical description

For BPSK, a common phase-error detector is $e[n]=I[n]Q[n]$. The loop filter drives a numerically controlled oscillator so that the received constellation rotates back onto the decision axes.

## Code example

```csharp
static void CostasBpskStep((double I, double Q) input, ref double phase, ref double frequency, double loopGain)
{
    var i = input.I * Math.Cos(phase) + input.Q * Math.Sin(phase);
    var q = input.Q * Math.Cos(phase) - input.I * Math.Sin(phase);
    var error = Math.Sign(i) * q;
    frequency += loopGain * error;
    phase += frequency;
}
```

## Related

- [[PLL]]
- [[IQ modulation and demodulation]]
- [[Viterbi algorithm]]

## Sources

- <https://en.wikipedia.org/wiki/Costas_loop>
- <https://wirelesspi.com/costas-loop-for-carrier-phase-synchronization/>
