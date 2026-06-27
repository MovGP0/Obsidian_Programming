---
title: BCJR Algorithm
---
The **BCJR algorithm** computes symbol posterior probabilities on a trellis. Unlike Viterbi decoding, it produces soft outputs that are useful for iterative decoders.

## Mathematical description

Forward metrics $\alpha_k(s)$, backward metrics $\beta_k(s)$, and branch metrics $\gamma_k(s,s_{next})$ are combined to estimate $P(a_k|y)$ by summing over trellis branches associated with each symbol.

## Code example

```csharp
static double BcjrLogLikelihoodRatio(double alpha0, double alpha1, double beta0, double beta1, double gammaOne, double gammaZero)
{
    var logOne = alpha1 + gammaOne + beta1;
    var logZero = alpha0 + gammaZero + beta0;
    return logOne - logZero;
}
```

## Related

- [[Viterbi algorithm]]
- [[Turbo decoding]]
- [[LDPC decoding]]

## Sources

- <https://en.wikipedia.org/wiki/BCJR_algorithm>
- <https://en.wikipedia.org/wiki/Forward%E2%80%93backward_algorithm>
