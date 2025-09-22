
## Unit testing

Declare function under test
```rust
fn add_nums(x:i32, y:i32) -> i32 {
    x + y
}

fn mul_nums(x:i32, y:i32) -> i32 {
    x * y
}
```

Declare unit test fixture and tests
```rust
#[cfg(test)]
mod tests {
    user super::*;

    #[test]
    fn should_add_nums() {
        let result = add_nums(5, 10);
        assert_eq!(result, 15);
    }

    #[test]
    fn should_mul_nums() {
        let result = mul_nums(5, 10);
        assert_eq!(result, 50);
    }

    #[test]
    #[ignore = "not imlemented"]
    fn should_not_execute() { 
        unreachable!();
    }
}
```

Run tests
```powershell
cargo test # run all tests
cargo test should_mul_nums # run specific test
```

## Integration testing

Integration tests need to be placed in `\tests` folder, located in the same directory as the `\src` folder.

