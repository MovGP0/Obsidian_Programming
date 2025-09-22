
Enums are represented by [Tagget Unions](https://en.wikipedia.org/wiki/Tagged_union).

## Declare enum

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Sex {
    Male,
    Female,
    Other,
    NotApplicable,
    Unknown,
    NonBinary,
    Ambiguous
}
```

Match operator:
```rust
impl Sex {
	fn get_sex_string(&self) -> &'static str { 
		return match &self { 
			AdministrativeSex::Male => "M",
			AdministrativeSex::Female => "F",
			AdministrativeSex::Other => "O",
			AdministrativeSex::Unknown => "U",
			AdministrativeSex::NotApplicable => "N",
			AdministrativeSex::Unknown => "U",
		    AdministrativeSex::NonBinary => "X",
		    AdministrativeSex::Ambiguous => "A",
		    _ => unreachable!()
		};
	}
}
```

Usage:
```rust
let sex = Sex::Male;
let sex_string = sex.get_sex_string();
```

## Enum with data

Enum values can have a data assinged.

### DayOfWeek

Example with integer values:
```rust
enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
}
```

Values can also be any type:
```rust
enum DayOfWeek {
    Sunday = { number: 0, name: "Sunday".to_string(), is_weekend: true },
    Monday = { number: 1, name: "Monday".to_string(), is_weekend: false },
    Tuesday = { number: 2, name: "Tuesday".to_string(), is_weekend: false },
    Wednesday = { number: 3, name: "Wednesday".to_string(), is_weekend: false },
    Thursday = { number: 4, name: "Thursday".to_string(), is_weekend: false },
    Friday = { number: 5, name: "Friday".to_string(), is_weekend: false },
    Saturday = { number: 5, name: "Saturday".to_string(), is_weekend: true },
}
```

## Important Enums

### Option

Option type is declared as:
```rust
enum Option<T> {
    Some(T),
    None
}
```

Usage:
```rust
let some = Option::Some(true);
let none = Option::None;
```

```rust
fn get_user_id(name: &str) -> Option {
	if database.user_exists(name) { 
		return Some(database.get_id(name));
	}
	return None;
}
```

Unwrap in [[Rust if-else]] statement:
```rust
let wrapped_value = Option::Some(100_usize);
if let Some(the_value) = wrapped_value {
    println!("Some: {}" the_value);
}
else {
    println!("None");
}
```

Unwrap using [[Rust Match (Switch)]] statement:
```rust
let wrapped_value = Option::Some(100_usize);
match wrapped_value {
    Some(the_value) => println!("Some: {}" the_value),
    None => println!("None");
}
```

### Result

```rust
fn get_user(user_id: u32) -> Result<User, Error> {
	if is_logged_in(user_id) {
	    let user = get_user_by_id(user_id);
	    return Ok(user);
	}

    let error = Error { msg: "not logged in" };
	return Err(error);
}
```