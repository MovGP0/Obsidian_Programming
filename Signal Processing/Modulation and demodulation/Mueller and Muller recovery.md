---
title: Mueller and Muller Recovery
---
**Mueller and Muller recovery** is a decision-directed symbol timing method. It compares current and previous samples with their sliced decisions to estimate fractional timing error.

## Mathematical description

A typical error detector is $e_k=\hat{a}_{k-1}y_k-\hat{a}_k y_{k-1}$, where $y_k$ is the matched-filter sample and $\hat{a}_k$ is the nearest constellation decision.

## Code example

```csharp
static double MuellerMullerError(double previousSample, double currentSample, double previousDecision, double currentDecision)
{
    return previousDecision * currentSample - currentDecision * previousSample;
}
```

## Related

- [[Gardner timing recovery]]
- [[Early-late gate]]
- [[Pulse shaping]]

## Sources

- <https://wirelesspi.com/mueller-and-muller-timing-synchronization-algorithm/>
- <https://wirelesspi.com/mueller-and-muller-timing-synchronization-algorithm/>
