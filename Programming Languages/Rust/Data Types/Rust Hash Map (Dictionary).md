```rust
use std::collection::HashMap;

fn main()
{
    let mut currencies = HashMap::new();
    currencies.Insert("USD", "$");
    currencies.Insert("EUR", "€");
    let eur = currencies.get("EUR");
    let usd = currencies["USD"];

    println!("{:?}", currencies);

    for (key, value) in &currencies {
        println!("{}: {}", key, value);
    }

    currencies.remove("EUR");
    currencies.remove("USD");
}
```

Use `my_map.entry(key).or_insert(value)` to add value if not existing.