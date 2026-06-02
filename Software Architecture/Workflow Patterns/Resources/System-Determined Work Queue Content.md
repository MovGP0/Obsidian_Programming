---
title: "System-Determined Work Queue Content"
category: "[[Resources/_Resource Patterns|Resource Patterns]]"
---
Intent: Let the workflow system decide which work items appear in a resource's queue.

Use when: The organization wants centrally governed visibility based on role, priority, availability, authorization, or distribution rules.

Modeling notes: Treat queue content as a projection computed by the system. Resources may act on visible items, but they do not decide which classes of items enter the queue.

```mermaid
flowchart LR
    All[All candidate work items] --> Rules[System visibility rules]
    Rules --> Filter[Filter by resource profile]
    Filter --> Q[Resource queue content]
    Q --> R[Resource views queue]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/resource/pull/wrp24.php).
