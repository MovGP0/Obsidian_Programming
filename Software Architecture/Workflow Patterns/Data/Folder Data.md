---
title: "Folder Data"
category: "[[Data/_Data Patterns|Data Patterns]]"
group: "Visibility Patterns"
---
Intent: Represent data shared by a group of related cases in a folder or dossier.

Use when: Multiple cases contribute to or depend on a shared matter, claim, customer file, project, or other cross-case container.

Modeling notes: Model the folder as its own data owner. Individual cases should read or update folder data through explicit rules so cross-case effects are visible and auditable.

```mermaid
flowchart LR
    F[(Folder data)]
    C1[Case A] <--> F
    C2[Case B] <--> F
    C3[Case C] <--> F
    C1 --> D1[(Case A data)]
    C2 --> D2[(Case B data)]
    C3 --> D3[(Case C data)]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/data/visibility/wdp6.php).
