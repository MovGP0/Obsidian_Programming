---
title: "Static Partial Join for Multiple Instances"
category: "[[Control-Flow/_Control-Flow Patterns|Control-Flow Patterns]]"
group: "Multiple Instance Patterns"
---
**Intent:** Continue after a fixed threshold of multiple activity instances completes.

**Use when:** The total instance count and required completion count are known before the instances start.

**Modeling notes:** The threshold should be modeled separately from the total count, such as 3 of 5. Remaining instances may still complete, but they must not trigger the continuation again.

```mermaid
flowchart LR
    A[Request peer feedback] --> M{{create 5 feedback tasks}}
    M --> F1[Feedback 1]
    M --> F2[Feedback 2]
    M --> F3[Feedback 3]
    M --> F4[Feedback 4]
    M --> F5[Feedback 5]
    F1 --> J{{static threshold: 3 of 5}}
    F2 --> J
    F3 --> J
    F4 --> J
    F5 --> J
    J --> D[Proceed with available feedback]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/control/new/wcp34.php).
