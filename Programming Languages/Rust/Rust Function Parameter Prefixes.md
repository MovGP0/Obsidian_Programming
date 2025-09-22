| Prefix | Description                        | Example                             |
| ------ | ---------------------------------- | ----------------------------------- |
|        | No prefix is transfer of ownership | `fn foobar(a: i32)`                 |
| `&`    | Borrow of reference                | `fn foobar(input: &str)`            |
| `mut`  | Marks input as mutable             | `fn foobar(mut a: String)`          |
| `impl` | Declares required trait            | `fn foobar(a: impl std::io::Write)` |
| `<T>`  | Generic type                       | `fn foobar<T>(a: T)`                |
