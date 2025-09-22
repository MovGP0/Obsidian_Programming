| Crate                                                    | Description                                                                                                                                                                                   |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [serde](https://crates.io/crates/serde)                  | framework for *ser*ializing and *de*serializing Rust data structures                                                                                                                          |
| [serde_json](https://crates.io/crates/serde_json)        |                                                                                                                                                                                               |
| [tokio](https://crates.io/crates/tokio)                  | asynchronous I/O                                                                                                                                                                              |
| [chrono](https://crates.io/crates/chrono)                | Date and Time library                                                                                                                                                                         |
| [evcxr_repl](https://crates.io/crates/evcxr_repl)        | Rust REPL and Jupyter Notebook Kernel                                                                                                                                                         |
| [itertools](https://docs.rs/itertools/latest/itertools/) | LINQ for Rust                                                                                                                                                                                 |
| [rayon](https://docs.rs/rayon/latest/rayon/)             | Parallel data processing (like TPL)                                                                                                                                                           |
| [byteview](https://crates.io/crates/byteview)            | Similar to `Span<T>` in .NET. Allows the passing of an array span instead of the array. See [When Rust's Arc is not enough](https://fjall-rs.github.io/post/fjall-2-6-byteview/) for details. |

## CLI

| Crate                                             | Description                  |
| ------------------------------------------------- | ---------------------------- |
| [clap](https://docs.rs/clap/latest/clap/)         | Command line argument parser |
| [RatatUI](https://github.com/ratatui-org/ratatui) | Command line UI library      |

## Web

| Crate                                                                                    | Description                          |
| ---------------------------------------------------------------------------------------- | ------------------------------------ |
| [html-to-string-macro](https://crates.io/crates/html-to-string-macro/0.2.5/dependencies) | Inline HTML                          |
| [axum](https://crates.io/crates/axum)                                                    | Axum Web Server Framework            |
| [tide](https://github.com/http-rs/tide)                                                  | Web Server Framework                 |
| [reqwest](https://docs.rs/reqwest/latest/reqwest/)                                       | HTTP Client library                  |
| [yew](https://yew.rs/)                                                                   | React alternative; WASM frontend     |
| [egui](https://github.com/emilk/egui)                                                    | Minimal high-performance web library |
| [rocket](https://rocket.rs/)                                                             | Backend API                          |
| [rustls](https://docs.rs/rustls/latest/rustls/)                                          | TLS library                          |

## Error handling

| Crate                                           | Description                                              |
| ----------------------------------------------- | -------------------------------------------------------- |
| [eyre](https://docs.rs/eyre/latest/eyre/)       | Create pretty formated exception objects; fork of anyhow |
| [anyhow](https://crates.io/crates/anyhow)       | Error type                                               |
| [thiserror](https://crates.io/crates/thiserror) | macros for the standard libraries                        |

## Logging and Tracing

| Crate                                                           | Description                                             |
| --------------------------------------------------------------- | ------------------------------------------------------- |
| [log](https://crates.io/crates/log)                             | logging facade                                          |
| [env_logger](https://crates.io/crates/env_logger)               | logger that can be configured via environment variables |
| [pretty_env_logger](https://crates.io/crates/pretty_env_logger) | colored output for log levels                           |
| [tracing](https://crates.io/crates/tracing)                     | Application-level tracing                               |
| [slog](https://crates.io/crates/slog)                           | Structured Logging                                      |

## Testing

| Crate                                        | Description   |
| -------------------------------------------- | ------------- |
| [rspec](https://github.com/rust-rspec/rspec) | BDD Framework |

## Databases

| Crate                                                  | Description |
| ------------------------------------------------------ | ----------- |
| [tiberius](https://docs.rs/tiberius/latest/tiberius/#) | SQL Server  |
| [sqlx](https://crates.io/crates/sqlx)                  | SQL Macros  |

## Mobile devices 

| Crate                       | Description          |
| --------------------------- | -------------------- |
| [Tauri](https://tauri.app/) | Mobile app framework |

## Embedded hardware

| Crate                           | Description      |
| ------------------------------- | ---------------- |
| [Embassy](https://embassy.dev/) | embedded library |

## Protobuf

| Crate                                                                   | Description |
| ----------------------------------------------------------------------- | ----------- |
| [Rust protobuf](https://docs.rs/protobuf/latest/protobuf/)              |             |
| [stepancheg/rust-protobuf](https://github.com/stepancheg/rust-protobuf) |             |
| [tokio-rs/prost](https://github.com/tokio-rs/prost)                     |             |
