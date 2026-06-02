---
title: "Structured Discriminator"
category: "[[Control-Flow/_Control-Flow Patterns|Control-Flow Patterns]]"
group: "Advanced Branching and Synchronization Patterns"
---
**Intent:** Continue after the first branch in a structured parallel block completes, then reset after all remaining branches have completed.

**Use when:** The earliest result is enough to start the continuation, but the workflow must still drain the other branches before another structured instance can reuse the discriminator.

**Modeling notes:** The first arrival enables the next activity once. Later arrivals from the same block are ignored for continuation, but they are still required for reset.

```mermaid
flowchart LR
    S{{send to providers}} --> A[Provider A quote]
    S --> B[Provider B quote]
    S --> C[Provider C quote]
    A --> D{{first quote wins}}
    B --> D
    C --> D
    D -->|first arrival only| N[Negotiate with first provider]
    A -. later arrivals drain .-> R((reset after all quotes returned))
    B -. later arrivals drain .-> R
    C -. later arrivals drain .-> R
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/control/advanced_branching/wcp9.php).
