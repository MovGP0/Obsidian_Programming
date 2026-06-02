A **disjoint-set**, or union-find, maintains a partition of items into non-overlapping sets. It supports finding an item representative and merging two sets.

## Key Points

- Path compression and union by rank make operations effectively constant for practical input sizes.
- It is widely used in Kruskal minimum-spanning-tree algorithms and connectivity queries.

## C\# Example

```csharp
var parent = Enumerable.Range(0, 5).ToArray();

int Find(int x)
{
    if (parent[x] != x)
    {
        parent[x] = Find(parent[x]);
    }

    return parent[x];
}

void Union(int a, int b)
{
    parent[Find(a)] = Find(b);
}

Union(1, 2);
Console.WriteLine(Find(1) == Find(2));
```

## Rust Example

```rust
fn find(parent: &mut [usize], x: usize) -> usize {
    if parent[x] != x {
        parent[x] = find(parent, parent[x]);
    }

    parent[x]
}

fn union(parent: &mut [usize], a: usize, b: usize) {
    let root_a = find(parent, a);
    let root_b = find(parent, b);
    parent[root_a] = root_b;
}

let mut parent: Vec<usize> = (0..5).collect();
union(&mut parent, 1, 2);
println!("{}", find(&mut parent, 1) == find(&mut parent, 2));
```

## Further Reading

- <https://en.wikipedia.org/wiki/Disjoint-set_data_structure>
- <https://cp-algorithms.com/data_structures/disjoint_set_union.html>
- <https://algs4.cs.princeton.edu/15uf/>
