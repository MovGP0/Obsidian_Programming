---
title: bd update
---
`bd update` modifies one or more issues. If no issue ID is provided, it updates the last touched issue.

## Syntax

```sh
bd update [id...] [flags]
```

## Important Flags

- `-s, --status`: Change status.
- `-a, --assignee`: Change assignee.
- `-p, --priority`: Change priority.
- `--title`: Rename the issue.
- `-d, --description`: Replace the description.
- `--add-label`, `--remove-label`, `--set-labels`: Manage labels.
- `--due` and `--defer`: Set or clear scheduling fields.
- `--parent`: Reparent the issue.
- `--claim`: Atomically claim the issue and set it to `in_progress`.

## Examples

```sh
bd update bd-a3f8 --status in_progress
bd update bd-a3f8 --priority 0
bd update bd-a3f8 --assignee alice
bd update bd-a3f8 --add-label backend
bd update bd-a3f8 --defer next monday
bd update bd-a3f8 --claim
```

## Notes

- `bd reopen` is the more explicit choice when reopening closed issues.
- Use `--claim` when you want to claim work safely without racing another user or agent.
- Passing an empty value to flags like `--due` or `--defer` clears that field.

## Related

- [bd show](bd-show.md)
- [bd close](bd-close.md)
- [bd reopen](bd-reopen.md)
