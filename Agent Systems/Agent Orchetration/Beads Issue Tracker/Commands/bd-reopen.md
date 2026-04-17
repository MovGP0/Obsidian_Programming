---
title: bd reopen
---
`bd reopen` reopens closed issues by setting the status back to `open` and clearing the close timestamp.

## Syntax

```sh
bd reopen [id...] [flags]
```

## Important Flags

- `-r, --reason`: Record why the issue is being reopened.

## Examples

```sh
bd reopen bd-a3f8
bd reopen bd-a3f8 -r "Regression found during testing"
```

## Notes

- This is more explicit than `bd update --status open`.
- The help text calls out that it emits a dedicated reopen event.

## Related

- [bd close](bd-close.md)
- [bd update](bd-update.md)
- [bd show](bd-show.md)
