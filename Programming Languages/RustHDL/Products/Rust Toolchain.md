# Rust Toolchain

The Rust toolchain is needed for RustHDL or RHDL projects. Install it separately from OSS CAD Suite.

## Provides

- `rustc`
- `cargo`
- `rustup`
- Cargo dependency management for `rust-hdl`, `rhdl`, and supporting crates.

## Install

Recommended installer:

- https://rustup.rs/

Windows:

```powershell
winget install Rustlang.Rustup
```

Verify:

```powershell
rustc --version
cargo --version
rustup --version
```

## Useful Commands

Create a project:

```powershell
cargo new gw2a_rusthdl_blinky
cd gw2a_rusthdl_blinky
```

Add RustHDL:

```powershell
cargo add rust-hdl
```

Run Rust code:

```powershell
cargo run --release
```
