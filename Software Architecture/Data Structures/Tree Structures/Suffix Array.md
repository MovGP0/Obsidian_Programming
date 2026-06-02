A **suffix array** stores the starting positions of all suffixes of a string in lexicographic order. It is a compact alternative to a suffix tree for substring search and text indexing.

To find a pattern, binary search the sorted suffixes and compare the pattern with suffix prefixes. Search costs $O(m \log n)$ with direct comparisons, or better with longest-common-prefix support.

## C\# Example

```csharp
static int[] BuildSuffixArray(string text)
{
    return Enumerable.Range(0, text.Length)
        .OrderBy(i => text[i..], StringComparer.Ordinal)
        .ToArray();
}

var text = "banana";
var suffixArray = BuildSuffixArray(text);
Console.WriteLine(string.Join(", ", suffixArray));
```

## Rust Example

```rust
fn suffix_array(text: &str) -> Vec<usize> {
    let mut indexes: Vec<usize> = (0..text.len()).collect();
    indexes.sort_by_key(|&i| &text[i..]);
    indexes
}

let indexes = suffix_array("banana");
println!("{indexes:?}");
```

These examples assume byte indexes that fall on valid character boundaries. For arbitrary Unicode text, build suffixes over bytes, scalar values, or grapheme clusters deliberately.

## Further Reading

- [Suffix array - Wikipedia](https://en.wikipedia.org/wiki/Suffix_array)
- [CP-Algorithms: Suffix Array](https://cp-algorithms.com/string/suffix-array.html)
- [Enhanced suffix array - Wikipedia](https://en.wikipedia.org/wiki/Enhanced_suffix_array)
