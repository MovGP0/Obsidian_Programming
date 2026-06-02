An **interval tree** stores intervals and supports queries for intervals that overlap a point or another interval. It is commonly implemented as a balanced binary search tree ordered by interval start, with each node augmented by the maximum end value in its subtree.

The augmentation lets a search skip entire subtrees that cannot overlap the query. Insert, delete, and overlap search are typically $O(\log n)$ in a balanced tree, plus output size for reporting all matches.

## C\# Example

```csharp
public sealed record Interval(int Start, int End);

public static bool Overlaps(Interval left, Interval right)
{
    return left.Start <= right.End && right.Start <= left.End;
}

var meetings = new List<Interval>
{
    new(9, 11),
    new(13, 15)
};

var hasConflict = meetings.Any(meeting => Overlaps(meeting, new Interval(10, 12)));
```

## Rust Example

```rust
#[derive(Clone, Copy)]
struct Interval {
    start: i32,
    end: i32,
}

fn overlaps(left: Interval, right: Interval) -> bool {
    left.start <= right.end && right.start <= left.end
}

let intervals = [Interval { start: 9, end: 11 }, Interval { start: 13, end: 15 }];
let has_conflict = intervals.iter().any(|&item| {
    overlaps(item, Interval { start: 10, end: 12 })
});

println!("{has_conflict}");
```

These examples show the overlap predicate; a full interval tree adds balanced-tree navigation and max-end augmentation.

## Further Reading

- [Interval tree - Wikipedia](https://en.wikipedia.org/wiki/Interval_tree)
- [CLRS interval tree overview](https://walkccc.me/CLRS/Chap14/14.3/)
- [Interval overlap problem](https://en.wikipedia.org/wiki/Interval_scheduling)
