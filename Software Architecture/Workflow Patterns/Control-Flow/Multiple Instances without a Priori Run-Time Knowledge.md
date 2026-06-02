---
title: "Multiple Instances without a Priori Run-Time Knowledge"
category: "[[Control-Flow/_Control-Flow Patterns|Control-Flow Patterns]]"
group: "Multiple Instance Patterns"
---
**Intent:** Allow new instances to be created while existing instances are already running, then synchronize when creation has stopped and all instances finish.

**Use when:** The required work items are discovered progressively during execution.

**Modeling notes:** The model needs both a completion condition for instance creation and a join condition for all created instances. Without a clear close rule, the join can wait forever.

```mermaid
flowchart LR
    A[Start investigation] --> M{{create finding review as findings appear}}
    M --> R1[Review finding 1]
    M --> R2[Review finding 2]
    M --> Rn[Review finding n]
    A --> C{More findings can appear?}
    C -->|yes| M
    C -->|no| J{{wait for all created reviews}}
    R1 --> J
    R2 --> J
    Rn --> J
    J --> D[Write investigation report]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/control/multiple_instance/wcp15.php).
