Allows objects to notify other objects when their state changes.

```rust
// Define a trait for observers that can receive updates
trait Observer {
    fn update(&mut self, temperature: f64, humidity: f64, pressure: f64);
}

// Define a struct for weather data that can be observed
struct WeatherData {
    temperature: f64,
    humidity: f64,
    pressure: f64,
    observers: Vec<Box<dyn Observer>>,
}

impl WeatherData {
    fn new() -> Self {
        Self {
            temperature: 0.0,
            humidity: 0.0,
            pressure: 0.0,
            observers: vec![],
        }
    }

    fn add_observer(&mut self, observer: Box<dyn Observer>) {
        self.observers.push(observer);
    }

    fn remove_observer(&mut self, observer: &Box<dyn Observer>) {
        self.observers.retain(|o| o.as_ref() as *const _ != observer.as_ref() as *const _);
    }

    fn notify_observers(&mut self) {
        for observer in &mut self.observers {
            observer.update(self.temperature, self.humidity, self.pressure);
        }
    }

    fn set_measurements(&mut self, temperature: f64, humidity: f64, pressure: f64) {
        self.temperature = temperature;
        self.humidity = humidity;
        self.pressure = pressure;
        self.notify_observers();
    }
}

// Define a struct for a current conditions display that observes weather data
struct CurrentConditionsDisplay {
    temperature: f64,
    humidity: f64,
    pressure: f64,
}

impl CurrentConditionsDisplay {
    fn new() -> Self {
        Self {
            temperature: 0.0,
            humidity: 0.0,
            pressure: 0.0,
        }
    }
}

impl Observer for CurrentConditionsDisplay {
    fn update(&mut self, temperature: f64, humidity: f64, pressure: f64) {
        self.temperature = temperature;
        self.humidity = humidity;
        self.pressure = pressure;
        self.display();
    }
}

impl CurrentConditionsDisplay {
    fn display(&self) {
        println!(
            "Current conditions: {:.1}F degrees and {:.1}% humidity and {:.1} psi pressure",
            self.temperature, self.humidity, self.pressure
        );
    }
}

fn main() {
    // Create a weather data object
    let mut weather_data = WeatherData::new();

    // Create a current conditions display object and add it as an observer
    let mut current_conditions_display = CurrentConditionsDisplay::new();
    weather_data.add_observer(Box::new(current_conditions_display));

    // Set the weather data and observe the results
    weather_data.set_measurements(80.0, 65.0, 30.4); // Output: "Current conditions: 80.0F degrees and 65.0% humidity and 30.4 psi pressure"
    weather_data.set_measurements(82.0, 70.0, 29.2); // Output: "Current conditions: 82.0F degrees and 70.0% humidity and 29.2 psi pressure"

    // Remove the current conditions display as an observer
    weather_data.remove_observer(&Box::new(current_conditions_display));

    // Set the weather data again and observe that the current conditions display is not updated
    weather_data.set_measurements(78.0, 60.0, 29.8); // No output
}
```

## Crates

- Reactive-rs
- Frunk Reactive
- Tokio
- RxRust