An **active data structure** maintains derived information automatically as updates occur. Instead of forcing clients to recompute query results from scratch, update operations also adjust indexes, summaries, constraints, or dependent views.

The term is used broadly for structures that react to changes, such as self-maintaining indexes, kinetic data structures, incremental graph summaries, and observable collections in application architectures.

## Operations

- Update base data and derived metadata together.
- Notify observers or invalidate cached query results.
- Maintain invariants such as sorted order, aggregate counts, or spatial bounds.
- Trade slower writes for faster reads and fresher derived state.

## C\# Example

```csharp
public sealed class ActiveSet
{
    private readonly HashSet<string> _items = [];

    public int Count { get; private set; }

    public bool Add(string item)
    {
        if (!_items.Add(item))
        {
            return false;
        }

        Count = _items.Count;
        return true;
    }
}

var set = new ActiveSet();
set.Add("alpha");
Console.WriteLine(set.Count);
```

## Rust Example

```rust
use std::collections::HashSet;

struct ActiveSet {
    items: HashSet<String>,
    count: usize,
}

impl ActiveSet {
    fn add(&mut self, item: String) -> bool {
        let added = self.items.insert(item);
        if added {
            self.count = self.items.len();
        }
        added
    }
}
```

## Further Reading

- [Kinetic data structure - Wikipedia](https://en.wikipedia.org/wiki/Kinetic_data_structure)
- [Incremental computing - Wikipedia](https://en.wikipedia.org/wiki/Incremental_computing)
- [ObservableCollection in .NET](https://learn.microsoft.com/en-us/dotnet/api/system.collections.objectmodel.observablecollection-1)

