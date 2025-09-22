Code is structured in modules
```rust
mod ModuleName {
  // code for module
}
```

Module import
```rust
mod ModuleName;

// use module here
```

- Use `Module::SubModule::Object::Function` to access object with absolute reference.
- Use `super::` to access parent module.

When a file `mod.rs` is created, all files in the same directory are considered part of the module.