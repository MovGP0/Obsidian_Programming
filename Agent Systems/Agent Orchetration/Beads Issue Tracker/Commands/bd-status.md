---
title: bd status
---
`bd status` gives a quick snapshot of the issue database and project health. It is similar in spirit to `git status` for a repository.

## Syntax

```sh
bd status [flags]
```

## Important Flags

- `--assigned`: Show issues assigned to the current user.
- `--no-activity`: Skip git activity tracking for faster output.
- `--json`: Emit machine-readable output.

## Alias

- `bd stats` is an alias for `bd status`.

## Examples

```sh
bd status
bd status --no-activity
bd status --assigned
bd status --json
bd stats
```

## Notes

- This is the best quick health check for the whole Beads database.
- It summarizes issue counts by state, ready work, and recent activity.

## Related

- [bd list](bd-list.md)
- [bd ready](bd-ready.md)
- [bd doctor](bd-doctor.md)
