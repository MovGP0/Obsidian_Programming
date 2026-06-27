---
title: Cascaded Integrator-Comb Filter (CIC)
---
**Cascaded Integrator-Comb Filter (CIC)** is a multiplier-free multirate filter built from integrator and comb sections. It is common in FPGA decimators and interpolators.

## Mathematical description

For rate change $R$, delay $M$, and order $N$, the response is $H(z)=\left(\frac{1-z^{-RM}}{1-z^{-1}}\right)^N$. It has sinc-like droop and periodic nulls.

## C# example

```csharp
static bool CicDecimatorStep(int input, Span<int> integrators, Span<int> combDelays, int rate, ref int phase, out int output)
{
    integrators[0] += input;

    for (var i = 1; i < integrators.Length; i++)
    {
        integrators[i] += integrators[i - 1];
    }

    phase = (phase + 1) % rate;
    output = 0;

    if (phase != 0)
    {
        return false;
    }

    output = integrators[^1];

    for (var i = 0; i < combDelays.Length; i++)
    {
        var delayed = combDelays[i];
        combDelays[i] = output;
        output -= delayed;
    }

    return true;
}
```

## Related

- [[_Signal Processing]]
- [[Comb Filter]]
- [[Polyphase filter]]

## Sources

- [SciPy signal processing reference](https://docs.scipy.org/doc/scipy/reference/signal.html)
- [The Scientist and Engineer's Guide to Digital Signal Processing](https://www.dspguide.com/pdfbook.htm)