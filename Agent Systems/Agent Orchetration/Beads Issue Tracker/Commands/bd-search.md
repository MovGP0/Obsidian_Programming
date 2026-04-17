---
title: bd search
---
`bd search` searches issues across title, description, and ID.

## Syntax

```sh
bd search [query] [flags]
```

## Useful Filters

- `-s, --status`: Filter by status.
- `-a, --assignee`: Filter by assignee.
- `-l, --label` and `--label-any`: Filter by labels.
- `-t, --type`: Filter by issue type.
- `--priority-min` and `--priority-max`: Restrict by priority range.
- `--created-after`, `--created-before`, `--updated-after`, `--updated-before`: Restrict by time windows.
- `--sort` and `--reverse`: Control result order.

## Examples

```sh
bd search "authentication bug"
bd search "login" --status open
bd search "database" --label backend --limit 10
bd search --query "performance" --assignee alice
bd search "bd-5q"
```

## Notes

- Use `bd search` when you remember text but not the exact issue ID.
- Use `bd list` when your main goal is filtering the whole database rather than text lookup.

## Related

- [bd list](bd-list.md)
- [bd show](bd-show.md)
- [bd status](bd-status.md)
