loose coupling between objects by encapsulating their interactions within a mediator object

```rust
// Mediator trait that defines the interface for communicating with the colleagues
trait Mediator {
    fn send(&self, message: &str, colleague: &Colleague);
}

// Colleague trait that defines the interface for communicating with the mediator and other colleagues
trait Colleague {
    fn set_mediator(&mut self, mediator: Box<dyn Mediator>);
    fn send(&self, message: &str);
    fn receive(&self, message: &str);
}

// Concrete mediator struct that implements the Mediator trait
struct ConcreteMediator {
    colleagues: Vec<Box<dyn Colleague>>,
}

impl ConcreteMediator {
    // Adds a colleague to the list
    fn add_colleague(&mut self, colleague: Box<dyn Colleague>) {
        colleague.set_mediator(Box::new(self));
        self.colleagues.push(colleague);
    }
}

impl Mediator for ConcreteMediator {
    // Sends a message to all the colleagues except the sender
    fn send(&self, message: &str, sender: &Colleague) {
        for colleague in &self.colleagues {
            if !std::ptr::eq(sender, colleague.as_ref()) {
                colleague.send(message);
            }
        }
    }
}

// Concrete colleague struct that implements the Colleague trait
struct ConcreteColleague {
    mediator: Option<Box<dyn Mediator>>,
    name: String,
}

impl Colleague for ConcreteColleague {
    // Sets the mediator for the colleague
    fn set_mediator(&mut self, mediator: Box<dyn Mediator>) {
        self.mediator = Some(mediator);
    }

    // Sends a message to all the colleagues through the mediator
    fn send(&self, message: &str) {
        if let Some(mediator) = &self.mediator {
            mediator.send(message, self);
        }
    }

    // Receives a message from a colleague
    fn receive(&self, message: &str) {
        println!("{} received a message: {}", self.name, message);
    }
}

fn main() {
    // Create a concrete mediator and two concrete colleagues
    let mut mediator = ConcreteMediator { colleagues: Vec::new() };
    let colleague1 = Box::new(ConcreteColleague { mediator: None, name: String::from("Colleague 1") });
    let colleague2 = Box::new(ConcreteColleague { mediator: None, name: String::from("Colleague 2") });

    // Add the colleagues to the mediator
    mediator.add_colleague(colleague1);
    mediator.add_colleague(colleague2);

    // Send a message from colleague 1 to all the colleagues
    if let Some(colleague) = mediator.colleagues.get(0) {
        colleague.send("Hello, everyone!");
    }

    // Send a message from colleague 2 to all the colleagues
    if let Some(colleague) = mediator.colleagues.get(1) {
        colleague.send("Hi, there!");
    }
}
```