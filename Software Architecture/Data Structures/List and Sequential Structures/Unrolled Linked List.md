An **unrolled linked list** stores multiple elements in each node instead of one. This reduces pointer overhead and improves cache locality while keeping node-level insertion flexibility.

## Key Points

- Each node usually owns a small array and a count of occupied slots.
- Implementations split or merge blocks as they become too full or too empty.

## C\# Example

```csharp
var blocks = new LinkedList<List<int>>();
blocks.AddLast(new List<int> { 1, 2, 3 });
blocks.AddLast(new List<int> { 4, 5 });

foreach (var block in blocks)
{
    foreach (var value in block)
    {
        Console.WriteLine(value);
    }
}
```

## Rust Example

```rust
use std::collections::LinkedList;

let mut blocks: LinkedList<Vec<i32>> = LinkedList::new();
blocks.push_back(vec![1, 2, 3]);
blocks.push_back(vec![4, 5]);

for block in &blocks {
    for value in block {
        println!("{value}");
    }
}
```

## Further Reading

- <https://en.wikipedia.org/wiki/Unrolled_linked_list>
- <https://opendatastructures.org/ods-cpp/3_3_SEList_Space_Efficient_.html>
- <https://en.wikipedia.org/wiki/Linked_list>
