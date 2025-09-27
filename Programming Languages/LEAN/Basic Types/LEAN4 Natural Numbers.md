---
title:
  - Natural Numbers
---

Natural numbers are defined in LEAN as an inductive type:
```lean
inductive Nat where
  | zero : Nat
  | succ (n : Nat) : Nat
```

E.g. the number 4 is defined as
```lean
#eval Nat.succ (Nat.succ (Nat.succ (Nat.succ Nat.zero)))
```
