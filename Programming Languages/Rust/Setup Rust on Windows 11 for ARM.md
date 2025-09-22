## Install Rust

Install Rust & ARM64 MSVC Toolchain
```sh
winget install rustup
rustup target add aarch64-pc-windows-msvc
```

## Visual Studio Build Tools

Install Visual Studio Build Tools with ARM64 Support.

Add the following workloads:
```
C++ Build Tools Core Features
MSVC v143 - VS 2022 C++ ARM64/ARM64EC build tools (Latest)
MSVC v143 - VS 2022 C++ ARM build tools (Latest)
Windows 11 SDK
```

## Configure Rust to Use `lld-link`

In `~/.cargo/config.toml`:
```toml
[target.aarch64-pc-windows-msvc]
linker = "lld-link"

# If needed, add explicit library paths:
rustflags = [
  "-Lnative=C:\\Program Files (x86)\\Microsoft Visual Studio\\2022\\BuildTools\\VC\\Tools\\MSVC\\14.44.35207\\lib\\arm64",
  "-Lnative=C:\\Program Files (x86)\\Windows Kits\\10\\Lib\\10.0.26100.0\\ucrt\\arm64",
  "-Lnative=C:\\Program Files (x86)\\Windows Kits\\10\\Lib\\10.0.26100.0\\um\\arm64",
]
```
