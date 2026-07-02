---
title: Clean Code Principles
source: Clean Code by Robert C. Martin; Clean Coder Blog clean-code-style notes
tags:
  - clean-code
  - software-design
  - refactoring
---

**Clean Code Principles** are practical rules for keeping software readable, changeable, testable, and honest about its intent. The core idea is that code is read and changed far more often than it is first written, so local clarity and system structure both matter.

This is a paraphrased cheat sheet based on the main ideas commonly associated with Robert C. Martin's *Clean Code*, augmented with the Clean Coder blog notes in [[_Clean Coder Blog Clean Code Style]].

## Guiding Standard

- Code should clearly express what the system does and why the current design exists.
- Prefer simple, direct code until duplication, volatility, or unclear responsibility demands structure.
- Make change safer by keeping responsibilities cohesive, dependencies intentional, and tests fast enough to guide development.
- Clean code is not decoration. It pays for itself when it improves comprehension, changeability, testability, or defect discovery. See [[Too Clean]].

## Names

- Use names that reveal intent, domain meaning, and units.
- Avoid vague words such as `data`, `manager`, `processor`, `info`, and `helper` unless the context gives them precise meaning.
- Name booleans as predicates or facts, such as `IsValid`, `HasPermission`, or `CanRetry`.
- Use consistent vocabulary for the same concept across code, tests, documentation, and UI.
- Prefer searchable names over short abbreviations, except for conventional tiny scopes.

## Functions

- Keep functions small enough that their purpose is obvious.
- A function should usually operate at one level of abstraction.
- Prefer command/query separation: either change state or answer a question when practical.
- Keep parameters few. Many parameters often indicate a missing object, data structure, or use-case concept.
- Remove hidden outputs. Avoid surprising mutation of arguments unless the function name makes mutation explicit.
- Extract functions to clarify intent, not just to reduce line count.

## Comments

- First try to make the code explain itself through naming, structure, and tests.
- Use comments for intent, constraints, tradeoffs, warnings, legal notes, or non-obvious domain rules.
- Avoid comments that repeat mechanics visible in the code.
- Delete stale commented-out code; version control is the archive. See [[Code Hoarders]].
- Treat comments as liabilities when they can drift from implementation. See [[Necessary Comments]].

## Formatting

- Formatting should reduce cognitive load, not express personality.
- Keep related ideas close together.
- Separate distinct ideas with whitespace.
- Use a consistent order for fields, constructors, public methods, private helpers, and tests.
- Avoid wide, deeply nested code. It is usually a sign that extraction, guard clauses, or a different abstraction would help.

## Objects and Data

- Objects hide representation and expose behavior.
- Data structures expose shape and let behavior live elsewhere.
- Avoid hybrids that expose fields while also pretending to protect invariants.
- Choose the style that fits the direction of change: objects are often better when variants change; data structures are often better when operations change.
- See [[Classes vs Data Structures]].

## Error Handling

- Keep error paths readable and testable.
- Prefer exceptions or result types over scattered sentinel values.
- Preserve useful context when wrapping errors.
- Do not let error handling obscure the normal path.
- Avoid returning or accepting `null` casually. Make absence explicit where the language allows it.

## Boundaries

- Keep third-party APIs, frameworks, databases, filesystems, clocks, networks, and UIs at system edges.
- Wrap volatile or awkward APIs behind interfaces shaped by the application, not by the vendor.
- Do not let framework vocabulary dominate the domain model. See [[Screaming Architecture]].
- Make important dependencies explicit; avoid magic wiring that hides control flow. See [[Make the Magic go away]].

## Responsibility and Change

- A module should have one clear reason to change. See [[The Single Responsibility Principle]].
- Split code when different actors or policies pull it in different directions.
- Keep high-level policy independent from low-level details.
- Use abstractions where they protect stable policy from volatile detail. See [[The Open Closed Principle]].
- Do not create one interface per class by habit. Let client needs define abstractions. See [[Interface Considered Harmful]].

## Conditionals and Polymorphism

- A local `if` can be clearer than a premature abstraction.
- Repeated switches over the same type, mode, or state usually signal missing structure.
- Use polymorphism, strategy objects, lookup tables, or dispatch maps when new cases currently require scattered edits.
- See [[if-else-switch]].

## Architecture

- Architecture should make core policy independent from delivery details.
- Source dependencies should point toward stable business rules, not toward frameworks or devices.
- Keep UI, database, transport, and external services replaceable at the design boundary.
- Organize code so the business capability is visible before the framework. See [[Clean Architecture]] and [[Screaming Architecture]].
- Microservices do not remove the need for clean internal structure. See [[Clean Micro-service Architecture]].

## Tests

- Tests are production assets and need clean design too. See [[First-Class Tests]].
- Prefer fast, focused unit tests for design feedback and slower integration/system tests for boundary confidence.
- Test behavior through stable APIs rather than mirroring every production class. See [[Test Contra-variance]].
- Use one failing test at a time to keep the feedback loop controlled. See [[Monogamous TDD]].
- Refactor after green tests; otherwise tests only preserve existing mess. See [[The Cycles of TDD]].
- Use TDD as discipline and feedback, not as a substitute for design judgment. See [[TDD Harms Architecture]].

## Test Doubles

- Use the simplest double that expresses the test purpose.
- Mock external systems, dangerous operations, slow services, and hard-to-trigger failures.
- Avoid mocking every internal collaborator; it couples tests to implementation structure.
- Prefer tests that assert observable behavior unless the interaction itself is the behavior.
- See [[When to Mock]] and [[The Little Mocker]].

## Refactoring

- Refactor in small steps with tests passing between steps when possible.
- Remove duplication after understanding whether duplicated code represents the same idea or merely similar mechanics.
- Improve names as understanding improves.
- Delete dead code, unused abstractions, and speculative extension points.
- Treat messy areas as interest-bearing debt when they slow repeated change.

## Smell Checklist

| Smell | Ask |
|-------|-----|
| Long function | Can the intent be named as smaller steps? |
| Many parameters | Is there a missing concept or request object? |
| Repeated switch | Should this variation move behind dispatch or polymorphism? |
| Feature envy | Is behavior living with the wrong data? |
| Shotgun surgery | Is one change scattered across unrelated modules? |
| Fragile tests | Are tests coupled to structure instead of behavior? |
| Comment explains code mechanics | Could a better name or extraction remove the comment? |
| Framework-shaped domain | Is the business model depending on a delivery detail? |
| Dead code | Can version control replace this inventory? |
| One-to-one interfaces | Does the abstraction serve a real client need? |

## Daily Practice

- Leave code a little clearer when you touch it.
- Keep changes small enough to review and test.
- Prefer explicit tradeoffs over hidden cleverness.
- Make duplication, coupling, and unclear names visible during review.
- Practice the design skills that make clean code natural. See [[The Principles of Craftsmanship]].

## Related Notes

- [[_Clean Coder Blog Clean Code Style]]
- [[A Little Structure]]
- [[A Little Architecture]]
- [[Clean Architecture]]
- [[Necessary Comments]]
- [[The Single Responsibility Principle]]
- [[The Open Closed Principle]]
- [[Classes vs Data Structures]]
- [[First-Class Tests]]
