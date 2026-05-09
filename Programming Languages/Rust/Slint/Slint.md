# Slint

## Slint UI Architecture (MVVM-like)

Slint does not enforce MVC/MVP/MVVM explicitly. In practice most apps are MVVM-like:

- View: .slint components
- ViewModel: global or root component properties + callbacks
- Model: Rust domain structs, services, persistence

Key differences from classic MVVM:
- No INotifyPropertyChanged or observers
- Dependency tracking is automatic

## Property Directions (Critical)

- in: written by parent/binding, read by component (inputs/config)
- out: written by component, read by parent (outputs/signals)
- in-out: shared state both ways

Directionality is enforced at compile time.

## Binding vs Assignment

Reactive binding (live updates):
```slint
child.value: parent.count;
```

One-time assignment (no updates):
```slint
child.value := parent.count;
```

Rule of thumb:
- : reactive binding
- = one-time assignment
- <=> two-way binding

## Properties vs Models

Use Property<T> when:
- The value is scalar or small and replaced as a whole

Use Model (VecModel or custom) when:
- Lists, tables, collections
- Incremental updates (row_added/row_removed)
- Large data sets

Mutating a Vec inside a property does not notify the UI.

## Dynamic / Responsive UI

Do not replace the UI from Rust. Keep one root Window and switch sub-components based on state:

```slint
if (AppVm.is_compact) : CompactView { }
else : RegularView { }
```

## Key Rules to Follow

- Bind properties in .slint, not in Rust
- Use global or root component as the ViewModel facade
- Never store references to conditional UI elements in Rust
- Prefer many small properties over one large state blob
- Use Model for collections

## Translations (Global Properties)

Use a global translation object with in-out string properties and bind UI text directly:

```slint
export global Translations {
    in-out property<string> settings_title;
    in-out property<string> dark_mode_label;
    in-out property<string> app_title;
}

Text { text: Translations.app_title; }
```

Set values from Rust at startup (or on locale change).

## Material Palette Binding

Material colors are exposed as out properties on MaterialPalette. Bind them directly to in/in-out color properties:

```slint
background: MaterialPalette.surface_container_low;
```

## Thread Stack Size

Large Slint component trees can exhaust the default thread stack. Run the UI on a dedicated thread and set its stack size explicitly.

### Dedicated UI thread (Rust)

Stack size is in bytes:

```rust
fn main() -> Result<(), slint::PlatformError> {
    let ui_thread = std::thread::Builder::new()
        .name("ui".to_string())
        .stack_size(8 * 1024 * 1024) // 8 MiB
        .spawn(run_ui)
        .map_err(|err| slint::PlatformError::from(format!("Failed to spawn UI thread: {err}")))?;

    match ui_thread.join() {
        Ok(result) => result,
        Err(_) => Err(slint::PlatformError::from("UI thread panicked")),
    }
}

fn run_ui() -> Result<(), slint::PlatformError> {
    // create/run Slint UI here
    Ok(())
}
```

Notes:
- stack_size uses bytes (8 * 1024 * 1024 for 8 MiB)
- Only apply this to native desktop targets (not WASM/Android entrypoints)

### WASM/Android limitations

- WASM: there is no OS thread stack you can resize at runtime. The WebAssembly stack is fixed by the module/toolchain, so you cannot change it per-thread from Rust. If you need more, adjust build/linker stack settings (toolchain-specific) or reduce stack usage (flatten recursion, move large locals to heap).
- Android: the UI must run on the main thread (Looper). You cannot change the main thread stack size from Rust. If you need more, reduce stack usage or move heavy work to a background thread, then marshal results back to the UI thread.

### Configurable stack size via TOML

Example Config.toml:

```toml
[ui]
stack_size_bytes = 8388608
```

Example load with fallback:

```rust
#[derive(serde::Deserialize)]
struct UiConfig {
    stack_size_bytes: Option<usize>,
}

#[derive(serde::Deserialize)]
struct AppConfig {
    ui: Option<UiConfig>,
}

fn load_stack_size_bytes() -> usize {
    let default_size = 8 * 1024 * 1024;
    let config_text = std::fs::read_to_string("Config.toml").ok();
    let config = config_text
        .and_then(|text| toml::from_str::<AppConfig>(&text).ok());

    config
        .and_then(|cfg| cfg.ui)
        .and_then(|ui| ui.stack_size_bytes)
        .unwrap_or(default_size)
}
```

Use it when spawning the UI thread:

```rust
let ui_thread = std::thread::Builder::new()
    .name("ui".to_string())
    .stack_size(load_stack_size_bytes())
    .spawn(run_ui)?;
```