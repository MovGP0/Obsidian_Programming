---
title: "Exception Handling at Case Level"
category: "[[Exception Handling/_Exception Handling Patterns|Exception Handling Patterns]]"
---
**Intent:** Handle exceptions whose consequences apply to the whole workflow instance, not only to a single task. Case-level handling changes the state, route, or viability of the case.

**Use when:** A disruption invalidates the current case path or requires a coordinated response across multiple active work items. Examples include customer withdrawal, fraud discovery, regulatory hold, global cancellation, or a severe external dependency failure.

**Modeling notes:** Model case-level handlers as explicit case transitions or supervisory regions. They should define how active work items are suspended or cancelled, what state must be preserved, which compensation steps run, and whether the case resumes, restarts, moves to an alternate process, or closes. Case-level handlers need clear precedence over local handlers.

```mermaid
flowchart TD
    Case[Workflow case] --> Active[Multiple active work items]
    Active --> CaseException{Case-level exception}
    CaseException --> Suspend[Suspend or cancel active work]
    Suspend --> Assess[Assess case state]
    Assess --> Route{Case still valid}
    Route -->|Resume possible| Alternate[Move to alternate case route]
    Route -->|Repair needed| Compensate[Run case compensation]
    Route -->|No| Close[Close or terminate case]
    Alternate --> Continue[Continue case]
    Compensate --> Continue
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/exception/exception_caselevel.php).
