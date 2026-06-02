---
title: "Configurable Allocated Work Item Visibility"
category: "[[Resources/_Resource Patterns|Resource Patterns]]"
---
Intent: Configure who can see work items that are already allocated to a resource.

Use when: Supervisors, team members, substitutes, auditors, or case collaborators need controlled visibility into assigned work.

Modeling notes: Decide whether visibility grants read-only awareness, operational control, delegation rights, or execution rights. Allocated visibility often interacts with escalation, substitution, and workload monitoring.

```mermaid
flowchart LR
    A[Allocated work item] --> Owner[Assigned resource queue]
    A --> V[Allocated visibility policy]
    V --> Sup[Supervisor view]
    V --> Team[Team shadow view]
    Sup --> Monitor[Monitor or intervene]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/resource/visibility/wrp41.php).
