A **Count-Min Sketch** is a probabilistic frequency table for streaming data. It uses several hash functions, each mapping an item to a counter in a different row. Updates increment one counter per row, and queries return the minimum of those counters.

The estimate never undercounts when counters only increase, but hash collisions can overcount. It is useful for heavy-hitter detection, telemetry, approximate joins, and rate-limited analytics.

## Operations

- Add an item by incrementing one counter in each row.
- Estimate frequency by taking the minimum matching counter.
- Merge sketches with the same dimensions and hash functions by adding counters.
- Tune width and depth to trade memory for accuracy.

## C\# Example

```csharp
var counters = new int[3, 16];
var seeds = new[] { 17, 31, 43 };

int Index(string value, int seed)
{
    return Math.Abs(HashCode.Combine(value, seed)) % 16;
}

void Add(string value)
{
    for (var row = 0; row < seeds.Length; row++)
    {
        counters[row, Index(value, seeds[row])]++;
    }
}

int Estimate(string value)
{
    return Enumerable.Range(0, seeds.Length)
        .Min(row => counters[row, Index(value, seeds[row])]);
}

Add("cache-miss");
Add("cache-miss");
Console.WriteLine(Estimate("cache-miss"));
```

## Rust Example

```rust
fn hash(value: &str, seed: u64, width: usize) -> usize {
    let mut h = seed;
    for b in value.bytes() {
        h = h.wrapping_mul(1099511628211).wrapping_add(b as u64);
    }
    (h as usize) % width
}

let seeds = [17, 31, 43];
let width = 16;
let mut counters = vec![vec![0u32; width]; seeds.len()];

for (row, seed) in seeds.iter().enumerate() {
    counters[row][hash("cache-miss", *seed, width)] += 1;
}
```

## Further Reading

- [Count-Min Sketch - Wikipedia](https://en.wikipedia.org/wiki/Count%E2%80%93min_sketch)
- [An Improved Data Stream Summary: The Count-Min Sketch](https://dimacs.rutgers.edu/~graham/pubs/papers/cm-full.pdf)
- [RedisBloom Count-Min Sketch documentation](https://redis.io/docs/latest/develop/data-types/probabilistic/count-min-sketch/)
