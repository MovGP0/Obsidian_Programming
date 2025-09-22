Defines the skeleton of an algorithm in a base class but allows its subclasses to override certain steps of the algorithm without changing its structure.

```rust
trait Algorithm {
    fn initialize(&self);
    fn perform_operation(&self);
    fn finalize(&self);

    fn run(&self) {
        self.initialize();
        self.perform_operation();
        self.finalize();
    }
}

struct ConcreteAlgorithmA;

impl Algorithm for ConcreteAlgorithmA {
    fn initialize(&self) {
        println!("Algorithm A: initializing...");
    }

    fn perform_operation(&self) {
        println!("Algorithm A: performing operation...");
    }

    fn finalize(&self) {
        println!("Algorithm A: finalizing...");
    }
}

struct ConcreteAlgorithmB;

impl Algorithm for ConcreteAlgorithmB {
    fn initialize(&self) {
        println!("Algorithm B: initializing...");
    }

    fn perform_operation(&self) {
        println!("Algorithm B: performing operation...");
    }

    fn finalize(&self) {
        println!("Algorithm B: finalizing...");
    }
}

fn main() {
    let algorithm_a = ConcreteAlgorithmA;
    algorithm_a.run();

    let algorithm_b = ConcreteAlgorithmB;
    algorithm_b.run();
}
```