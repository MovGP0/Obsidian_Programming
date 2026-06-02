A **suffix tree** is a compressed trie containing every suffix of a string. It supports fast substring search because every substring is a prefix of some suffix.

After construction, substring existence can be checked in $O(m)$ for pattern length `m`. Suffix trees also support longest repeated substring, longest common substring, and many text-indexing queries. Construction can be linear with algorithms such as Ukkonen's algorithm, but implementation is complex.

## C\# Example

```csharp
var text = "banana$";
var suffixes = Enumerable.Range(0, text.Length)
    .Select(i => text[i..])
    .Order()
    .ToArray();

var containsAna = suffixes.Any(suffix => suffix.StartsWith("ana"));
Console.WriteLine(containsAna);
```

This simple suffix list demonstrates the search idea; a suffix tree compresses shared prefixes to avoid storing every suffix separately.

## Rust Example

```rust
let text = "banana$";
let mut suffixes: Vec<&str> = (0..text.len()).map(|i| &text[i..]).collect();
suffixes.sort_unstable();

let contains_ana = suffixes.iter().any(|suffix| suffix.starts_with("ana"));
println!("{contains_ana}");
```

## Further Reading

- [Suffix tree - Wikipedia](https://en.wikipedia.org/wiki/Suffix_tree)
- [Ukkonen's algorithm - Wikipedia](https://en.wikipedia.org/wiki/Ukkonen%27s_algorithm)
- [Gusfield, Algorithms on Strings, Trees, and Sequences](https://www.cambridge.org/core/books/algorithms-on-strings-trees-and-sequences/F0B095049C7E6EF5356F0A26686C20D3)
