---
title: Decision Feedback Equalizer
---
A **decision feedback equalizer** (**DFE**) uses previous symbol decisions to subtract post-cursor intersymbol interference. It avoids boosting noise in the same way as pure inverse filters.

## Mathematical description

The decision variable can be written $y_k=\sum_i f_i r_{k-i}-\sum_j b_j \hat{a}_{k-j}$, with feedforward taps $f_i$ and feedback taps $b_j$.

## Code example

```csharp
static double DecisionFeedbackEqualize(ReadOnlySpan<double> received, ReadOnlySpan<double> feedforward, ReadOnlySpan<double> feedback, ReadOnlySpan<double> previousDecisions)
{
    var y = 0.0;

    for (var i = 0; i < feedforward.Length; i++)
    {
        y += feedforward[i] * received[i];
    }

    for (var i = 0; i < feedback.Length; i++)
    {
        y -= feedback[i] * previousDecisions[i];
    }

    return y;
}
```

## Related

- [[Zero-forcing equalizer]]
- [[MMSE equalizer]]
- [[Viterbi algorithm]]

## Sources

- <https://wirelesspi.com/how-decision-feedback-equalizers-dfe-work/>
- <https://en.wikipedia.org/wiki/Equalization_(communications%29)>
