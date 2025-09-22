allows requests or commands to be encapsulated as objects, which can then be passed as parameters to methods or stored in lists for later execution.

```rust
// Define a trait for executing commands
trait Command {
    fn execute(&mut self);
}

// Define a struct that represents a command to add two numbers
struct AddCommand {
    receiver: Receiver,
    a: i32,
    b: i32,
}

impl AddCommand {
    fn new(receiver: Receiver, a: i32, b: i32) -> Self {
        AddCommand {
            receiver,
            a,
            b,
        }
    }
}

// Implement the Command trait for AddCommand
impl Command for AddCommand {
    fn execute(&mut self) {
        let result = self.a + self.b;
        self.receiver.receive(result);
    }
}

// Define a struct that will receive the result of the command
struct Receiver;

impl Receiver {
    fn receive(&self, result: i32) {
        println!("Result: {}", result);
    }
}

fn main() {
    // Create a receiver for the result of the command
    let receiver = Receiver;

    // Create a command to add two numbers and execute it
    let mut add_command = AddCommand::new(receiver, 2, 3);
    add_command.execute();
}

```