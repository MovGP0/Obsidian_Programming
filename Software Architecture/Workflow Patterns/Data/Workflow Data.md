---
title: "Workflow Data"
category: "[[Data/_Data Patterns|Data Patterns]]"
group: "Visibility Patterns"
---
Intent: Represent data available to all cases created from one workflow definition.

Use when: The workflow needs shared configuration, reference tables, thresholds, policy versions, or counters that apply across process instances.

Modeling notes: Do not confuse workflow data with case data. Changes to workflow data can affect many active cases, so model versioning, effective dates, or snapshot behavior where consistency matters.

```mermaid
flowchart LR
    W[(Workflow data)]
    C1[Case 1001] -->|reads shared definition data| W
    C2[Case 1002] -->|reads shared definition data| W
    C3[Case 1003] -->|reads shared definition data| W
    Admin[Workflow administrator] -->|updates configuration| W
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/data/visibility/wdp7.php).
