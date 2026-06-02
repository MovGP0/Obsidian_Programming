A **Van Emde Boas tree** stores integer keys from a fixed universe `0..U-1`. It supports membership, predecessor, successor, insert, and delete in $O(\log \log U)$ time by recursively splitting keys into high and low parts.

The tradeoff is space: the classic structure uses $O(U)$ space, though practical variants reduce that. It is mainly useful when the key universe is known and word-size integer operations matter.

## C\# Example

```csharp
public static (int High, int Low) SplitKey(int key, int lowerBits)
{
    var mask = (1 << lowerBits) - 1;
    return (key >> lowerBits, key & mask);
}

var (cluster, offset) = SplitKey(42, 3);
Console.WriteLine($"{cluster}, {offset}");
```

Van Emde Boas trees use this kind of split recursively to choose a cluster and an offset inside that cluster.

## Rust Example

```rust
fn split_key(key: u32, lower_bits: u32) -> (u32, u32) {
    let mask = (1 << lower_bits) - 1;
    (key >> lower_bits, key & mask)
}

let (cluster, offset) = split_key(42, 3);
println!("{cluster}, {offset}");
```

## Further Reading

- [Van Emde Boas tree - Wikipedia](https://en.wikipedia.org/wiki/Van_Emde_Boas_tree)
- [MIT 6.046J notes on integer data structures](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/)
- [Predecessor problem - Wikipedia](https://en.wikipedia.org/wiki/Predecessor_problem)
