A **segment tree** stores aggregate information for intervals of an array. Each internal node combines the values of its children, making it useful for range sums, minimums, maximums, and custom associative operations.

It supports range queries and point updates in $O(\log n)$. With lazy propagation, it can also support range updates efficiently.

## C\# Example

```csharp
public sealed class SegmentTree
{
    private readonly int[] _tree;
    private readonly int _size;

    public SegmentTree(int[] values)
    {
        _size = values.Length;
        _tree = new int[_size * 2];
        Array.Copy(values, 0, _tree, _size, _size);

        for (var i = _size - 1; i > 0; i--)
        {
            _tree[i] = _tree[i * 2] + _tree[i * 2 + 1];
        }
    }

    public int Query(int left, int right)
    {
        var sum = 0;

        for (left += _size, right += _size; left < right; left /= 2, right /= 2)
        {
            if ((left & 1) == 1)
            {
                sum += _tree[left++];
            }

            if ((right & 1) == 1)
            {
                sum += _tree[--right];
            }
        }

        return sum;
    }
}
```

## Rust Example

```rust
struct SegmentTree {
    tree: Vec<i32>,
    size: usize,
}

impl SegmentTree {
    fn new(values: &[i32]) -> Self {
        let size = values.len();
        let mut tree = vec![0; size * 2];
        tree[size..].copy_from_slice(values);

        for i in (1..size).rev() {
            tree[i] = tree[i * 2] + tree[i * 2 + 1];
        }

        Self { tree, size }
    }

    fn query(&self, mut left: usize, mut right: usize) -> i32 {
        left += self.size;
        right += self.size;
        let mut sum = 0;

        while left < right {
            if left % 2 == 1 {
                sum += self.tree[left];
                left += 1;
            }

            if right % 2 == 1 {
                right -= 1;
                sum += self.tree[right];
            }

            left /= 2;
            right /= 2;
        }

        sum
    }
}
```

## Further Reading

- [Segment tree - Wikipedia](https://en.wikipedia.org/wiki/Segment_tree)
- [CP-Algorithms: Segment Tree](https://cp-algorithms.com/data_structures/segment_tree.html)
- [Visualgo: Segment Tree](https://visualgo.net/en/segmenttree)
