### Stack  

Work with the stack  

| Symbol | Operator  | Description                        |
| ------ | --------- | ---------------------------------- |
| .      | duplicate | Duplicate the top stack element    |
| ,      | over      | Copy the second element to the top |
| ’      | around    | Rotate the top three elements      |
| :      | flip      | Swap the top two elements          |
| ◌      | pop       | Remove the top element             |
| ⟜      | on        | Place an element on top            |
| ⊸      | by        | Apply a function using top element |
| ⤙      | with      | Execute a function with arguments  |
| ⤚      | off       | Remove elements after function     |
| ◠      | above     | Place element above another        |
| ◡      | below     | Place element below another        |
| 𝄈     | backward  | Move stack pointer backward        |

### Constants  

Push a constant value onto the stack  

| Symbol | Operator | Description              |
|--------|----------|--------------------------|
| η      | eta      | Push the constant η      |
| π      | pi       | Push the constant π      |
| τ      | tau      | Push the constant τ      |
| ∞      | infinity | Push the constant ∞      |

### Monadic Pervasive  

Operate on every element in an array  

| Symbol | Operator       | Description              |
| ------ | -------------- | ------------------------ |
| ¬      | not            | Logical NOT              |
| ±      | sign           | Sign of a number         |
| ¯      | negate         | Negate a value           |
| ⌵      | absolute value | Absolute value           |
| √      | sqrt           | Square root              |
| ∿      | sine           | Sine of an angle         |
| ⌊      | floor          | Floor of a value         |
| ⌈      | ceiling        | Ceiling of a value       |
| ⁅      | round          | Round to nearest integer |

### Dyadic Pervasive  

Operate on every pair of elements in two arrays  

| Symbol | Operator         | Description                     |
| ------ | ---------------- | ------------------------------- |
| =      | equals           | Check equality                  |
| ≠      | not equals       | Check inequality                |
| <      | less than        | Check if less than              |
| ≤      | less or equal    | Check if less than or equal     |
| >      | greater than     | Check if greater than           |
| ≥      | greater or equal | Check if greater than or equal  |
| +      | add              | Add two values                  |
| -      | subtract         | Subtract one value from another |
| ×      | multiply         | Multiply two values             |
| ÷      | divide           | Divide one value by another     |
| ◿      | modulus          | Remainder after division        |
| ∨      | or               | Logical OR                      |
| ⁿ      | power            | Exponentiate                    |
| ₙ      | logarithm        | Calculate logarithm             |
| ↧      | minimum          | Minimum of two values           |
| ↥      | maximum          | Maximum of two values           |
| ∠      | atangent         | Arc tangent                     |
| ℂ      | complex          | Create complex number           |

### Monadic Array  

Operate on a single array  

| Symbol | Operator    | Description                   |
| ------ | ----------- | ----------------------------- |
| ⧻      | length      | Get the length of the array   |
| △      | shape       | Get the shape of the array    |
| ⇡      | range       | Create a range                |
| ⊢      | first       | Get the first element         |
| ⊣      | last        | Get the last element          |
| ⇌      | reverse     | Reverse the array             |
| ♭      | deshape     | Flatten the array             |
| ¤      | fix         | Fix values in the array       |
| ⋯      | bits        | Convert to bit representation |
| ⍉      | transpose   | Transpose the array           |
| ⍆      | sort        | Sort the array                |
| ⍏      | rise        | Incremental sorting           |
| ⍖      | fall        | Decremental sorting           |
| ⊚      | where       | Indices of non-zero elements  |
| ⊛      | classify    | Group elements by categories  |
| ◴      | deduplicate | Remove duplicate values       |
| ◰      | unique      | Extract unique values         |
| □      | box         | Box array elements            |

### Dyadic Array

Operate on two arrays

| Symbol | Operator | Description                       |
| ------ | -------- | --------------------------------- |
| ≍      | match    | Check if arrays match             |
| ⊟      | couple   | Couple elements from arrays       |
| ⊂      | join     | Join two arrays                   |
| ⊏      | select   | Select elements from an array     |
| ⊡      | pick     | Pick elements from arrays         |
| ↯      | reshape  | Reshape one array into another    |
| ☇      | rerank   | Reorder elements in the array     |
| ↙      | take     | Take elements from the start      |
| ↘      | drop     | Drop elements from the start      |
| ↻      | rotate   | Rotate elements in an array       |
| ⤸      | orient   | Orient elements in an array       |
| ◫      | windows  | Create sliding windows            |
| ▽      | keep     | Keep elements meeting a condition |
| ⌕      | find     | Find index of an element          |
| ⦷      | mask     | Apply a mask to an array          |
| ∊      | memberof | Check membership in array         |
| ⊗      | indexof  | Get index of a value in an array  |
| base   | base     | Convert to a different base       |

### Iterating Modifiers

Iterate and apply a function to an array or arrays

| Symbol | Operator  | Description                     |
| ------ | --------- | ------------------------------- |
| ∵      | each      | Apply function to each element  |
| ≡      | rows      | Apply function to each row      |
| ⍚      | inventory | Get inventory of elements       |
| ⊞      | table     | Create a table from elements    |
| ⧅      | tuples    | Generate tuples from arrays     |
| ⧈      | stencil   | Apply stencil operation         |
| ⍥      | repeat    | Repeat a function               |
| ⍢      | do        | Execute function with arguments |

### Aggregating Modifiers

Apply a function to aggregate an array

| Symbol | Operator  | Description                    |
| ------ | --------- | ------------------------------ |
| /      | reduce    | Reduce using a function        |
| ∧      | fold      | Fold elements with a function  |
| \      | scan      | Scan elements using a function |
| ⊕      | group     | Group elements                 |
| ⊜      | partition | Partition array                |

### Inversion Modifiers

Work with the inverses of functions

| Symbol | Operator | Description                      |
| ------ | -------- | -------------------------------- |
| ⌅      | obverse  | Apply inverse function           |
| °      | un       | Undo a function                  |
| ⌝      | anti     | Apply antithetical function      |
| ⍜      | under    | Apply function under constraints |

### 🌎 Planet 🪐

Advanced stack manipulation

| Symbol | Operator | Description                          |
| ------ | -------- | ------------------------------------ |
| ∘      | identity | Return the same value                |
| ⋅      | gap      | Separate stack elements              |
| ⊙      | dip      | Temporarily remove and reapply stack |
| 𝄐      | reach    | Access deeper elements in the stack  |
| ∩      | both     | Apply function to top two elements   |
| ⊃      | fork     | Fork execution                       |
| ⊓      | bracket  | Group stack elements                 |

### Other Modifiers

| Symbol | Operator | Description                |
| ------ | -------- | -------------------------- |
| ◇      | content  | Get content of a container |
| ⬚      | fill     | Fill a container           |
| ⨬      | switch   | Switch context or mode     |
| memo   | memo     | Store value in memory      |

### Debug

Debug your code

| Symbol | Operator | Description             |
| ------ | -------- | ----------------------- |
| ?      | stack    | Show the stack contents |
| ⸮      | trace    | Trace function calls    |
| dump   | dump     | Dump current state      |

### Thread

Work with OS threads

| Symbol  | Operator | Description                      |
| ------- | -------- | -------------------------------- |
| spawn   | spawn    | Start a new thread               |
| pool    | pool     | Manage a thread pool             |
| wait    | wait     | Wait for thread to finish        |
| send    | send     | Send data to a thread            |
| recv    | recv     | Receive data from a thread       |
| tryrecv | tryrecv  | Try to receive data non-blocking |

### Map

Use arrays as hash maps

| Symbol | Operator | Description               |
|--------|----------|---------------------------|
| map    | map      | Create a map              |
| insert | insert   | Insert into a map         |
| has    | has      | Check if map has a key    |
| get    | get      | Get value by key          |
| remove | remove   | Remove key-value pair     |

### Encoding

Convert to and from different encodings

| Symbol    | Operator  | Description               |
| --------- | --------- | ------------------------- |
| utf₈      | utf₈      | Encode/decode as UTF-8    |
| graphemes | graphemes | Break text into graphemes |
| json      | json      | Encode/decode JSON        |
| csv       | csv       | Encode/decode CSV         |
| xlsx      | xlsx      | Encode/decode Excel files |
| binary    | binary    | Encode/decode binary data |
| img       | img       | Encode/decode images      |
| gif       | gif       | Encode/decode GIFs        |
| audio     | audio     | Encode/decode audio files |
| layout    | layout    | Encode/decode layouts     |

### Miscellaneous

| Symbol   | Operator   | Description                      |
| -------- | ---------- | -------------------------------- |
| ⋕        | parse      | Parse input                      |
| ⍣        | try        | Attempt operation                |
| ⍩        | case       | Handle case conditions           |
| ⍤        | assert     | Assert a condition               |
| ⚂        | random     | Generate a random value          |
| gen      | gen        | Generate data                    |
| regex    | regex      | Perform regex operations         |
| tag      | tag        | Tag data                         |
| type     | type       | Get type of a value              |
| now      | now        | Get current time                 |
| datetime | datetime   | Work with date and time          |
| timezone | timezone   | Work with time zones             |
| fft      | fft        | Perform Fast Fourier Transform   |
| astar    | astar      | Execute A* pathfinding algorithm |
| path     | path       | Work with paths                  |
| ∂        | derivative | Calculate derivative             |
| ∫        | integral   | Calculate integral               |
| repr     | repr       | Get string representation        |
