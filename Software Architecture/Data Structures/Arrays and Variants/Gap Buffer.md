A **gap buffer** stores text in one array with an unused gap at the cursor. Inserts at the cursor fill the gap cheaply; moving the cursor shifts text around the gap, making it a classic representation for text editors.

Use gap buffers for editable sequences where most edits happen near the current cursor position.

## C\# Example

```csharp
var left = new List<char>("hello".ToCharArray());
var right = new Stack<char>();

left.Add('!');
right.Push(left[^1]);
left.RemoveAt(left.Count - 1);
```

## Rust Example

```rust
let mut left: Vec<char> = "hello".chars().collect();
let mut right: Vec<char> = Vec::new();

left.push('!');
if let Some(ch) = left.pop()
{
    right.push(ch);
}
```

## Further Reading

- [Gap buffer - Wikipedia](https://en.wikipedia.org/wiki/Gap_buffer)
- [The Craft of Text Editing: Gap Buffer](https://web.mit.edu/~yandros/doc/craft-text-editing/Chapter-6.html)
- [Rust Vec](https://doc.rust-lang.org/std/vec/struct.Vec.html)
