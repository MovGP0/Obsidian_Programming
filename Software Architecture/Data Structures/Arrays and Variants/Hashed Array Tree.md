A **hashed array tree** stores elements in fixed-size leaf arrays referenced by a top-level directory. It avoids copying one huge contiguous buffer on growth while still providing indexed access through directory and offset arithmetic.

Use hashed array trees when stable growth and reduced reallocation cost are more important than having one contiguous backing array.

## C\# Example

```csharp
const int BlockSize = 4;
var blocks = new List<int[]> { new int[BlockSize], new int[BlockSize] };

var index = 6;
blocks[index / BlockSize][index % BlockSize] = 42;

Console.WriteLine(blocks[1][2]);
```

## Rust Example

```rust
const BLOCK_SIZE: usize = 4;
let mut blocks = vec![[0; BLOCK_SIZE], [0; BLOCK_SIZE]];

let index = 6;
blocks[index / BLOCK_SIZE][index % BLOCK_SIZE] = 42;

println!("{}", blocks[1][2]);
```

## Further Reading

- [Hashed array tree - Wikipedia](https://en.wikipedia.org/wiki/Hashed_array_tree)
- [Tiered vector](https://en.wikipedia.org/wiki/Tiered_vector)
- [Rust Vec](https://doc.rust-lang.org/std/vec/struct.Vec.html)
