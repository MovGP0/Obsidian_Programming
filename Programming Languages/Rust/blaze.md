---
title: blaze
aliases:
  - Blaze Rust Compiler
  - ra-jit
tags:
  - rust
  - performance
  - compiler
  - tooling
source: "https://ix.dev/blaze/"
---
**blaze** is a drop-in replacement for `cargo build`/`run`/`test` that keeps a Rust project compiled in memory and, after an edit, recompiles only the functions that changed. It is made by [Indexable (ix)](https://ix.dev) (Y Combinator-backed) and was called **ra-jit** until 2026-10-24. Source: [github.com/indexable-inc/blaze](https://github.com/indexable-inc/blaze), licensed MIT or Apache-2.0.

> [!warning]
> blaze is young (dated releases since October 2026). Keep `cargo check` and your CI as the final word, and expect it to differ from [[cargo]] in places.

## Install

```sh
curl -fsSL https://ix.dev/blaze | sh                          # stable channel
curl -fsSL https://ix.dev/blaze | sh -s -- --channel canary   # newest release
curl -fsSL https://ix.dev/blaze | sh -s -- --version 0.20261028.0
```

- Supported: **macOS on Apple silicon** and **Linux on x86-64 / ARM64** (glibc 2.34+, i.e. RHEL 9, Debian 12, Ubuntu 22.04 or newer). No musl/Alpine, no Intel Macs.
- **Windows has no installer**. The installer suggests `cargo +<pinned nightly> install --locked blaze-engine` instead, and v2 has not been tested on Windows.
- Installs `blaze` and its helper programs into `~/.cargo/bin`; downloads its own Rust toolchain once (about 125 to 160 MB). Rust/rustup is **not** required.
- Needs a C compiler for linking (`gcc`/`cc` on Linux, Xcode command line tools on macOS).
- Build scripts and proc macros run in a sandbox (Linux namespaces or Landlock). In locked-down containers use `--security-opt seccomp=unconfined` or set `BLAZE_SANDBOX=off`.
- Releases are versioned by date: `0.YYYYMMDD.N`. Channels: **stable** (passed heavy tests on real projects) and **canary** (newest, promoted unchanged once it passes).
- `blaze update` upgrades. A workspace can pin a release with `[workspace.metadata.blaze] version` in `Cargo.toml` (`blaze pin <version>`).

## Usage

Use `blaze` wherever you would use `cargo`; it takes cargo's flags:

```text
blaze build   # like cargo build
blaze check   # like cargo check
blaze run     # like cargo run
blaze test    # like cargo test
blaze bench   # like cargo bench
```

Other cargo commands (`add`, `publish`, `fmt`, …) are not handled by blaze yet. No changes to the project's code are needed.

## How It Works

- The first build loads the project and compiles every crate **without running cargo or rustc**.
- A background **daemon** keeps the compiled project in memory. After an edit it recompiles only the changed functions and relinks with its own linker.
- Built on [rust-analyzer](https://github.com/rust-lang/rust-analyzer) (analysis and MIR), [Cranelift](https://cranelift.dev) (fast code generation), LLVM via inkwell (optimised tiers), [salsa](https://github.com/salsa-rs/salsa) (incremental engine) and [object](https://github.com/gimli-rs/object) (executable files).
- **Live edits** (v1, macOS on Apple silicon): about 20 ms from saving a file to the *running* program using the new code. Inspired by Makepad's live coding.
- One shared **build store** for every checkout, so a new git worktree reuses what other checkouts built. The store collects its own garbage, unlike `target/`, which grows until `cargo clean`.
- **Deterministic builds**: `build.rs` runs inside blaze, tools it starts (such as a C compiler) run in a deterministic hypervisor, and proc macros run as WebAssembly without file or network access.
- Test time limits count the work done, not wall-clock time, so slow machines do not cause flaky timeouts.

### Toolchain

blaze is its own toolchain. It builds every project with its pinned nightly (`blaze-2026-10-27`, i.e. `rustc 1.101.0-nightly`), **whatever `rust-toolchain.toml` says**. Stable code and `#![feature(...)]` code both build, but code the pinned nightly cannot build fails.

## Performance

The reported numbers are from blaze v1 (v2 has not been measured yet). On average, edits rebuild **10× faster** on macOS arm64, **24× faster** on Linux aarch64 and **11× faster** on Linux x86-64 than `cargo build`.

| Edit one function, then build (Linux x86-64) | `cargo build` | `blaze build` |
| --- | ---: | ---: |
| ripgrep | 508 ms | **56 ms** (9.1×) |
| nushell | 1.25 s | **236 ms** (5.3×) |
| helix | 2.15 s | **116 ms** (19×) |
| bun (1.25M lines of Rust) | 9.11 s | **451 ms** (20×) |

> [!important]
> blaze **trades memory for speed**. The daemon holds a few GB for a small project and tens of GB for the largest ones.

Full numbers: [ix.dev/blaze/bench](https://ix.dev/blaze/bench).

## Roadmap

From the project page, not yet available:

- **Capability-based security** (opt-in): code only touches what it is handed, e.g. `fn main(cx: &Cx, out: Out, data: Dir<ReadOnly>)` can print and read one folder, nothing else.
- An **opt-in "batteries included" standard library** meant to replace common crates.io dependencies and reduce supply-chain risk.
- A **compiler proved correct**: passes proved against a formal semantics of MIR in Lean 4 (in progress).
- **GPU** shaders and compute kernels in plain Rust (in progress).
- **Its own backend without LLVM**, with blaze-specific calling conventions instead of the C ABI.

## See also

- [[cargo]]
- [[rustc]]
- [[Rust Performance Optimizations]]
- [Cargo compatibility](https://github.com/indexable-inc/blaze/blob/main/docs/cargo.md)
- [Using blaze](https://github.com/indexable-inc/blaze/blob/main/docs/usage.md)
- [How it works (v2 plan)](https://github.com/indexable-inc/blaze/blob/main/docs/v2/plan.md)
