[[Rust]] package manager.

## Examples

Get version info
```bash
cargo --version
```

Get help
```powershell
cargo --help
cargo COMMAND --help
```

Create a new project
```powershell
cargo new 'PROJECTNAME' # crate .exe crate
cargo new --bin 'PROJECTNAME' # crate .exe crate
corgo new --lib 'LIBNAME' # create .dll crate
```

Check program
```powershell
cargo check
```

Run tests
```powershell
cargo test
```
*see also:* [[Rust Testing]]

Run benchmarks
```powershell
cargo bench
```

Build program
```powershell
cargo build # -dev version
cargo build -dev
cargo build -release
cargo build -test
cargo build -bench
```

Build and run program
```powershell
cargo run
```

Clean build
```powershell
cargo clean
```

Format code
```powershell
cargo fmt
```

## Clippy

Clippy throws error on compiler warning
```powershell
cargo clippy
```

Enable those parameters by default
```powershell
cargo clippy --fix -W clippy::pedantic -W clippy::nursery -W clippy::unwrap_used -W clippy::expect_used
```

Additional parameters see [Clippy](https://github.com/rust-lang/rust-clippy)