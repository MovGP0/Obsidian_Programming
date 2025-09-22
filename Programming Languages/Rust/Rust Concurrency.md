- Shared-state concurrency
- Sync and Send Traits

## Create thread using `spawn()`

```rust
use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("spawned thread {}", i);
            thread::sleep(Duration::from_millis(2));
        }
    });

    for i in 1..10 {
        println!("main thread {}", i);
        thread::sleep(Duration::from_millis(2));
    }
}
```

## Await thread using `join()``

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let t1 = thread::spawn(|| {
        thread::sleep(Duration::from_millis(10));
        println!("done");
    });
    
    thread::sleep(Duration::from_millis(2));
    t.join().unwrap(); // await spawned thread
}
```

## Message passing using `channel()`

```rust
use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel(); // create a message queue with tx and rx endpoints
    let tx2 = tx.clone(); // create 2nd tx endpoint

    thread::spawn(move || {
        let num_vec = vec![1, 2, 3];
        for num in num_vec {
            tx.send(num).unwrap();
            thread::sleep(Duration::from_millis(2));
        }
    });

    thread::spawn(move || {
        let num_vec = vec![4, 5, 6];
        for num in num_vec {
            tx2.send(num).unwrap();
            thread::sleep(Duration::from_millis(2));
        }
    });

    for val in rx {
        println!("reveived {}", val);
    }
}
```

## Shared-state concurrency using `Mutex<T>`

Mutex = *Mut*ual *Ex*clusion

Dispose using scope
```rust
use std::sync::Mutex;

fn main() {
    let mu = Mutex::new(10); // wrap value 10 in mutex
    {
        let mut val = mu.lock().unwrap(); // get ownership of mutex
        println!("{:?}", val);
        *val += 1; // modify internal state via pointer
    } // finalize lock

    println!("{:?}", mu);
}
```

Dispose using `drop()`
```rust
use std::sync::Mutex;

fn main() {
    let mu = Mutex::new(10); // wrap value 10 in mutex
	let mut val = mu.lock().unwrap(); // get ownership of mutex
	println!("{:?}", val);
	*val += 1; // modify internal state via pointer
    std::mem::drop(val); // finalize lock
    println!("{:?}", mu);
}
```

## Shared-state concurrency using `Arc<T>`

`Arc<T>` is thread-save version of `Rc<T>` [[Rust Smart Pointers]].
`Arc<T>` wraps a `Mutex<T>`.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let val = Arc::new(Mutex::new(10));
    let mut t_handles = vec![];
	println!("{}", *val.lock().unwrap());
	
	// create 5 threads that increment the value
	for _ in 0..5 {
	     let val = val.clone();
	     let h = thread.spawn(move || {
	         let mut num = val.lock().unwrap();
	         *num = += 1;
	     });
	     t_handles.push(h);
	}

    // await all threads
    for h in t_handles {
        h.join().unwrap();
    }
}
```

- Prefer `Arc<[T]>` over `Vec<T>` when the data is read-only
	- Smaller size on stack (16 bytes vs 24)
	- Implements `Deref<T>`
	- Clone works in *O(1)*
- Use `Rc<T>` instead of `Arc<[T]>` when the data is not shared between threads.
- Use `Arc<str>` instead of `Arc<String>` to prevent double pointers to the character data.

## `Sync` and `Send` traits

- *Ownership* of objects with `Send` traits can be transferred between threads. Objects without `Send` trait can only be used within a single thread.
- *Reference* of objects with `Sync` trait can be transferred between threads. The object itself stays on a different thread.
