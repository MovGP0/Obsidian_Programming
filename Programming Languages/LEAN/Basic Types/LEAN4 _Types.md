---
title: Data-Types
---
## Important Types

- **Scalars**: `Nat`, `Int`, `Float`, `Bool`, `Char`, `String`
- **Products / tuples**: `α × β`
- **Sums / variants**: `Sum α β` with `Sum.inl`, `Sum.inr`
- **Options**: `Option α` with `none` / `some a`
- **Lists**: `List α` with `[]` / `a :: xs`
- **Unit / Empty**: `Unit` (one value `()`) / `Empty` (no values)

## Scalar types

| Type   | Range                | Example                             |
| ------ | -------------------- | ----------------------------------- |
| Nat    | $0\ldots\infty$      | `def n : Nat := 5`                  |
| Int    | $-\infty\dots\infty$ | `def i : Int := -5`                 |
| Float  | $-\infty\dots\infty$ | `def x : Float := 0.0`              |
| Bool   | `true`, `false`      | `def x : Bool := true`              |
| Char   | UTF-8                | `def a : Char := 'a'`               |
| String | UTF-8                | `def h : String := "Hello, World!"` |

## Declare Types

```lean
-- Natural numbers start at 0
#eval (1 - 2 : Nat) -- returns '0'

-- Integers
#eval (1 - 2 : Int) -- returns '-1'
```

## Determine type

Types are determined using `#check`
```lean
def x : Int := 5
#check x -- returns 'Int'
```
