---
title: "Multiple Instance Data"
category: "[[Data/_Data Patterns|Data Patterns]]"
group: "Visibility Patterns"
---
Intent: Represent data that belongs to one instance inside a multiple-instance activity, distinct from the data of sibling instances.

Use when: A repeated task or subprocess needs each instance to carry its own item, partial result, status, or local decision.

Modeling notes: Model an instance key or index. Distinguish per-instance data from aggregate data so updates from one instance cannot accidentally overwrite another instance's state.

```mermaid
flowchart LR
    I[(Input collection)] --> M{Create instances}
    M --> I1[Instance 1]
    M --> I2[Instance 2]
    M --> I3[Instance n]
    I1 --> D1[(MI data 1)]
    I2 --> D2[(MI data 2)]
    I3 --> D3[(MI data n)]
    D1 --> A[(Aggregate)]
    D2 --> A
    D3 --> A
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/data/visibility/wdp4.php).
