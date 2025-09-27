---
title: Characters
---
Characters are written in single quotes (e.g. `'a'`, `'Z'`, `'\n'`, `'\u03B1'`)

```lean
def a : Char := 'a'
def nl : Char := '\n' -- new line
def α : Char := '\u03B1' -- alpha
```

Character operations using `Char`:
```lean
#eval Char.toNat 'a' -- 97
#eval Char.isAlpha 'a' -- true
```
