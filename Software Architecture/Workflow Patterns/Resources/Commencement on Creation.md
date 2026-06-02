---
title: "Commencement on Creation"
category: "[[Resources/_Resource Patterns|Resource Patterns]]"
---
Intent: Start a work item automatically as soon as it is created.

Use when: Creation itself is enough to begin execution, especially for automated tasks, background jobs, or work that should not wait for allocation.

Modeling notes: Creation, enablement, and start may collapse into one event for this pattern. Define the resource that executes the work and how failures are surfaced when no human has manually started it.

```mermaid
flowchart LR
    C[Create work item] --> S[Start immediately]
    S --> R[Assigned system or default resource]
    R --> E[Execute]
    E --> O[Output or failure state]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/resource/autostart/wrp36.php).
