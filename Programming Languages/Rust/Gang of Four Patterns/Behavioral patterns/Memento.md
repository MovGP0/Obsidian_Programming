Capture and save the internal state of an object without violating encapsulation

```rust
// Memento struct to store the internal state of the originator
struct Memento {
    state: String,
}

// Originator struct that creates and restores the mementos
struct Originator {
    state: String,
}

impl Originator {
    // Creates a new memento with the current state
    fn create_memento(&self) -> Memento {
        Memento { state: self.state.clone() }
    }

    // Restores the state from a memento
    fn restore_memento(&mut self, memento: &Memento) {
        self.state = memento.state.clone();
    }

    // Changes the state of the originator
    fn set_state(&mut self, state: String) {
        self.state = state;
    }

    // Prints the current state of the originator
    fn print_state(&self) {
        println!("Current state: {}", self.state);
    }
}

// Caretaker struct that stores and retrieves mementos
struct Caretaker {
    mementos: Vec<Memento>,
}

impl Caretaker {
    // Adds a memento to the list
    fn add_memento(&mut self, memento: Memento) {
        self.mementos.push(memento);
    }

    // Retrieves a memento from the list
    fn get_memento(&self, index: usize) -> Option<&Memento> {
        self.mementos.get(index)
    }
}

fn main() {
    // Create an originator and a caretaker
    let mut originator = Originator { state: String::from("State 1") };
    let mut caretaker = Caretaker { mementos: Vec::new() };

    // Change the state of the originator and add a memento to the caretaker
    originator.set_state(String::from("State 2"));
    caretaker.add_memento(originator.create_memento());

    // Change the state of the originator again and add another memento to the caretaker
    originator.set_state(String::from("State 3"));
    caretaker.add_memento(originator.create_memento());

    // Print the current state of the originator
    originator.print_state();

    // Restore the originator's state to a previous state using a memento
    if let Some(memento) = caretaker.get_memento(0) {
        originator.restore_memento(memento);
    }

    // Print the current state of the originator after restoring it
    originator.print_state();
}
```