---
title: Viterbi Algorithm
---
The **Viterbi algorithm** finds the most likely path through a trellis. In communications it is widely used for convolutional-code decoding and sequence estimation.

## Mathematical description

For states $s_k$, observations $y_k$, and branch metric $d_k(s_{k-1},s_k)$, dynamic programming updates $M_k(s)=\min_{s_{prev}}(M_{k-1}(s_{prev})+d_k(s_{prev},s))$ and stores survivor predecessors.

## Code example

```csharp
static int ViterbiChooseSurvivor(double previousMetric0, double previousMetric1, double branch0, double branch1)
{
    var metricFrom0 = previousMetric0 + branch0;
    var metricFrom1 = previousMetric1 + branch1;
    return metricFrom0 <= metricFrom1 ? 0 : 1;
}
```

## Related

- [[BCJR algorithm]]
- [[Turbo decoding]]
- [[LDPC decoding]]

## Sources

- <https://en.wikipedia.org/wiki/Viterbi_algorithm>
- <https://www.rfc-editor.org/rfc/rfc5441>
