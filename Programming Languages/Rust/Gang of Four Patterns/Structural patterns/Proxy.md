Provides a surrogate or placeholder for another object to control access to it.

```rust
trait Image {
    fn display(&self);
}

struct RealImage {
    filename: String,
}

impl RealImage {
    fn new(filename: &str) -> RealImage {
        RealImage {
            filename: filename.to_string(),
        }
    }

    fn load_from_disk(&self) {
        println!("Loading {} from disk...", self.filename);
    }
}

struct ProxyImage {
    real_image: Option<RealImage>,
    filename: String,
}

impl ProxyImage {
    fn new(filename: &str) -> ProxyImage {
        ProxyImage {
            real_image: None,
            filename: filename.to_string(),
        }
    }

    fn get_real_image(&mut self) -> &RealImage {
        if self.real_image.is_none() {
            self.real_image = Some(RealImage::new(&self.filename));
        }

        self.real_image.as_ref().unwrap()
    }
}

impl Image for ProxyImage {
    fn display(&self) {
        self.get_real_image().load_from_disk();
        println!("Displaying {}...", self.filename);
    }
}
```
