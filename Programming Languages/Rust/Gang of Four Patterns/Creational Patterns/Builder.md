separates the construction of a complex object from its representation, allowing the same construction process to create different representations

```rust
struct Pizza {
    dough: String,
    sauce: String,
    topping: Vec<String>,
}

impl Pizza {
    fn new(dough: &str, sauce: &str) -> PizzaBuilder {
        PizzaBuilder::new(dough, sauce)
    }
}

struct PizzaBuilder {
    pizza: Pizza,
}

impl PizzaBuilder {
    fn new(dough: &str, sauce: &str) -> PizzaBuilder {
        PizzaBuilder {
            pizza: Pizza {
                dough: String::from(dough),
                sauce: String::from(sauce),
                topping: Vec::new(),
            },
        }
    }

    fn add_topping(&mut self, topping: &str) -> &mut Self {
        self.pizza.topping.push(String::from(topping));
        self
    }

    fn build(&self) -> Pizza {
        Pizza {
            dough: self.pizza.dough.clone(),
            sauce: self.pizza.sauce.clone(),
            topping: self.pizza.topping.clone(),
        }
    }
}

fn main() {
    let pizza = Pizza::new("thin", "tomato")
        .add_topping("mushrooms")
        .add_topping("peppers")
        .add_topping("onions")
        .build();

    println!(
        "Your pizza has {} dough, {} sauce and toppings: {}",
        pizza.dough,
        pizza.sauce,
        pizza.topping.join(", ")
    );
}
```