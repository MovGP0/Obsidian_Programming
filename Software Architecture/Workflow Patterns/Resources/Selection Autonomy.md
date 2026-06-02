---
title: "Selection Autonomy"
category: "[[Resources/_Resource Patterns|Resource Patterns]]"
---
Intent: Give a resource discretion to choose which visible work item to perform next.

Use when: Work quality or efficiency depends on human judgment about priority, context, batching, specialization, or readiness.

Modeling notes: Separate autonomy over selection from autonomy over eligibility. The system may determine the visible set while the resource chooses the execution order inside that set.

```mermaid
flowchart LR
    Q[Visible work queue] --> I1[Item A]
    Q --> I2[Item B]
    Q --> I3[Item C]
    R[Resource judgment] --> C{Choose next item}
    I1 --> C
    I2 --> C
    I3 --> C
    C --> E[Execute chosen item]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/resource/pull/wrp26.php).
