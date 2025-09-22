passes a request down a chain of handlers until one of the handlers can handle the request

```rust
// Define a trait for handling requests
trait Handler {
    fn handle(&self, request: &str) -> Option<&str>;
}

// Define a struct that represents a handler for a specific request
struct RequestHandler<'a> {
    next: Option<&'a dyn Handler>,
    request_type: &'static str,
    handled: bool,
}

impl<'a> RequestHandler<'a> {
    fn new(request_type: &'static str, next: Option<&'a dyn Handler>) -> Self {
        RequestHandler {
            next,
            request_type,
            handled: false,
        }
    }
}

// Implement the Handler trait for RequestHandler
impl<'a> Handler for RequestHandler<'a> {
    fn handle(&self, request: &str) -> Option<&str> {
        if request == self.request_type {
            self.handled = true;
            Some("Request handled by RequestHandler")
        } else {
            match self.next {
                Some(handler) => handler.handle(request),
                None => None,
            }
        }
    }
}

fn main() {
    // Create a chain of RequestHandlers
    let handler1 = RequestHandler::new("RequestType1", None);
    let handler2 = RequestHandler::new("RequestType2", Some(&handler1));
    let handler3 = RequestHandler::new("RequestType3", Some(&handler2));

    // Call handle method on the first handler in the chain
    let result = handler3.handle("RequestType2");

    // Check if the request was handled by one of the handlers
    match result {
        Some(response) => println!("{}", response),
        None => println!("Request not handled by any handler"),
    }
}
```