---
title: "Shortest Queue"
category: "[[Resources/_Resource Patterns|Resource Patterns]]"
---
Intent: Allocate work to the eligible resource with the smallest current queue.

Use when: The process aims to balance backlog and reduce waiting time across similarly capable resources.

Modeling notes: Define which queue counts: offered, allocated, started, suspended, or all outstanding work. Consider weighting items by estimated effort because a count-only queue can misrepresent workload.

```mermaid
flowchart LR
    W[Enabled work item] --> Q1[Resource A queue: 5]
    W --> Q2[Resource B queue: 2]
    W --> Q3[Resource C queue: 4]
    Q1 --> C{Smallest eligible queue}
    Q2 --> C
    Q3 --> C
    C --> A[Allocate to Resource B]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/resource/push/wrp17.php).
