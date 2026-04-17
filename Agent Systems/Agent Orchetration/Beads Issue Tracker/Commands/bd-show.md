---
title: bd show
---
`bd show` displays the full details for one or more issues.

## Syntax

```sh
bd show [id...] [flags]
```

## Important Flags

- `--short`: Show a compact one-line summary per issue.
- `--refs`: Show issues that reference the selected issue.
- `--thread`: Show the full conversation thread for message-style issues.

## Examples

```sh
bd show bd-a3f8
bd show bd-a3f8 bd-a3f8.1
bd show bd-a3f8 --refs
bd show bd-a3f8 --short
```

## Notes

- `bd show` is the best follow-up after `bd ready`, `bd list`, or `bd search`.
- It is the easiest way to inspect dependencies, labels, assignee, status, and notes for a single issue.

## Related

- [bd list](bd-list.md)
- [bd ready](bd-ready.md)
- [bd update](bd-update.md)
