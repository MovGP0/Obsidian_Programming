---
title: Type Polymorphism (Generic Types)
---
> [!note]
> Type Polymorphism is similar to generic types in languages like C++, Java and C#

```lean
structure Point2D (t : Type) where
  x : t
  y : t
deriving Repr
```

Usage examples:
```lean
-- declare a Point2D<uint>
def origin : Point2D Nat := { x := Nat.zero, y := Nat.zero }

-- delare a Point2D<float>
def origin : Point2D Float := { x := 0.0, y := 0.0 }
```

## Generic Methods

Generic types are given as arguments to methods:
```lean
def replaceX (t : Type) (point : Point2D t) (x' : t) : Point2D t := { point with x := x' }
```

## Generic List

A type like `List<T>` can be represented as:
```lean
inductive List (t : Type) where
  | nil : List t
  | cons : t → List t → List t

def List.length (t : Type) (xs : List t) : Nat :=
  match xs with
  | List.nil => Nat.zero
  | List.cons y ys => Nat.succ (List.length t ys)
```

> [!note]
> - `List.nil` (the empty list) is aliased as `[]`
> - `List.cons h r` (head and rest of the list) is aliased as `h::r`

```lean
def List.length (t : Type) (xs : List t) : Nat :=
  match xs with
  | [] => Nat.zero
  | y :: ys => Nat.succ (List.length t ys)
```
