---
title: Booleans
---
Booleans are either `true` or `false`:
```lean
def flag1 : Bool := true
def flag2 : Bool := false
```

The `Bool` type is defined as **inductive** Type (aka. **union** type or **sum** type):
```lean
inductive Bool where
  | false : Bool
  | true : Bool
```

> [!note]
> The `Bool.true` and `Bool.false` types are exported to be used as `true` and `false`

> [!note]
> The definition of the `Bool` type is somewhat equivalent to the following C# code:
> ```csharp
> abstract class Bool {}
> class True : Bool {}
> class False : Bool {}
> ```

Boolean operations:
```lean
-- AND
#eval true && false   -- false

-- OR
#eval true || false   -- true

-- NOT
#eval !true           -- false
```
