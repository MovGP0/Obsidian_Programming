---
title: Simplified Memory-Bounded A* Search (SMA*)
---
**Simplified Memory-Bounded A-star Search** (SMA*) is an A-star-style search that keeps only as many frontier nodes as memory allows.

When memory is full, SMA* drops the worst leaf and stores a backed-up value in its parent so the forgotten subtree can be regenerated later if it becomes promising again.

## Core idea

| Step | Meaning |
| ---- | ------- |
| Expand best leaf | Follow the lowest estimated solution cost. |
| Hit memory limit | Remove the least promising leaf. |
| Back up forgotten cost | Remember enough information to revisit it later. |

## Use when

- optimal search is desired,
- memory is limited,
- the heuristic is useful,
- regenerating forgotten nodes is acceptable.

SMA* is mainly a classical AI search concept. In production systems, memory-bounded variants are often adapted to the domain.
