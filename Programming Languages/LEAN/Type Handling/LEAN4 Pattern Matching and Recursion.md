---
title: Pattern Matching and Recursion
---
The `match .. with` keywords are used to compare the type of the argument with matching clauses:
```lean
def isZero (n : Nat) : Bool :=
  match n with
  | Nat.zero => true
  | Nat.succ k => false

-- recursive method
def isEven (n : Nat) : Bool :=
  match n with
  | Nat.zero => true
  | Nat.succ k => not (isEven k)

-- prime char (') is used to differentiate between k and k'
def plus (n : Nat) (k : Nat) : Nat :=
  match k with
  | Nat.zero => n
  | Nat.succ k' => Nat.succ (plus n k')
```

The type matching can also be done using structures:
```lean
-- returns Point3D.z
def depth (p : Point3D) : Float :=
  match p with
  | { x:= h, y := w, z := d } => d
```
