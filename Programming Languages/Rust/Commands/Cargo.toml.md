[[Rust]] manifest file in [TOML](https://en.wikipedia.org/wiki/TOML) format.

## Example

```toml
[package]
name = "packagename" # Name of package
version = "1.0.0" # Version of package
authors = [ "Jane Doe <jane.doe@foobar.com>", "Max Mustermann <max.mustermann@foobar.com>" ]
edition = "2021" # Rust edition
description = "package description"
documentation = "https://foobar.com/project/doc/"
readme = "README.md"
homepage = "https://foobar.com/"
repository = "https://foobar.com/project/git"
license = "Apache-2.0"

[dependencies]
publish = false

# dependency on package from package repository
some-crate = { version = "1.0", registry = "my-registry" }

# dependency on git repository
regex = { git = "https://github.com/rust-lang/regex", branch = "main" }

[profile.release]
strip = true # enable tree shaking
opt-level = "s" # optimize for binary size instead of speed
lto = true # enable link-time optimization
codegen-units = 1 # size reduction but longer compile-time

[build-dependencies]
# dependencies for build-time only

[dev-dependencies]
# dependencies test/benchmark dependencies

[target]
# cross-compilation for different target architectures
```

## See also

- [The Manifest Format](https://doc.rust-lang.org/cargo/reference/manifest.html)
- [Specifying Dependencies](https://doc.rust-lang.org/cargo/reference/specifying-dependencies.html)