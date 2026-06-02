---
title: "Distorted Label"
category: "[[Log Imperfection/_Log Imperfection Patterns|Log Imperfection Patterns]]"
---
A distorted label is a corrupted variant of the intended activity name. Typographical errors, casing differences, truncation, encoding mistakes, or inconsistent separators create labels that are syntactically close and semantically equivalent but not equal.

**Intent:** Normalize accidental label variants without collapsing genuinely different activities.

**Use when:** The log contains near-duplicates such as `Approve request`, `Approve Request`, `Aprove request`, and `Approve req`, especially when they occur in the same process position.

**Modeling notes:** Combine syntactic similarity with behavioral context. String distance alone can merge labels that look similar but mean different things. Keep a controlled mapping from observed distorted labels to the canonical activity name.

```mermaid
flowchart LR
    D1[Approve request] --> N{Near duplicate?}
    D2[Aprove request] --> N
    D3[Approve req] --> N
    D4[APPROVE_REQUEST] --> N
    N --> C[Canonical label:<br/>Approve request]
    C --> L[Reduced label noise<br/>without losing original values]
```

Source: [workflowpatterns.com](http://workflowpatterns.com/patterns/logimperfection/elp9.php).
