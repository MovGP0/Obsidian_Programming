---
title: LDPC Decoding
---
**LDPC decoding** recovers codewords from low-density parity-check codes by passing messages on a sparse bipartite graph between variable and check nodes.

## Mathematical description

Belief propagation updates variable-to-check and check-to-variable messages. A hard decision is valid when the syndrome $H\hat{x}=0$ over $GF(2)$.

## Code example

```csharp
static double MinSumCheckUpdate(ReadOnlySpan<double> incoming, int excludedIndex)
{
    var sign = 1.0;
    var magnitude = double.PositiveInfinity;

    for (var i = 0; i < incoming.Length; i++)
    {
        if (i == excludedIndex)
        {
            continue;
        }

        sign *= Math.Sign(incoming[i]);
        magnitude = Math.Min(magnitude, Math.Abs(incoming[i]));
    }

    return sign * magnitude;
}
```

## Related

- [[Turbo decoding]]
- [[BCJR algorithm]]
- [[Viterbi algorithm]]

## Sources

- <https://en.wikipedia.org/wiki/Low-density_parity-check_code>
- <https://en.wikipedia.org/wiki/Belief_propagation>
