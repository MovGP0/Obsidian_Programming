A **stack** is a last-in, first-out collection. Only the top is normally accessible, so push and pop are the defining operations.

## Key Points

- Stacks fit undo history, depth-first traversal, parsing, and call-frame management.
- Array-backed stacks are usually compact and fast.

## C\# Example

```csharp
var stack = new Stack<string>();
stack.Push("open");
stack.Push("save");

var next = stack.Pop();
Console.WriteLine(next);
```

## Rust Example

```rust
let mut stack = Vec::new();
stack.push("open");
stack.push("save");

if let Some(next) = stack.pop() {
    println!("{next}");
}
```

## Further Reading

- <https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>
- <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.stack-1>
- <https://doc.rust-lang.org/std/vec/struct.Vec.html#method.push>
