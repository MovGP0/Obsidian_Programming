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
```

Since variables are immutable, we need a new name for variations of the same variable:
```lean
-- prime char (') is used to differentiate between k and k'
def plus (n : Nat) (k : Nat) : Nat :=
  match k with
  | Nat.zero => n
  | Nat.succ k' => Nat.succ (plus n k')
```

Additional examples:
```lean
-- multiplication on the natural numbers as recursive addition (accumulation)
def times (n : Nat) (k : Nat) : Nat :=
  match k with
  | Nat.zero => Nat.zero
  | Nat.succ k' => plus n (times n k')

-- subtraction on the natural numbers as repeated subtraction by one
def minus (n : Nat) (k : Nat) : Nat :=
  match k with
  | Nat.zero => n
  | Nat.succ k' => pred (minus n k')
```

The type matching can also be done using structures:
```lean
-- returns Point3D.z
def depth (p : Point3D) : Float :=
  match p with
  | { x:= h, y := w, z := d } => d
```

The following fails, because the termination of the method is not prooven (e.g. $k = 0$):
```lean
-- division by repeated subtraction
-- requires an additional check if the operation is completed
def div (n : Nat) (k : Nat) : Nat :=
  if n < k then
    0
  else Nat.succ (div (n - k) k)
```
