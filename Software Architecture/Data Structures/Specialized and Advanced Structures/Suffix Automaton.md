A **suffix automaton** is a compact deterministic automaton that recognizes all substrings of a string. Each state represents an equivalence class of substrings that share the same set of ending positions.

It can be built online in linear time and is used for substring queries, counting distinct substrings, longest common substring, and repeated-pattern analysis.

## Operations

- Extend the automaton with one character at a time.
- Follow transitions to test whether a pattern is a substring.
- Use suffix links to maintain the minimal automaton while building.
- Aggregate state values for counting and frequency queries.

## C\# Example

```csharp
public sealed class State
{
    public int Link { get; set; } = -1;
    public int Length { get; set; }
    public Dictionary<char, int> Next { get; } = [];
}

var states = new List<State> { new() };
var last = 0;

void Extend(char c)
{
    var current = states.Count;
    states.Add(new State { Length = states[last].Length + 1 });
    var previous = last;

    while (previous >= 0 && !states[previous].Next.ContainsKey(c))
    {
        states[previous].Next[c] = current;
        previous = states[previous].Link;
    }

    states[current].Link = previous < 0 ? 0 : states[previous].Next[c];
    last = current;
}

foreach (var c in "aba")
{
    Extend(c);
}
```

## Rust Example

```rust
use std::collections::HashMap;

#[derive(Clone, Default)]
struct State {
    link: isize,
    len: usize,
    next: HashMap<char, usize>,
}

let mut states = vec![State { link: -1, ..State::default() }];
let mut last = 0usize;

for c in "aba".chars() {
    let current = states.len();
    states.push(State { len: states[last].len + 1, link: 0, next: HashMap::new() });

    let mut previous = last as isize;
    while previous >= 0 && !states[previous as usize].next.contains_key(&c) {
        states[previous as usize].next.insert(c, current);
        previous = states[previous as usize].link;
    }

    states[current].link = if previous < 0 {
        0
    } else {
        states[previous as usize].next[&c] as isize
    };
    last = current;
}
```

## Further Reading

- [Suffix automaton - CP-Algorithms](https://cp-algorithms.com/string/suffix-automaton.html)
- [Suffix automaton - Wikipedia](https://en.wikipedia.org/wiki/Suffix_automaton)
- [Algorithms on Strings, Trees, and Sequences](https://www.cambridge.org/core/books/algorithms-on-strings-trees-and-sequences/F0B095049C7E6EF5356F0A26686C20D3)

