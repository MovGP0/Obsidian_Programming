---
title: Rust Performance Optimizations
aliases:
  - Optimizing Rust Code
tags:
  - rust
  - performance
  - optimization
source: "https://www.youtube.com/watch?v=r_VoEa8HlPk"
---
**Rust performance optimization** is the process of measuring a program's hot paths and removing work that does not contribute to its result. The video [BLAZINGLY FAST Rust Optimizations](https://www.youtube.com/watch?v=r_VoEa8HlPk) demonstrates four broadly useful techniques: avoid unnecessary allocations, avoid repeated lookups, parallelize independent work, and choose collection operations whose guarantees match the problem.

The examples use a function that scans a 20-million-line log, counts requests per user ID, and returns the ten most active users. The video's initial implementation takes roughly 1.5 seconds on the presenter's machine.

> [!important]
> The reported timings illustrate one workload on one machine. Benchmark the release build with representative input before deciding whether an optimization is worthwhile.

## Optimization Summary

| Time | Optimization | Main change | Result reported in the video |
| --- | --- | --- | --- |
| [0:00](https://www.youtube.com/watch?v=r_VoEa8HlPk&t=0s) | Do not materialize unused intermediate collections | Consume a lazy iterator directly instead of calling `collect()` | A small sum-of-squares example becomes about 3 times faster |
| [1:27](https://www.youtube.com/watch?v=r_VoEa8HlPk&t=87s) | Avoid unnecessary allocation | Borrow `&str` slices from the input and allocate only the ten returned IDs | Runtime falls from roughly 1.5 seconds to roughly 1 second, about 30% faster |
| [3:01](https://www.youtube.com/watch?v=r_VoEa8HlPk&t=181s) | Avoid repeated work | Replace `contains_key`, `insert`, and `get_mut` with one `entry` operation | A further 12% reduction |
| [3:51](https://www.youtube.com/watch?v=r_VoEa8HlPk&t=231s) | Use available CPU cores | Replace sequential line processing with Rayon's `par_lines`, `fold`, and `reduce` | Total runtime falls below 0.2 seconds, more than 7 times faster than the baseline |
| [5:13](https://www.youtube.com/watch?v=r_VoEa8HlPk&t=313s) | Do not preserve order when it is irrelevant | Replace `Vec::remove` with `Vec::swap_remove` | More than 7,000 times faster in the video's removal benchmark |

## Do Not Materialize Unused Intermediate Collections

[[Rust Iterators|Iterators]] are lazy. Adapter methods such as `map` describe a computation, while consuming methods such as `sum` execute it. Calling `collect` in the middle creates a collection and writes every intermediate value into it.

```rust
fn sum_squares(values: &[u64]) -> u64
{
    values
        .iter()
        .map(|&value| value * value)
        .collect::<Vec<_>>()
        .iter()
        .sum()
}
```

If the vector itself is not needed, let `sum` consume the mapped iterator directly:

```rust
fn sum_squares(values: &[u64]) -> u64
{
    values
        .iter()
        .map(|&value| value * value)
        .sum()
}
```

This avoids allocation, writes to the temporary vector, and a second traversal. `collect` is not inherently slow; it is wasteful only when the materialized collection is not part of the required result.

## Borrow Data Instead of Cloning It

The first log-processing version converts every parsed user ID to an owned `String`. For 20 million lines, `to_owned` or `to_string` can cause 20 million heap allocations. Cloning the string for insertion can copy it again.

```rust
let user = line
    .split(',')
    .nth(1)
    .expect("missing user ID")
    .to_owned();

if !counts.contains_key(&user)
{
    counts.insert(user.clone(), 0);
}

*counts.get_mut(&user).expect("user was inserted") += 1;
```

Because each ID is already part of the input log, the map can borrow a string slice instead:

```rust
use std::collections::HashMap;

fn count_users(log: &str) -> HashMap<&str, usize>
{
    let mut counts = HashMap::new();

    for line in log.lines()
    {
        if let Some(user) = line.split(',').nth(1)
        {
            *counts.entry(user).or_insert(0) += 1;
        }
    }

    counts
}
```

The `&str` keys point into `log`, so the log must outlive the map and cannot be mutated while those slices exist. If the public function must return owned names, allocate only at the ownership boundary:

```rust
let result: Vec<(String, usize)> = ranked
    .into_iter()
    .take(10)
    .map(|(user, count)| (user.to_owned(), count))
    .collect();
```

This changes the example from millions of allocations to ten. See [[Rust Borrowing Rules]] and [[Rust Strings]] for the ownership model behind this technique.

## Use the Hash Map Entry API

`contains_key`, `insert`, and `get_mut` each have to locate a key. Performing them for the same user repeats hashing and table probing. The [[Rust Hash Map (Dictionary)|hash map]] entry API exposes the occupied or vacant slot after one lookup:

```rust
*counts.entry(user).or_insert(0) += 1;
```

`entry(user)` locates the slot, `or_insert(0)` initializes a missing counter, and the returned mutable reference is incremented. Besides reducing work, this expresses the intent—"get this counter or create it"—as one operation.

## Parallelize Independent Work with Rayon

The user count for one log line does not depend on another line. This makes the counting stage suitable for data parallelism. Rayon's `par_lines` distributes lines across worker threads; `fold` gives each worker a private map, avoiding a shared lock; and `reduce` merges the partial maps.

Add Rayon to the project:

```powershell
cargo add rayon
```

Then parallelize the counting stage:

```rust
use std::collections::HashMap;

use rayon::prelude::*;

fn count_users_parallel(log: &str) -> HashMap<&str, usize>
{
    log
        .par_lines()
        .filter_map(|line| line.split(',').nth(1))
        .fold(HashMap::new, |mut counts, user|
        {
            *counts.entry(user).or_insert(0) += 1;
            counts
        })
        .reduce(HashMap::new, |mut left, right|
        {
            for (user, count) in right
            {
                *left.entry(user).or_insert(0) += count;
            }

            left
        })
}
```

Parallelism is not automatically faster. Thread scheduling, splitting, and merging add overhead. It works best when the input is large, iterations are independent, and each unit performs enough CPU work to amortize that overhead. It may help little when storage I/O, memory bandwidth, or a serial stage is the actual bottleneck. See [[Rust Concurrency]].

## Use `swap_remove` When Order Does Not Matter

`Vec::remove(index)` preserves order by shifting every later element one position to the left. Removing near the front is therefore $O(n)$. `Vec::swap_remove(index)` moves the final element into the removed element's slot and shortens the vector, making removal $O(1)$ at the cost of changing order.

When sweeping idle sessions, remember that the swapped-in element at `index` has not yet been checked:

```rust
fn remove_idle_sessions(sessions: &mut Vec<Session>)
{
    let mut index = 0;

    while index < sessions.len()
    {
        if sessions[index].is_idle()
        {
            sessions.swap_remove(index);
        }
        else
        {
            index += 1;
        }
    }
}
```

Use `swap_remove` only when element order and stable indices are irrelevant. If order matters, `remove`, `retain`, or a different data structure may be the correct choice. See [[Rust Vector]].

## Practical Optimization Workflow

1. Build and benchmark optimized code, for example with `cargo bench` or a representative workload in `cargo run --release`.
2. Find the hot path with a profiler; do not optimize code that contributes little to total runtime.
3. Remove unnecessary work before introducing concurrency: allocations, copies, repeated lookups, and needless ordering guarantees.
4. Apply one change at a time and rerun the same benchmark.
5. Keep the optimization only when its measured gain justifies its complexity and constraints.

The examples deliberately use `split(',')` to match the video. Production CSV containing quoting or escaped commas requires a real CSV parser.

## Sources

- [BLAZINGLY FAST Rust Optimizations](https://www.youtube.com/watch?v=r_VoEa8HlPk) — Let's Get Rusty; transcript and benchmark examples used throughout this article
- [Processing a Series of Items with Iterators](https://doc.rust-lang.org/stable/book/ch13-02-iterators.html) — The Rust Programming Language
- [`HashMap::entry`](https://doc.rust-lang.org/std/collections/struct.HashMap.html#method.entry) — Rust standard library
- [`Vec::swap_remove`](https://doc.rust-lang.org/std/vec/struct.Vec.html#method.swap_remove) — Rust standard library
- [`rayon::str::ParallelString`](https://docs.rs/rayon/latest/rayon/str/trait.ParallelString.html) — Rayon documentation
