ensures that only one instance of a class can be created and provides global access to that instance

```rust
struct Database {
    data: Vec<String>,
}

impl Database {
    fn new() -> Self {
        Self { data: vec![] }
    }

    fn add_data(&mut self, data: String) {
        self.data.push(data);
    }

    fn print_data(&self) {
        println!("{:?}", self.data);
    }
}

struct DatabaseSingleton {
    database: Option<Database>,
}

impl DatabaseSingleton {
    fn new() -> Self {
        Self { database: None }
    }

    fn get_instance(&mut self) -> &mut Database {
        if self.database.is_none() {
            self.database = Some(Database::new());
        }
        self.database.as_mut().unwrap()
    }
}

fn main() {
    let mut db_singleton = DatabaseSingleton::new();
    let mut db1 = db_singleton.get_instance();
    let mut db2 = db_singleton.get_instance();

    db1.add_data("data1".to_string());
    db2.add_data("data2".to_string());

    db1.print_data();
}
```