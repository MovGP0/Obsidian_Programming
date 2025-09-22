Aims to minimize the memory usage of an application by sharing as much data as possible between multiple objects.

```rust
// Flyweight trait
trait Flyweight {
    fn operation(&self, extrinsic_state: &str);
}

// Concrete flyweight
struct ConcreteFlyweight {
    intrinsic_state: String,
}

impl ConcreteFlyweight {
    fn new(intrinsic_state: String) -> ConcreteFlyweight {
        ConcreteFlyweight {
            intrinsic_state,
        }
    }
}

impl Flyweight for ConcreteFlyweight {
    fn operation(&self, extrinsic_state: &str) {
        println!("ConcreteFlyweight: intrinsic={}, extrinsic={}", self.intrinsic_state, extrinsic_state);
    }
}

// Flyweight factory
struct FlyweightFactory {
    flyweights: Vec<ConcreteFlyweight>,
}

impl FlyweightFactory {
    fn new() -> FlyweightFactory {
        FlyweightFactory {
            flyweights: Vec::new(),
        }
    }

    fn get_flyweight(&mut self, intrinsic_state: &str) -> &ConcreteFlyweight {
        if let Some(flyweight) = self.flyweights.iter().find(|f| f.intrinsic_state == intrinsic_state) {
            flyweight
        } else {
            let flyweight = ConcreteFlyweight::new(intrinsic_state.to_owned());
            self.flyweights.push(flyweight);
            self.flyweights.last().unwrap()
        }
    }
}

// Client
fn main() {
    let mut factory = FlyweightFactory::new();

    let flyweight1 = factory.get_flyweight("intrinsic_state_1");
    flyweight1.operation("extrinsic_state_1");

    let flyweight2 = factory.get_flyweight("intrinsic_state_2");
    flyweight2.operation("extrinsic_state_2");

    let flyweight3 = factory.get_flyweight("intrinsic_state_1");
    flyweight3.operation("extrinsic_state_3");

    assert!(std::ptr::eq(flyweight1, flyweight3));
}
```