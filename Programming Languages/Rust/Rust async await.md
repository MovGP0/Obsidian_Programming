In `Cargo.toml`
```toml
[dependencies]
futures = "0.3"
```

Function returns an object that implements the `Future<>` trait. The object can then be awaited.
```rust
async fn foo() -> u8 { 5 }

fn bar() -> impl Future<Output = u8> {
    async {
        let x: u8 = foo().await;
        return x + 5;
    }
}
```

Await multiple threads using `futures::join!`.
You can also use `block_on` to await tasks in synchronous functions.
```rust
use futures::executor::block_on;

async fn async_main()
{
	let f = foo();
	let b = bar();
	let (f_result, b_result) = futures::join!(f, b);
}

fn main()
{
	block_on(async_main());
}
```

Use `async move` to move the ownership of variables from outer scope to inner scope.
```rust
// without move, the variable can be used in multiple closures
// but inner functions cannot exist longer than the variable
// if a function may exist longer than a variable, the compiler throws an error
fn foo() -> impl Future<Output = ()>
{
	let my_string = "foo".to_string();

	let future_one = async { 
		println!("{my_string}");
	};

	let future_two = async { 
		println!("{my_string}");
	};

	let ((), ()) = futures::join!(future_one, future_two);
}

// with move, the variable can only be used in one closure
fn bar() -> impl Future<Output = ()>
{
	let my_string = "bar".to_string();
	async move
	{
		println!("{my_string}");
	}
}
```
