---
title: "Escalation"
category: "[[Resources/_Resource Patterns|Resource Patterns]]"
---
Intent: Move a work item to a higher authority or broader responsibility channel when normal handling fails or time expires.

Use when: Deadlines, exception severity, authorization limits, or unresolved states require management attention or specialist intervention.

Modeling notes: Define escalation triggers separately from escalation targets. Escalation may add visibility, reallocate the item, increase priority, or create a new supervisory work item.

```mermaid
flowchart LR
    W[Allocated work item] --> Timer[Deadline or exception monitor]
    Timer --> C{Escalation condition?}
    C -->|no| R[Remain with resource]
    C -->|yes| M[Supervisor or escalation role]
    M --> A[Reassign or add oversight]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/resource/detour/wrp28.php).
