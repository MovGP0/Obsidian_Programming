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

## Desktop UI

| Library / Toolkit                                            | Rendering engine (typical)                                                                                                                                                           | Windows | Linux | macOS | Android | iOS | Web |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------: | ----: | ----: | ------: | --: | --: |
| [Dioxus](https://dioxuslabs.com/)                            | **Web:** DOM in browser<br>**Desktop/Mobile:** system **WebView** by default<br>experimental **WGPU** renderer available.                                                            |     Yes |   Yes |   Yes |     Yes | Yes | Yes |
| [Slint](https://slint.dev/)                                  | Native toolkit with selectable renderers: **Skia**, **FemtoVG** (OpenGL or wgpu->Metal/Vulkan/D3D), or software; **Web:** renders into HTML `<canvas>` using **WebGL** (no DOM/CSS). |     Yes |   Yes |   Yes |     Yes | Yes | Yes |
| [Bevy](https://bevy.org/) (game engine UI)                   | GPU via **wgpu**<br>Windows/macOS/Linux/Web/iOS/Android support.                                                                                                                     |     Yes |   Yes |   Yes |     Yes | Yes | Yes |
| [Tauri](https://github.com/tauri-apps/tauri) (app framework) | System **WebView** via WRY: <br>- WebView2 (Win)<br>- WKWebView (macOS/iOS)<br>- WebKitGTK (Linux)<br>- Android System WebView (Android).                                            |     Yes |   Yes |   Yes |     Yes | Yes | No* |
| [Iced](https://github.com/iced-rs/iced)                      | GPU via **wgpu** (native default renderer).<br>supports Windows/macOS/Linux/Web.                                                                                                     |     Yes |   Yes |   Yes |      No |  No | Yes |
| [egui](https://github.com/emilk/egui) (eframe)<br>           | Immediate-mode UI<br>typically GPU-backed via wgpu/glow in eframe                                                                                                                    |     Yes |   Yes |   Yes |     Yes |  No | Yes |

### Drawer Libraries

- https://github.com/rust-skia/rust-skia
- https://github.com/linebender/tiny-skia
- https://github.com/gfx-rs/wgpu

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
| [tracing-subscriber](https://docs.rs/tracing-subscriber)        |                                                         |

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

## Messaging / Channels

- https://docs.rs/tokio/latest/tokio/sync/broadcast/index.html
- https://docs.rs/async-broadcast
- https://docs.rs/flume
- https://docs.rs/crossbeam-channel

# Mapping

- https://crates.io/crates/automapper
- https://crates.io/crates/model-mapper
- https://crates.io/crates/mapper
- https://crates.io/crates/frunk

**Notes:**
- Rust commonly uses explicit conversion functions or `From`/`Into` implementations; `frunk` can help with structural transformations between types.

## Strong IDs

- https://crates.io/crates/typed_id
- https://crates.io/crates/strong_id
- https://crates.io/crates/newtype_derive
- https://crates.io/crates/derive_more

## Audio

- https://docs.rs/rodio
- https://docs.rs/cpal
- https://docs.rs/kira
- https://docs.rs/symphonia

Notes:
- `cpal` for low-level audio I/O, `rodio`/`kira` for playback, `symphonia` for decoding.

## Weak References

- https://doc.rust-lang.org/std/rc/struct.Weak.html
- https://crates.io/crates/weak-table
