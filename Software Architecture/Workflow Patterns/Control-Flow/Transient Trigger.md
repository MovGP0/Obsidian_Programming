---
title: "Transient Trigger"
category: "[[Control-Flow/_Control-Flow Patterns|Control-Flow Patterns]]"
group: "Trigger Patterns"
---
**Intent:** Start or resume work only if an external signal is observed while the activity is ready to accept it.

**Use when:** The signal is not stored for later consumption, such as a live event, timeout tick, or immediate callback.

**Modeling notes:** If the workflow is not listening when the trigger occurs, the trigger is lost. Model the listening state and timeout behavior explicitly.

```mermaid
flowchart LR
    R[Task ready to receive payment callback] --> L((listening window))
    E([payment callback occurs now]) --> L
    L -->|callback caught| C[Confirm payment]
    L -->|window closes first| T[Wait for manual reconciliation]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/control/new/wcp23.php).
