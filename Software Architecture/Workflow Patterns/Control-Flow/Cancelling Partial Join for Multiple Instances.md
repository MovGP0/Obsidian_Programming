---
title: "Cancelling Partial Join for Multiple Instances"
category: "[[Control-Flow/_Control-Flow Patterns|Control-Flow Patterns]]"
group: "Multiple Instance Patterns"
---
**Intent:** Continue after the required number of multiple activity instances completes and cancel the rest.

**Use when:** Late instances have no value once the threshold is met.

**Modeling notes:** Make the cancellation visible because it affects user work, external calls, and compensation. This is a force-completion behavior for the multi-instance activity.

```mermaid
flowchart LR
    A[Run vendor checks] --> M{{create 4 vendor checks}}
    M --> V1[Vendor check 1]
    M --> V2[Vendor check 2]
    M --> V3[Vendor check 3]
    M --> V4[Vendor check 4]
    V1 --> J{{2 acceptable checks}}
    V2 --> J
    V3 --> J
    V4 --> J
    J --> S[Select vendor shortlist]
    J -. cancel unfinished instances .-> X[Withdraw remaining vendor checks]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/control/new/wcp35.php).
