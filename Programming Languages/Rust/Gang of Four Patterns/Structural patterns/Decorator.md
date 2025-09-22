Add behavior to an object without changing its interface.

In Rust, the Decorator pattern can be implemented using a combination of traits and structs.

```rust
trait Coffee {
    fn get_cost(&self) -> f64;
    fn get_description(&self) -> String;
}

struct SimpleCoffee;

impl Coffee for SimpleCoffee {
    fn get_cost(&self) -> f64 {
        1.0
    }

    fn get_description(&self) -> String {
        String::from("Simple coffee")
    }
}

struct MilkDecorator<'a> {
    coffee: &'a dyn Coffee,
}

impl<'a> MilkDecorator<'a> {
    fn new(coffee: &'a dyn Coffee) -> Self {
        MilkDecorator { coffee }
    }
}

impl<'a> Coffee for MilkDecorator<'a> {
    fn get_cost(&self) -> f64 {
        self.coffee.get_cost() + 0.5
    }

    fn get_description(&self) -> String {
        format!("{} with milk", self.coffee.get_description())
    }
}

struct SugarDecorator<'a> {
    coffee: &'a dyn Coffee,
}

impl<'a> SugarDecorator<'a> {
    fn new(coffee: &'a dyn Coffee) -> Self {
        SugarDecorator { coffee }
    }
}

impl<'a> Coffee for SugarDecorator<'a> {
    fn get_cost(&self) -> f64 {
        self.coffee.get_cost() + 0.25
    }

    fn get_description(&self) -> String {
        format!("{} with sugar", self.coffee.get_description())
    }
}
```

