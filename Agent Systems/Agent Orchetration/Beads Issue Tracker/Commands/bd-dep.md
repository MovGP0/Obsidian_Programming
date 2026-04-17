---
title: bd dep
---
`bd dep` manages dependencies between issues. This is how you model blockers and relationships.

## Syntax

```sh
bd dep [issue-id] [flags]
bd dep [command]
```

## Key Subcommands

- `bd dep add <blocked> <blocker>`: Add a blocking dependency.
- `bd dep remove <blocked> <blocker>`: Remove a blocking dependency.
- `bd dep list <id>`: Show dependencies or dependents.
- `bd dep tree <id>`: Show the dependency tree.
- `bd dep cycles`: Detect circular dependencies.
- `bd dep relate <a> <b>`: Add a non-blocking relationship.
- `bd dep unrelate <a> <b>`: Remove a non-blocking relationship.

## Shortcut Flag

- `--blocks`: Shorthand for `bd dep add <blocked> <blocker>`.

## Examples

```sh
bd dep add bd-abc bd-xyz
bd dep bd-xyz --blocks bd-abc
bd dep remove bd-abc bd-xyz
bd dep tree bd-abc
bd dep cycles
bd dep relate bd-abc bd-def
```

## Notes

- `bd dep add <blocked> <blocker>` means the second issue blocks the first.
- Good dependency hygiene is what makes `bd ready` trustworthy.
- Use `relate` for soft links that should not block execution.

## Related

- [bd ready](bd-ready.md)
- [bd blocked](bd-blocked.md)
- [bd show](bd-show.md)
