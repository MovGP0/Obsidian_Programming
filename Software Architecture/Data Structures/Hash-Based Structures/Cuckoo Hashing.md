**Cuckoo hashing** uses multiple hash functions and allows each key to live in one of several candidate locations. Insertion may evict an existing key and move it to its alternate location.

## Key Points

- Lookups are fast because only a small fixed number of positions need checking.
- Insertion can cycle; implementations detect this and resize or rebuild with new hash seeds.

## C\# Example

```csharp
var table1 = new Dictionary<int, string>();
var table2 = new Dictionary<int, string>();

table1[Hash1(42)] = "answer";

static int Hash1(int key)
{
    return key % 11;
}

static int Hash2(int key)
{
    return (key * 7) % 11;
}
```

## Rust Example

```rust
fn hash1(key: usize) -> usize {
    key % 11
}

fn hash2(key: usize) -> usize {
    (key * 7) % 11
}

let mut table1 = vec![None; 11];
let table2: Vec<Option<&str>> = vec![None; 11];
table1[hash1(42)] = Some("answer");
println!("{:?}", table2[hash2(42)]);
```

## Further Reading

- <https://en.wikipedia.org/wiki/Cuckoo_hashing>
- <https://www.cs.cmu.edu/~dga/papers/cuckoo-conext2005.pdf>
- <https://www.cs.princeton.edu/courses/archive/fall09/cos521/Handouts/cuckoo.pdf>
