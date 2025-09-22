## Setup

Install updates for the Rust toolchain

![[Rust Install Updates]]

Install GCC Compiler
```shell
scoop install avr-gcc
```

Tool for creating projects from templates
```shell
cargo install cargo-generate
```

Install [ravedude](https://docs.rs/crate/ravedude/latest) for flashing the microcontroller
```shell
scoop install avrdude
cargo +stable install ravedude
```

## Create and edit the source code

Create project from template
```shell
cargo generate --git https://github.com/Rahix/avr-hal-template.git
```

Edit the program (`src/main.rs`)
```rust
#![no_std]
#![no_main]

use panic_halt as _; // Panic handler
use arduino_hal::prelude::*;

#[arduino_hal::entry]
fn main() -> ! {
    let dp = arduino_hal::Peripherals::take().unwrap();
    let mut pins = arduino_hal::pins!(dp);
    let mut led = pins.d13.into_output();

    loop {
        led.toggle();
        arduino_hal::delay_ms(1000);
    }
}
```

## Flash the Microcontroller

After connecting the Arduino, set the COM port for ravedue per environment variable:
```
$env:RAVEDUDE_PORT="COMx"
```

Compile and run the app
```shell
cargo run
```