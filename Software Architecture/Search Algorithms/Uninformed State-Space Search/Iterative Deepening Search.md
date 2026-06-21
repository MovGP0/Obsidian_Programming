---
title: Iterative Deepening Search (IDS)
---
**Iterative deepening search** (**IDS**) repeatedly runs [[Depth-Limited Search]] with increasing depth limits.

```text
for limit = 0, 1, 2, ...
    result = depth_limited_search(limit)
    if result is success:
        return result
```

## Why it works

IDS combines useful properties of breadth-first and depth-first search.

| Property | Behavior |
| -------- | -------- |
| Complete | Yes, for finite branching factor when a solution exists. |
| Optimal | Yes, when each step has equal cost. |
| Memory | Linear in solution depth. |

The repeated shallow searches are usually acceptable because most nodes are at the deepest level.

## Use when

- path cost is the number of actions,
- the solution depth is unknown,
- memory matters,
- [[Breadth-First Search]] would store too many nodes.
