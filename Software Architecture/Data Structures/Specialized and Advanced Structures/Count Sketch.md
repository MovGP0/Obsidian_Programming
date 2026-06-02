**Count Sketch** is a probabilistic streaming structure for estimating item frequencies. Like Count-Min Sketch, it uses multiple hash tables, but each row also has a sign hash that adds or subtracts from the selected counter.

The signed updates make Count Sketch unbiased and better suited for estimating frequencies when updates may be negative or when inner products and second moments are important.

## Operations

- Update an item by adding `+delta` or `-delta` to one signed counter per row.
- Estimate frequency by taking the median signed estimate across rows.
- Merge compatible sketches by adding corresponding counters.
- Use more rows and wider rows to reduce error probability and collision error.

## C\# Example

```csharp
var counters = new int[3, 16];
var seeds = new[] { 11, 23, 37 };

int Bucket(string value, int seed)
{
    return Math.Abs(HashCode.Combine(value, seed)) % 16;
}

int Sign(string value, int seed)
{
    return HashCode.Combine(seed, value) % 2 == 0 ? 1 : -1;
}

void Update(string value, int delta)
{
    for (var row = 0; row < seeds.Length; row++)
    {
        counters[row, Bucket(value, seeds[row])] += Sign(value, seeds[row]) * delta;
    }
}

Update("login", 1);
Update("login", 1);
```

## Rust Example

```rust
fn hash(value: &str, seed: u64) -> u64 {
    value.bytes().fold(seed, |state, b| {
        state.wrapping_mul(16777619).wrapping_add(b as u64)
    })
}

let width = 16usize;
let seeds = [11, 23, 37];
let mut counters = vec![vec![0i32; width]; seeds.len()];

for (row, seed) in seeds.iter().enumerate() {
    let bucket = (hash("login", *seed) as usize) % width;
    let sign = if hash("login", seed + 1) % 2 == 0 { 1 } else { -1 };
    counters[row][bucket] += sign;
}
```

## Further Reading

- [Count sketch - Wikipedia](https://en.wikipedia.org/wiki/Count_sketch)
- [Finding Frequent Items in Data Streams](https://www.cs.rutgers.edu/~farach/pubs/FrequentStream.pdf)
- [Sketching as a Tool for Numerical Linear Algebra](https://arxiv.org/abs/1411.4357)

