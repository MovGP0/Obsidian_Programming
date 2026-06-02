---
title: "Critical Section"
category: "[[Control-Flow/_Control-Flow Patterns|Control-Flow Patterns]]"
group: "State-based Patterns"
---
**Intent:** Prevent two or more parts of a workflow from entering a protected section at the same time.

**Use when:** A group of activities must have exclusive access to shared state or resources.

**Modeling notes:** Treat entry and exit as lock boundaries. The protected section should be as small as possible and must define what happens if work inside it fails or is cancelled.

```mermaid
flowchart LR
    A[Case A needs account update] --> L{{acquire account lock}}
    B[Case B needs account update] --> L
    L --> U[Modify account balance]
    U --> V[Write audit entry]
    V --> R{{release account lock}}
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/control/new/wcp39.php).
