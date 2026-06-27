---
title: Turbo Decoding
---
**Turbo decoding** iteratively exchanges soft information between component decoders. It enables error-correction performance close to the Shannon limit for many channel conditions.

## Mathematical description

Each decoder updates log-likelihood ratios as $L(u_k|y)=L_c y_k+L_a(u_k)+L_e(u_k)$, where $L_a$ is a priori information and $L_e$ is extrinsic information passed to the other decoder.

## Code example

```csharp
static double TurboExtrinsic(double posteriorLlr, double channelLlr, double aprioriLlr)
{
    return posteriorLlr - channelLlr - aprioriLlr;
}
```

## Related

- [[BCJR algorithm]]
- [[Viterbi algorithm]]
- [[LDPC decoding]]

## Sources

- <https://en.wikipedia.org/wiki/Turbo_code>
- <https://en.wikipedia.org/wiki/Log-likelihood_ratio>
