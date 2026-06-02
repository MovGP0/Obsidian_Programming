---
title: "Data Interaction - Case to Case"
category: "[[Data/_Data Patterns|Data Patterns]]"
group: "Internal Interaction Patterns"
---
Intent: Transfer data between two workflow cases under the same workflow environment.

Use when: One case must notify, update, synchronize with, or provide context to another related case.

Modeling notes: Identify both case identities and whether the interaction is one-way, request-reply, or shared-folder mediated. Avoid silent cross-case reads because they make case isolation unclear.

```mermaid
flowchart LR
    C1[Source case] --> D[(Case message data)]
    D -->|internal case interaction| C2[Target case]
    C2 -->|optional acknowledgement| ACK[(Acknowledgement)]
    ACK --> C1
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/data/internal/wdp14.php).
