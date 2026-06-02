---
title: "Multiple Instances with a Priori Run-Time Knowledge"
category: "[[Control-Flow/_Control-Flow Patterns|Control-Flow Patterns]]"
group: "Multiple Instance Patterns"
---
**Intent:** Create a runtime-determined number of activity instances, known before the first instance starts, then synchronize them.

**Use when:** Case data determines the instance count up front, such as one approval per selected department.

**Modeling notes:** Capture the runtime count before spawning instances and use that count as the synchronization target. Later additions require a different pattern.

```mermaid
flowchart LR
    A[Read selected departments] --> C[Count departments = n]
    C --> M{{create n department approvals}}
    M --> I1[Approval 1]
    M --> I2[Approval 2]
    M --> In[Approval n]
    I1 --> J{{wait for n approvals}}
    I2 --> J
    In --> J
    J --> D[Finalize request]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/control/multiple_instance/wcp14.php).
