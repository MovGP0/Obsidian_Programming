---
title: "Stateless Reallocation"
category: "[[Resources/_Resource Patterns|Resource Patterns]]"
---
Intent: Reassign a work item while discarding any transient execution state from the previous resource.

Use when: Partial work is invalid, unverifiable, or cheap to repeat, and the receiving resource should start from a clean state.

Modeling notes: Preserve audit history while clearing working data. Make explicit which artifacts survive reallocation, such as case data, comments, or completed subtasks, and which runtime state is reset.

```mermaid
flowchart LR
    W[In-progress work item] --> X[Cancel transient work state]
    X --> U[Return to not-started state]
    U --> B[Allocate Resource B]
    B --> S[Start from beginning]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/resource/detour/wrp31.php).
