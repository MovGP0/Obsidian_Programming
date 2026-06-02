---
title: "Cancel Multiple Instance Activity"
category: "[[Control-Flow/_Control-Flow Patterns|Control-Flow Patterns]]"
group: "Cancellation and Force Completion Patterns"
---
**Intent:** Cancel all remaining instances of a multiple-instance activity.

**Use when:** A batch of identical work items should stop as a group before all instances finish.

**Modeling notes:** The target is the multi-instance activity, not a single instance. Completed instances remain completed; enabled or running instances are withdrawn.

```mermaid
flowchart LR
    A[Launch survey calls] --> M{{call each selected customer}}
    M --> C1[Call customer 1]
    M --> C2[Call customer 2]
    M --> Cn[Call customer n]
    T([sample size reached early]) -. cancel MI activity .-> X[Withdraw unstarted and running calls]
    C1 --> R[Use completed call results]
    C2 --> R
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/control/new/wcp26.php).
