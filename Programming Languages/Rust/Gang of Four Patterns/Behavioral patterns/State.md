```rust
// Define a trait for the state of a vending machine
trait VendingMachineState {
    fn insert_coin(&mut self, coin: u32);
    fn select_item(&mut self, item: u32) -> Option<String>;
}

// Define a struct for the vending machine that can change states
struct VendingMachine {
    state: Box<dyn VendingMachineState>,
    item_count: u32,
    total_money: u32,
}

impl VendingMachine {
    fn new(item_count: u32) -> Self {
        Self {
            state: Box::new(NoCoinState {}),
            item_count,
            total_money: 0,
        }
    }

    fn insert_coin(&mut self, coin: u32) {
        self.state.insert_coin(coin);
    }

    fn select_item(&mut self, item: u32) -> Option<String> {
        self.state.select_item(item)
    }

    fn set_state(&mut self, state: Box<dyn VendingMachineState>) {
        self.state = state;
    }
}

// Define a struct for the state of the vending machine when there is no coin inserted
struct NoCoinState {}

impl VendingMachineState for NoCoinState {
    fn insert_coin(&mut self, coin: u32) {
        println!("Coin inserted: {}", coin);
    }

    fn select_item(&mut self, _item: u32) -> Option<String> {
        println!("Please insert a coin first");
        None
    }
}

// Define a struct for the state of the vending machine when a coin is inserted
struct HasCoinState {}

impl VendingMachineState for HasCoinState {
    fn insert_coin(&mut self, coin: u32) {
        println!("Coin inserted: {}", coin);
    }

    fn select_item(&mut self, item: u32) -> Option<String> {
        if item == 1 {
            println!("Item 1 selected");
            Some("Item 1".to_owned())
        } else if item == 2 {
            println!("Item 2 selected");
            Some("Item 2".to_owned())
        } else {
            println!("Invalid item selected");
            None
        }
    }
}

fn main() {
    // Create a vending machine with 2 items and no coins inserted
    let mut vending_machine = VendingMachine::new(2);

    // Try to select an item without inserting a coin
    vending_machine.select_item(1); // Output: "Please insert a coin first"

    // Insert a coin and select an item
    vending_machine.insert_coin(25); // Output: "Coin inserted: 25"
    vending_machine.set_state(Box::new(HasCoinState {}));
    vending_machine.select_item(1); // Output: "Item 1 selected"

    // Try to select an invalid item
    vending_machine.select_item(3); // Output: "Invalid item selected"

    // Insert another coin and select another item
    vending_machine.insert_coin(10); // Output: "Coin inserted: 10"
    vending_machine.select_item(2); // Output: "Item 2 selected"

    // Try to select an item when there are no more items left
    vending_machine.select_item(1); // Output: "Please insert a coin first"
}
```

## Crates

- [State](https://crates.io/crates/state): A library that provides a framework for implementing the State pattern in Rust, including support for state transitions, guards, and actions.
- [finite-automata](https://crates.io/crates/finite-automata): A state machine library for Rust that allows you to define finite state machines with state transitions, actions, and guards.
- [rust-fsm](https://crates.io/crates/rust-fsm): A finite state machine library for Rust that allows to define state machines with transitions, actions, and guards.
