A **succinct data structure** stores information using space close to the theoretical minimum while still supporting useful queries. Instead of expanding data into pointer-heavy objects, it encodes structure in compact bit vectors and small indexes.

Common examples include rank/select bit vectors, wavelet trees, compressed suffix arrays, and balanced-parentheses trees. They are useful when memory locality and compactness matter as much as asymptotic speed.

## Operations

- `rank(i)` counts matching bits up to position `i`.
- `select(k)` finds the position of the `k`th matching bit.
- Navigate encoded trees with parenthesis operations.
- Use sampled indexes to answer queries without decompressing the full data.

## C\# Example

```csharp
var bits = new[] { true, false, true, true, false };

int Rank1(int exclusiveEnd)
{
    var count = 0;

    for (var i = 0; i < exclusiveEnd; i++)
    {
        if (bits[i])
        {
            count++;
        }
    }

    return count;
}

Console.WriteLine(Rank1(4));
```

## Rust Example

```rust
let bits = [true, false, true, true, false];

fn rank1(bits: &[bool], exclusive_end: usize) -> usize {
    bits.iter()
        .take(exclusive_end)
        .filter(|bit| **bit)
        .count()
}

println!("{}", rank1(&bits, 4));
```

## Further Reading

- [Succinct data structure - Wikipedia](https://en.wikipedia.org/wiki/Succinct_data_structure)
- [The Succincter project](https://github.com/ot/succinct)
- [SDSL library](https://github.com/simongog/sdsl-lite)

