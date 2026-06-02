A **finger tree** is a persistent sequence data structure with efficient access near both ends and flexible cached measurements. It represents a sequence as a tree with small digit buffers at the edges and deeper nodes in the middle.

Finger trees can implement deques, priority queues, ordered sequences, interval structures, and ropes. Their strength is that each node carries a monoidal measure, allowing searches and splits by accumulated metadata.

## Operations

- Push or pop near either end in amortized constant time.
- Concatenate and split sequences in logarithmic time.
- Search by a measure such as length, priority, or prefix sum.
- Share unchanged nodes between versions.

## C\# Example

```csharp
public interface IMeasured<TMeasure>
{
    TMeasure Measure { get; }
}

public sealed record Digit<T>(T[] Items);

public sealed record FingerTree<T, TMeasure>(
    Digit<T> Left,
    FingerTree<T, TMeasure>? Middle,
    Digit<T> Right,
    TMeasure Measure);

var tree = new FingerTree<string, int>(
    new Digit<string>(["a"]),
    null,
    new Digit<string>(["b", "c"]),
    3);

Console.WriteLine(tree.Measure);
```

## Rust Example

```rust
#[derive(Clone)]
struct Digit<T> {
    items: Vec<T>,
}

#[derive(Clone)]
struct FingerTree<T, M> {
    left: Digit<T>,
    middle: Option<Box<FingerTree<T, M>>>,
    right: Digit<T>,
    measure: M,
}

let tree = FingerTree {
    left: Digit { items: vec!["a"] },
    middle: None,
    right: Digit { items: vec!["b", "c"] },
    measure: 3usize,
};

println!("{}", tree.measure);
```

## Further Reading

- [Finger tree - Wikipedia](https://en.wikipedia.org/wiki/Finger_tree)
- [Finger Trees: A Simple General-purpose Data Structure](https://www.staff.city.ac.uk/~ross/papers/FingerTree.html)
- [Hinze and Paterson finger tree paper](https://www.staff.city.ac.uk/~ross/papers/FingerTree.pdf)

