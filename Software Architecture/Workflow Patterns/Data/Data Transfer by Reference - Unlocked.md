---
title: "Data Transfer by Reference - Unlocked"
category: "[[Data/_Data Patterns|Data Patterns]]"
group: "Transfer and Transformation Patterns"
---
Intent: Give a task a reference to source data without locking the referenced data.

Use when: The task should access live data and concurrent readers or writers are acceptable.

Modeling notes: This creates live coupling. Model concurrency risks, stale reads, and whether the task expects repeat reads to return the same value.

```mermaid
flowchart LR
    S[(Shared data object)] -->|reference only| R[[Reference]]
    R --> T[Task]
    O[Other task] -->|may read or write concurrently| S
    T -->|dereference live value| S
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/data/mechanisms/wdp30.php).
