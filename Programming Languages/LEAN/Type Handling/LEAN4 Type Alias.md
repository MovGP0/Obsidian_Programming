---
title: Type Alias
---
It is possible to declare type aliases:
```lean
-- create the new type
def Str : Type := String

-- use the new type
def aStr : Str := "This is a string."
```

Note that this method does not work with some type inference scenarios.
```lean
def N : Type := Nat
def x : N := 42 -- does not work, since the exact type of 42 is not determined
def x : N := (42 : Nat) -- this works
```

Another method is to use `abbr` for type aliases:
```lean
abbrev N : Type := Nat
def x : N := 42 -- this works
```
