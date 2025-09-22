Provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. It promotes loose coupling by abstracting the object creation process from the client code.

```rust
trait Vehicle {
    fn drive(&self);
}

struct Car;

impl Vehicle for Car {
    fn drive(&self) {
        println!("Driving a car");
    }
}

struct Truck;

impl Vehicle for Truck {
    fn drive(&self) {
        println!("Driving a truck");
    }
}

trait VehicleFactory {
    fn create(&self) -> Box<dyn Vehicle>;
}

struct CarFactory;

impl VehicleFactory for CarFactory {
    fn create(&self) -> Box<dyn Vehicle> {
        Box::new(Car)
    }
}

struct TruckFactory;

impl VehicleFactory for TruckFactory {
    fn create(&self) -> Box<dyn Vehicle> {
        Box::new(Truck)
    }
}

fn main() {
    let factory: Box<dyn VehicleFactory> = Box::new(CarFactory);
    let vehicle = factory.create();
    vehicle.drive();

    let factory: Box<dyn VehicleFactory> = Box::new(TruckFactory);
    let vehicle = factory.create();
    vehicle.drive();
}
```