---
title: bd ready
---
`bd ready` shows work that is ready to start now: issues that are open or in progress and have no blocking dependencies.

## Syntax

```sh
bd ready [flags]
```

## Important Flags

- `-a, --assignee`: Filter by assignee.
- `-u, --unassigned`: Show only unassigned ready work.
- `-p, --priority`: Filter by priority.
- `-t, --type`: Filter by issue type.
- `--parent`: Restrict to descendants of an epic or parent issue.
- `--pretty`: Show a tree-style view.
- `--include-deferred`: Include work that has been deferred into the future.

## Examples

```sh
bd ready
bd ready --priority 0
bd ready --assignee alice
bd ready --unassigned
bd ready --parent bd-a3f8 --pretty
```

## Notes

- This is the fastest command for answering "what can I work on next?"
- `bd ready` is narrower than `bd list --status open` because it respects blockers.
- The repo-level agent workflow also relies on `bd ready` as the normal entry point.

## Related

- [bd show](bd-show.md)
- [bd blocked](bd-blocked.md)
- [bd dep](bd-dep.md)
