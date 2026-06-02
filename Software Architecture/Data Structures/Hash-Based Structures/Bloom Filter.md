A **Bloom filter** is a probabilistic membership structure backed by a bit array and several hash functions. It can say an item is definitely absent or possibly present.

## Key Points

- It never has false negatives for inserted items unless bits are cleared incorrectly.
- False-positive probability rises as more items are inserted.

## C\# Example

```csharp
var bits = new BitArray(128);
var value = "cache-key";

foreach (var index in Hashes(value, bits.Length))
{
    bits[index] = true;
}

var mightContain = Hashes(value, bits.Length).All(index => bits[index]);
Console.WriteLine(mightContain);

static IEnumerable<int> Hashes(string value, int length)
{
    yield return Math.Abs(value.GetHashCode()) % length;
    yield return Math.Abs(HashCode.Combine(value, 17)) % length;
}
```

## Rust Example

```rust
use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};

fn hash_with_seed(value: &str, seed: u64, len: usize) -> usize {
    let mut hasher = DefaultHasher::new();
    seed.hash(&mut hasher);
    value.hash(&mut hasher);
    (hasher.finish() as usize) % len
}

let mut bits = vec![false; 128];
for seed in [0, 1] {
    let index = hash_with_seed("cache-key", seed, bits.len());
    bits[index] = true;
}
```

## Further Reading

- <https://en.wikipedia.org/wiki/Bloom_filter>
- <https://llimllib.github.io/bloomfilter-tutorial/>
- <https://dl.acm.org/doi/10.1145/362686.362692>
