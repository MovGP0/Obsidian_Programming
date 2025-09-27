---
title: Strings
---

Strings are declared using double-quote:
```lean
def s : String := "foobar"
```

String concatenation
```lean
#eval "Hello, " ++ "world!" -- "Hello, world!"
```

String interpolation
```lean
def w := "world"
#eval s!"Hello, {w}!" -- "Hello, world!"
```

## Notes

- **UTF-8 / byte vs char indexing**  
    Internally, strings are stored as UTF-8 byte arrays. The index type `String.Pos` accounts for byte counts, not naïve integer offsets.
    That means you should **not** treat a `Nat` index into a string directly — use `String.Pos`, or iterate using a `String.Iterator`.
- **Iterators**  
    There is `String.Iterator` for walking through the string safely (character by character) without dealing with raw byte offsets.
    You can get the remaining substring from an iterator: `Iterator.remainingToString`.
- **String gaps & raw literals**  
    Lean supports special forms of string literals: "gaps" (using backslash before newline) so you can write long strings split over lines. Also **raw** string literals (prefixed `r`) don’t interpret escape sequences.
- **Escape sequences in string literals**  
    Lean supports common escapes: `\r`, `\n`, `\t`, `\\`, `\"`, `\'`, `\xNN` (2-digit hex), `\uNNNN` (4-digit Unicode) inside normal string literals.

## String Operators

| Operation                                           | Type / signature                               | Description / notes                                                                                                                       | Example                                                                        |
| --------------------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `String.length`                                     | `String → Nat`                                 | Number of Unicode code points (characters) in a string.                                                                                   | `"hello".length = 5`                                                           |
| `String.append` / operator `++`                     | `String → String → String`                     | Concatenate two strings.                                                                                                                  | `"foo" ++ "bar" = "foobar"`                                                    |
| `String.join`                                       | `List String → String`                         | Concatenate all strings in a list in order.                                                                                               | `String.join ["a","b","c"] = "abc"`                                            |
| `String.intercalate (sep : String)`                 | `List String → String`                         | Like `join`, but inserts separator `sep` between elements.                                                                                | `", ".intercalate ["red","green","blue"] = "red, green, blue"`                 |
| `String.toList`                                     | `String → List Char`                           | Convert a string into a list of characters.                                                                                               | `"abc".toList = ['a','b','c']`                                                 |
| `String.get (s : String) (p : String.Pos)`          | `Char`                                         | Get the character at position `p` (if invalid position, returns a fallback default char).                                                 | `"abc".get ⟨1⟩ = 'b'`                                                          |
| `String.get?`                                       | `String → String.Pos → Option Char`            | Safe version of `get` — returns `none` if position invalid.                                                                               | `"abc".get? ⟨3⟩ = none`                                                        |
| `String.get!`                                       | `String → String.Pos → Char`                   | Unsafe version that panics if position invalid.                                                                                           | `"abc".get! ⟨1⟩ = 'b'`                                                         |
| `String.isNat`                                      | `String → Bool`                                | Checks if the string is a valid decimal natural number (non-empty, all digits).                                                           | `"123".isNat = true`, `"-123".isNat = false`                                   |
| `String.toNat?`                                     | `String → Option Nat`                          | Parses the string as a `Nat` in decimal; returns `none` if parse fails.                                                                   | `"42".toNat? = some 42`, `"abc".toNat? = none`                                 |
| `String.mk (List Char)`                             | `List Char → String`                           | Construct a string from a list of characters. (This is the logical constructor; in practice use literals or methods)                      | `String.mk ['h','i'] = "hi"`                                                   |
| `String.split (s : String) (p : Char → Bool)`       | `String → (Char → Bool) → List String`         | Split at each character for which predicate `p` is `true`. The splitting characters are dropped.                                          | `"coffee tea water".split (·.isWhitespace) = ["coffee", "tea", "water"]`       |
| `String.splitOn (s : String) (sep : String := " ")` | `String → String → List String`                | Split on occurrences of a substring `sep`. Default separator is space `" "`.                                                              | `"here is some text ".splitOn = ["here", "is", "some", "text", ""]`            |
| `String.set (i : Pos) (c : Char)`                   | `String → String.Pos → Char → String`          | Replace the character at position `i` (if valid) with `c`. If `i` is invalid, string is unchanged. (                                      | `"abc".set ⟨1⟩ 'B' = "aBc"`                                                    |
| `String.modify (i : Pos) (f : Char → Char)`         | `String → String.Pos → (Char → Char) → String` | Apply `f` to the character at position `i` (if valid). Equivalent to `set i (f (get i))`.                                                 | `"abc".modify ⟨1⟩ Char.toUpper = "aBc"`                                        |
| `String.next (s : String) (p : Pos)`                | `String → String.Pos → String.Pos`             | Advance to the next valid UTF-8 position after `p`. If `p` is invalid or already at end, returns next byte position.                      | If `"L∃∀N".next ⟨2⟩` yields something appropriate. (for multi-byte characters) |
| `String.firstDiffPos (a b : String)`                | `String → String → String.Pos`                 | Find first position where `a` and `b` differ (in terms of byte-position). If one is a prefix of the other, returns end of shorter string. | `"tea".firstDiffPos "ten" = ⟨2⟩`                                               |
| `String.pushn (s : String) (c : Char) (n : Nat)`    | `String → Char → Nat → String`                 | Append `n` repetitions of character `c` to the end of `s`.                                                                                | `"indeed".pushn '!' 2 = "indeed!!"`                                            |
| `String.isEmpty`                                    | `String → Bool`                                | Test whether a string is empty (`""`).                                                                                                    | `"".isEmpty = true`                                                            |
| `String.crlfToLf`                                   | `String → String`                              | Replace occurrences of `"\r\n"` with `"\n"` to normalize line endings.                                                                    | e.g. `String.crlfToLf "Line\r\nBreak" = "Line\nBreak"`                         |

## String Conversions

> Low-level operations converting to/from `ByteArray` and UTF-8.

| Operation             | Type / signature            | Description / notes                                                                                               |                          |
| --------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `String.toUTF8`       | `String → ByteArray`        | Encode a `String` into its UTF-8 byte representation (as a `ByteArray`).                                          |                          |
| `String.fromUTF8?`    | `ByteArray → Option String` | Try to decode a byte array as UTF-8; returns `some s` if the bytes form a valid UTF-8 encoding, otherwise `none`. |                          |
| `String.fromUTF8!`    | `ByteArray → String`        | Decode a byte array as UTF-8, panicking if the byte array is not valid UTF-8.                                     |                          |
| `String.validateUTF8` | `ByteArray → Bool`          | Check whether a `ByteArray` is a valid UTF-8 encoding. Returns `true` if valid, `false` otherwise.                |                          |
| `String.utf8ByteSize` | `String → Nat`              | Byte-length (in UTF-8) of the string. Cached in the object.                                                       | `"abc".utf8ByteSize = 3` |
| `String.getUtf8Byte`  | access raw UTF-8 bytes      | Given a byte index (with proof), fetch the corresponding `UInt8`.                                                 |                          |

## Substring Operations

| Operation                                | Type / signature               | Description / notes                                                                               |
| ---------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------- |
| `Iterator.curr`, `Iterator.curr'`        | `Iterator → Char`              | Get current character (with bounds checking in `curr`, without in `curr'`)                        |
| `Iterator.next`, `Iterator.next'`        | `Iterator → Iterator`          | Advance the iterator by one character (UTF-8 aware). `next'` requires proof there is a next char. |
| `Iterator.prev`                          | `Iterator → Iterator`          | Move backward one character (if possible).                                                        |
| `Iterator.atEnd` / `Iterator.hasNext`    | `Iterator → Bool`              | Check whether the iterator is at or beyond the end.                                               |
| `Iterator.extract`                       | `Iterator → Iterator → String` | Extract substring between two iterators (if valid, else `""`).                                    |
| `Iterator.forward`                       | `Iterator → Nat → Iterator`    | Move forward N characters (if possible).                                                          |
| `Iterator.remainingToString`             | `Iterator → String`            | Convert the remaining substring (from current iterator to end) to a `String`.                     |
| `Substring.take`, `Substring.takeRight`  | `Substring → Nat → Substring`  | Take first N characters (or last N) of the substring.                                             |
| `Substring.drop` / `Substring.dropRight` | `Substring → Nat → Substring`  | Remove first N (or last N) characters from substring.                                             |

## References

- [Lean Reference: Strings](https://lean-lang.org/doc/reference/latest/Basic-Types/Strings/)
