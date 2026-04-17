---
title: bd close
---
`bd close` closes one or more issues. If no issue ID is provided, it closes the last touched issue.

## Syntax

```sh
bd close [id...] [flags]
```

## Important Flags

- `-r, --reason`: Record why the issue is being closed.
- `--suggest-next`: Show newly unblocked work after closing.
- `--continue`: Auto-advance to the next step in a molecule.
- `--no-auto`: With `--continue`, show the next step without claiming it.
- `-f, --force`: Force close pinned issues.

## Examples

```sh
bd close bd-a3f8
bd close bd-a3f8 -r "Fixed in PR #42"
bd close bd-a3f8 --suggest-next
```

## Notes

- `--suggest-next` is useful when you are working through a dependency chain.
- If you closed the wrong issue, use `bd reopen`.

## Related

- [bd update](bd-update.md)
- [bd reopen](bd-reopen.md)
- [bd ready](bd-ready.md)
