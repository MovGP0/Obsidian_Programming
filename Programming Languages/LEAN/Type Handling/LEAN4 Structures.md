---
title: Records / Structures
---
Structures are defined using `structure`:
```lean
structure Point2D where
  x : Float
  y : Float
deriving Repr -- inheritance via metagrogram (e.g. for implementing format method)

structure Point3D where
  x : Float
  y : Float
  z : Float
deriving Repr

structure Book where
  create :: -- constructor method
  title : String
  author : String
  price : Float
```

Instantiate a structure:
```lean
-- mk is the Constructor method
def p := Point2D.mk 1.5 2.8

-- alternative methods
def p : Point2D := { x := 0.0, y := 0.0 }
def p := ({ x := 0.0, y := 0.0 } : Point2D)
def p := { x := 0.0, y := 0.0 : Point2D }
```

Note that the name of the constructor can be overridden:
```lean
-- use 'ctor' as the name of the constructor method
structure Point where
  ctor ::
  x : Float
  y : Float
deriving Repr
```

Access properties of the structure:
```lean
#eval p.x -- 0.000000
#eval p.y -- 0.000000
```

The access to the properties is done via accessor functions:
```lean
#check (Point2D.x) -- Point2D.x : Point2D → Float
```

Implement a method using the structure:
```lean
def add (p1 : Point2D) (p2 : Point2D) : Point2D :=
  { x := p1.x + p2.x, y := p1.y + p2.y }
```

Methods can be "attached" to a type:
```lean
-- applies the function f to both, x and y, values
def Point2D.apply (f : Float → Float) (p : Point2D) : Point2D := { x := f p.x, y := f p.y }

-- example
def p: Point2D = { x := 3.4, y := 5.6 }
#eval p.apply Float.floor
```

The `with` keyword can be used to create a clone of the structure instance with only changing some property values:
```lean
def zeroX (p : Point2D) : Point2D :=
  { p with x := 0 }
```
