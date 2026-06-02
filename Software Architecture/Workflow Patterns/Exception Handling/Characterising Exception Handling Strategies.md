---
title: "Characterising Exception Handling Strategies"
category: "[[Exception Handling/_Exception Handling Patterns|Exception Handling Patterns]]"
---
**Intent:** Characterize exception handling strategies by their design posture rather than by individual handler implementations. A strategy describes whether the workflow prefers prevention, correction, compensation, escalation, adaptation, or termination.

**Use when:** You need to reason about the overall exception-handling style of a process, compare alternatives, or explain why different exceptions are handled with different levels of automation and intervention.

**Modeling notes:** Treat strategy as a policy layer above individual actions. For stable and frequent exceptions, prefer automated correction or retry. For high-impact and rare exceptions, prefer escalation, review, or controlled termination. A strategy should be visible in the model so that handlers do not become isolated fragments with inconsistent assumptions.

```mermaid
flowchart TD
    Context[Exception context] --> Strategy{Strategy characterization}
    Strategy --> Prevent[Prevent before occurrence]
    Strategy --> Correct[Correct and continue]
    Strategy --> Compensate[Undo or offset effects]
    Strategy --> Adapt[Adapt route]
    Strategy --> Escalate[Escalate for judgment]
    Strategy --> Terminate[Terminate safely]
    Prevent --> Policy[Strategy policy]
    Correct --> Policy
    Compensate --> Policy
    Adapt --> Policy
    Escalate --> Policy
    Terminate --> Policy
    Policy --> Handlers[Consistent handler design]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/exception/characterisingstrategies.php).
