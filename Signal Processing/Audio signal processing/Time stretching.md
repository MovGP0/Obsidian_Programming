---
title: Time Stretching
---
**Time stretching** changes audio duration without changing pitch. It is used in practice tools, sample manipulation, and synchronization workflows.

## Mathematical description

Overlap-add methods split audio into windows and place them at a new hop size. Phase-vocoder methods preserve phase continuity between STFT frames while changing frame spacing.

## Code example

```csharp
static void OverlapAdd(ReadOnlySpan<double> frame, Span<double> output, int synthesisStart, ReadOnlySpan<double> window)
{
    for (var i = 0; i < frame.Length; i++)
    {
        output[synthesisStart + i] += frame[i] * window[i];
    }
}
```

## Related

- [[Pitch shifting]]
- [[Vocoder]]
- [[Chorus]]

## Sources

- <https://en.wikipedia.org/wiki/Audio_time_stretching_and_pitch_scaling>
- <https://en.wikipedia.org/wiki/Phase_vocoder>
