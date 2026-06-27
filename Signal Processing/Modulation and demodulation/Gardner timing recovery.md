---
title: Gardner Timing Recovery
---
**Gardner timing recovery** estimates symbol timing from samples near the midpoint and endpoints of each symbol. It works without hard symbol decisions and is common for pulse-shaped digital links.

## Mathematical description

The timing error for one symbol can be written $e_k=(x_{k-1/2})(x_{k-1}-x_k)$ for real signals, where the half-symbol sample indicates whether the sampler is early or late.

## Code example

```csharp
static double GardnerError(double early, double prompt, double late)
{
    return (early - late) * prompt;
}
```

## Related

- [[Early-late gate]]
- [[Mueller and Muller recovery]]
- [[Root-raised-cosine filter]]

## Sources

- <https://dspillustrations.com/pages/pages/courses/course_singlecarrier/html/05%20-%20Symbol%20Timing%20Recovery.html>
- <https://wirelesspi.com/gardner-timing-error-detector-a-non-data-aided-version-of-zero-crossing-timing-error-detectors/>
