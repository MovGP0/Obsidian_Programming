A **Fenwick tree**, or binary indexed tree, stores partial sums in an array using bit operations. It is simpler and more compact than a segment tree when the operation is invertible, such as prefix sums.

It supports point updates and prefix-sum queries in $O(\log n)$ using the least significant set bit to jump between responsible ranges.

## C\# Example

```csharp
public sealed class FenwickTree
{
    private readonly int[] _tree;

    public FenwickTree(int size)
    {
        _tree = new int[size + 1];
    }

    public void Add(int index, int delta)
    {
        for (index++; index < _tree.Length; index += index & -index)
        {
            _tree[index] += delta;
        }
    }

    public int PrefixSum(int index)
    {
        var sum = 0;

        for (index++; index > 0; index -= index & -index)
        {
            sum += _tree[index];
        }

        return sum;
    }
}
```

## Rust Example

```rust
struct FenwickTree {
    tree: Vec<i32>,
}

impl FenwickTree {
    fn new(size: usize) -> Self {
        Self { tree: vec![0; size + 1] }
    }

    fn add(&mut self, mut index: usize, delta: i32) {
        index += 1;

        while index < self.tree.len() {
            self.tree[index] += delta;
            index += index & (!index + 1);
        }
    }

    fn prefix_sum(&self, mut index: usize) -> i32 {
        index += 1;
        let mut sum = 0;

        while index > 0 {
            sum += self.tree[index];
            index -= index & (!index + 1);
        }

        sum
    }
}
```

## Further Reading

- [Fenwick tree - Wikipedia](https://en.wikipedia.org/wiki/Fenwick_tree)
- [CP-Algorithms: Fenwick Tree](https://cp-algorithms.com/data_structures/fenwick.html)
- [Topcoder: Binary Indexed Trees](https://www.topcoder.com/thrive/articles/Binary%20Indexed%20Trees)
