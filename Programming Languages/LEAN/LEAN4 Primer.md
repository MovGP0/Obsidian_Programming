## Comments

Single line comments:
```lean
-- this is a single-line comment
```

Comment blocks:
```lean
/-
This is a block comment
-/
```

LEAN supports nested comment blocks:
```lean
/-
Outer comment
  /- Inner comment -/
Back in outer
-/
```

## Namespaces

```lean
namespace SomeNamespaceName

-- the content of the namespace

end SomeNamespaceName
```

## Define a variable
```lean
-- defining a variable, type, and value
def x : Nat := 40

-- defining a variable with type inference
def y := x + 2
```

## Invoke / Get Type

```lean
-- #eval invokes/evaluates a function
#eval (y + 1)

-- check prints the type
#check y -- y : Nat
```

## Define Functions
```lean
def add (a b : Nat) : Nat := a + b

def incr : Nat → Nat := fun n => n + 1         -- lambda
def twice (f : α → α) (x : α) : α := f (f x)   -- higher-order
```

## Pattern Matching
```lean
def isZero (n : Nat) : Bool :=
  match n with
  | Nat.zero   => true
  | Nat.succ _ => false
```

## Recursion, structural decrease, termination

```lean
def fact : Nat → Nat
  | 0     => 1
  | n+1   => (n+1) * fact n  -- structurally smaller arg (n)

-- When not structurally obvious:
def gcd (a b : Nat) : Nat :=
  if b == 0 then a else gcd b (a % b)
termination_by gcd a b => (a, b) -- provide a measure / well-founded relation
```

## Inductive types

```lean
inductive Expr
  | lit  : Int → Expr
  | add  : Expr → Expr → Expr
  | neg  : Expr → Expr
deriving Repr

def eval : Expr → Int
  | .lit n    => n
  | .add a b  => eval a + eval b
  | .neg e    => - eval e
```

## Records / structures

```lean
structure Person where
  name : String
  age  : Nat
deriving Repr

def p : Person := { name := "Ada", age := 36 }
```

## Parametric polymorphism & universes

```lean
def id {α : Type} (x : α) : α := x
def mapPair {α β γ} (f : α → β) (g : α → γ) (x : α) : β × γ := (f x, g x)
```

## Type classes

- overloading via instances
- classes enable ad-hoc polymorphism (like Haskell).

```lean
-- A simple class:
class Size (α : Type) where size : α → Nat

-- Instances:
instance : Size String where size s := s.length
instance [Size α] [Size β] : Size (α × β) where
  size p := Size.size p.fst + Size.size p.snd

-- Use via resolution:
def big? [Size α] (x : α) : Bool := (Size.size x) > 10
```

## Functor, Applicative, Monad

```lean
-- Functor:
def doubleAll (xs : List Nat) : List Nat := Functor.map (· * 2) xs

-- Monad + do:
def readTwo : IO (String × String) := do
  let a ← IO.getLine
  let b ← IO.getLine
  return (a, b)

-- Option as a Monad:
def safeDiv (a b : Int) : Option Int :=
  if b == 0 then none else some (a / b)

def chainExample : Option Int := do
  let x ← safeDiv 10 2
  let y ← safeDiv x  5
  return y
```

## Monad transformers

- Use transformers (e.g., `ReaderT`, `StateT`, `ExceptT`) to combine effects.

```lean
-- Example sketch (details vary by effect libraries in use):
-- ReaderT for read-only env atop IO
abbrev AppM := ReaderT Config IO

def runApp {α} (cfg : Config) (act : AppM α) : IO α :=
  act.run cfg
```

## Lists and recursion patterns

- Prefer structural recursion; many library functions already exist (`List.map`, `foldl`, `foldr`).

```lean
def sum : List Nat → Nat
  | []      => 0
  | x :: xs => x + sum xs

def map {α β} (f : α → β) : List α → List β
  | []      => []
  | x :: xs => f x :: map f xs
```

## Dependent types

```lean
-- Σ-types (dependent pairs):
def Vec (α : Type) : Nat → Type
| 0     => Unit
| n+1   => α × Vec α n
```

## I/O

```lean
def main : IO Unit := do
  let args ← IO.getArgs
  let out  := args.length
  IO.println s!"#args = {out}"
```

## Notation and operator overloading

```lean
infixl:50 " ⊕ " => Sum
notation:max "‖" x "‖" => Size.size x
```

## LINQ

```lean
-- select
#eval [1,2,3].map (·*2)      -- [2,4,6]

-- where
#eval [1,2,3].filter (·>1)   -- [2,3]

-- aggregate
#eval [1,2,3].foldl (·+·) 0  -- 6
```

### Option Type (`some`/`none`)

```lean
def head? {α} : List α → Option α
  | []      => none
  | x :: _  => some x
```

## Errors (Exceptions)

```lean
def parsePos (s : String) : Except String Nat :=
  match s.toNat? with
  | some n => if n > 0 then .ok n else .error "not positive"
  | none   => .error "not a Nat"
```

## Logging

```lean
structure Cfg where verbose : Bool

abbrev AppM := ReaderT Cfg IO

def log (msg : String) : AppM Unit := do
  let cfg ← read
  if cfg.verbose then IO.println msg

def run (cfg : Cfg) (m : AppM α) : IO α := m.run cfg
```
