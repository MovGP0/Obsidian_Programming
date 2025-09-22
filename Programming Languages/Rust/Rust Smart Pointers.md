
## Reference Pointers

```rust
let x = 10;
let pointer_to_x = &x;
println!("{:p}", pointer_to_x); // output is pointer address in Hex
```

## Smart Pointers

Smart Pointers are monads that implement the `Deref` and `Drop` Traits. 
- `Deref` allows for the dereference of the value using the `*` operator. 
- `Drop` disposes the reference when no longer used.

*See also:* [[Rust Generics and Traits]]

### Boxing: Box\<T\>

Used to put a value on the heap instead on the stack.

```rust
let x = 30;
let box_of_x = Box::new(x);
println!("{}", box_of_x); // output is 30
```

### Reference Counter: Rc\<T\>

```rust
use std::rc::Rc;

let x = 30;
let rc = Rc::new(x);
let ptr_x1 = Rc::clone(&rc);
let ptr_x2 = Rc::clone(&rc);
let count = Rc::strong_count(&rc);
println!("{}", count); // 3 references

let sum = *ptr_x1 + *ptr_x2; // use * to dereference value
println!("{}", sum); // 60
```

### RefCell\<T\>

Implements the **Interior Mutability Pattern**. Allows for the mutation of an immutable object. May cause an runtime panic (exception) instead of an compiler error when used improperly. Typically used with `Rc<T>` pointers.

```rust
use std::rc::Rc;
use std::cell::RefCell;

let x = 5;
let rc = RefCell::new(x);
let mut x_mut = rc.borrow_mut(); // will panic if already borrowed
*x_mut += 1;

let borrowed_x: Ref<i32> = rc.borrow();
```

### RwLock\<T\>

Thread-save version of `RefCell<T>` with locking.

### Cow

Copy-on-Write will create a clone of the object only when the object gets mutated.

The object must implement the `Clone` trait.
```rust
#[derive(Clone)]
struct Person
{
	pub firstName: String,
	pub lastName: String
}
```
```rust
struct Person
{
	pub firstName: String,
	pub lastName: String
}

impl Clone for Person
{
	fn clone(&self) -> Self
	{
		return Person
		{
			firstName: self.firstName,
			lastName: self.lastName
		}
	}
}
```

- [std::borrow::Cow](https://doc.rust-lang.org/std/borrow/enum.Cow.html)