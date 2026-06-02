---
title: "Distribution by Allocation - Single Resource"
category: "[[Resources/_Resource Patterns|Resource Patterns]]"
---
Intent: Allocate a work item directly to one selected resource without an intermediate offer.

Use when: The system has authority to assign responsibility and the resource is expected to perform the task once it appears in the allocated queue.

Modeling notes: Allocation changes accountability, so model reassignment, refusal, and escalation separately if they are permitted. Do not use offer terminology for this pattern; the resource is assigned, not invited.

```mermaid
flowchart LR
    W[Enabled work item] --> S[Select one resource]
    S --> A[Allocate directly]
    A --> Q[Allocated queue]
    Q --> R[Assigned resource]
    R --> E[Start when ready]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/resource/push/wrp14.php).
