An **LRU cache** evicts the least recently used entry when capacity is exceeded. It combines a dictionary for fast key lookup with an ordered structure that tracks recency.

The standard implementation uses a hash table plus a doubly linked list. Reads and writes move entries to the front; eviction removes from the back.

## Operations

- `Get` returns a value and marks it as recently used.
- `Put` inserts or updates a value and marks it as recently used.
- Evict the least recently used item when the capacity is full.
- Support `O(1)` lookup, update, and eviction with the hash table plus linked list design.

## C\# Example

```csharp
public sealed class LruCache<TKey, TValue> where TKey : notnull
{
    private readonly int _capacity;
    private readonly Dictionary<TKey, LinkedListNode<(TKey Key, TValue Value)>> _map = [];
    private readonly LinkedList<(TKey Key, TValue Value)> _list = [];

    public LruCache(int capacity)
    {
        _capacity = capacity;
    }

    public bool TryGet(TKey key, out TValue value)
    {
        if (!_map.TryGetValue(key, out var node))
        {
            value = default!;
            return false;
        }

        _list.Remove(node);
        _list.AddFirst(node);
        value = node.Value.Value;
        return true;
    }
}
```

## Rust Example

```rust
use std::collections::{HashMap, VecDeque};

struct LruCache {
    capacity: usize,
    values: HashMap<String, i32>,
    order: VecDeque<String>,
}

impl LruCache {
    fn touch(&mut self, key: &str) {
        self.order.retain(|existing| existing != key);
        self.order.push_front(key.to_string());
    }
}
```

## Further Reading

- [Cache replacement policies - Wikipedia](https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU))
- [LinkedList in .NET](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.linkedlist-1)
- [lru crate documentation](https://docs.rs/lru/latest/lru/)

