## Declare struct

```rust
#[derive(Debug)]
struct Employee {
    first_name: String,
    last_name: String;
    birthdate: NaiveDate, // using chrono
    email: String,
    sex: u8
}
```

Define extension methods using `impl`:
```rust
impl Employee {
    fn new(
	    first_name: String,
	    last_name: String,
	    birthdate: NaiveDate,
	    email: String,
	    sex: u8) -> Employee
    {
        return Employee {
	        first_name,
		    last_name;
		    birthdate,
		    email,
		    sex
	    };
    }

    fn get_name(&self) -> &str {
        concat!(&self.first_name, " ", &self.last_name)
    }

    fn set_sex(&mut self, sex: u8) {
        self.sex = sex;
    }

    fn with_sex(&self, sex: u8) -> Employee {
        return Employee {
            sex: sex,
            ..&self
        }
    }
}
```

## Create struct

```rust
let employee = Employee {
    first_name: String::from("Jane"),
    last_name: String::from("Doe"),
    birthdate: NaiveDate::from_ymd(1990, 10, 01),
    email: String::from("Jane Doe <jane.doe@example.com>"),
    sex: 1
}
```

## Create struct using function

```rust
fn create_employee(
    first_name: String,
    last_name: String,
    birthdate: NaiveDate,
    email: String,
    sex: u8) -> Employee
{
    return Employee {
        first_name,
	    last_name;
	    birthdate,
	    email,
	    sex
    };
}
```

## Update struct

```rust
let employee1 = create_employee(/* ... */);
let employee2 = Epmloyee {
    first_name: String::from("Max"),
    last_name: String::from("Mustermann"),
    ..employee1
};
```

## Declare tuple struct

```rust
struct Color(red: u8, green: u8, blue: u8, alpha: u8);
```

## Create tuple struct

```rust
let color = Color(red, green, blue, alpha);
```
