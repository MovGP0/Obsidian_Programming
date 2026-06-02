---
title: "Resource-Initiated Execution - Allocated Work Item"
category: "[[Resources/_Resource Patterns|Resource Patterns]]"
---
Intent: Let the allocated resource decide when to start a work item that is already assigned to them.

Use when: The resource controls sequencing within their allocated queue and may choose among assigned tasks.

Modeling notes: Allocation and execution are distinct states. Capture start as a resource action, and enforce authorization, prerequisites, and locking at that point rather than assuming allocation means work has begun.

```mermaid
flowchart LR
    A[Allocated work item] --> Q[Resource allocated queue]
    R[Assigned resource] --> S[Select assigned item]
    Q --> S
    S --> C{Start allowed?}
    C -->|yes| E[Execute]
    C -->|no| W[Remain allocated]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/resource/pull/wrp22.php).
