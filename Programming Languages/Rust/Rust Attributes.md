
## Common attributes

| Attribute                           | Description                                      |
| ----------------------------------- | ------------------------------------------------ |
| `#[derive(Debug)]`                  | Implements `std::fmt::Debug`                     |
| `#[derive(PartialEq, Eq)]`          | Implement `==` operators                         |
| `#[derive(Clone, Copy)]`            | Implement clone and copy operators               |
| `#[derive(Serialize, Deserialize)]` | Implement serialization/deserialization          |
| `#[derive(Hash)]`                   | Implement hash function                          |
| `#[repr(C)]`                        | Type layout should be compatible with C-language |
| `#[warn(dead_code)]`                | Emit warning for unused code                     |
| `#[allow(unused_variables)]`        | Suppress warning for unused variables            |
| `#![forbid(unsafe_code)]`           | Prevents unsave code                             |
