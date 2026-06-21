---
title: Arc Consistency (AC-3)
---
**Arc consistency** is a constraint-propagation property for binary constraints.

An arc $X \rightarrow Y$ is consistent when every value of $X$ has at least one compatible value in $Y$.

## AC-3

**AC-3** repeatedly revises arcs until no more domain values can be removed.

```text
while queue is not empty:
    (X, Y) = queue.pop()
    if revise(X, Y):
        add arcs into X back to the queue
```

## Use in search

Arc consistency can run:

- before search as preprocessing,
- after each assignment during [[Backtracking Search]],
- as part of maintaining arc consistency.

## Use when

- constraints are binary or can be converted to binary form,
- domain pruning is cheaper than blind search,
- early inconsistency detection matters.
