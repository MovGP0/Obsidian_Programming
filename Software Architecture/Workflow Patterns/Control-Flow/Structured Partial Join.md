---
title: "Structured Partial Join"
category: "[[Control-Flow/_Control-Flow Patterns|Control-Flow Patterns]]"
group: "Advanced Branching and Synchronization Patterns"
---
**Intent:** Continue when a fixed number of branches in a structured block have completed, then ignore the remaining completions for continuation while allowing reset.

**Use when:** A quorum of results is sufficient, but the rest of the structured branch set may still finish normally.

**Modeling notes:** The threshold is lower than the number of active branches. The model must state both the required count and what happens to late completions.

```mermaid
flowchart LR
    S{{send to 5 reviewers}} --> R1[Review 1]
    S --> R2[Review 2]
    S --> R3[Review 3]
    S --> R4[Review 4]
    S --> R5[Review 5]
    R1 --> J{{3 of 5 reviews received}}
    R2 --> J
    R3 --> J
    R4 --> J
    R5 --> J
    J -->|first time quorum met| D[Make recommendation]
    J -. remaining reviews may finish .-> Z((reset after branch set closes))
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/control/new/wcp30.php).
