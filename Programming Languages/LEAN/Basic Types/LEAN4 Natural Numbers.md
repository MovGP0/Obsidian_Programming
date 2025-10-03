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

> [!note]
> In C# this code would look somewhat like
> ```csharp
> abstract class Nat {}
> class Zero : Nat {}
> class Succ : Nat {
>     public Nat n;
>     public Succ(Nat pred) {
>         n = pred;
>     }
> }
> ```
> or in [[TypeScript]]:
> ```ts
> interface Zero {
>     tag: "zero";
> }
> interface Succ {
>     tag: "succ";
>     predecessor: Nat;
> }
> type Nat = Zero | Succ;
> ```
