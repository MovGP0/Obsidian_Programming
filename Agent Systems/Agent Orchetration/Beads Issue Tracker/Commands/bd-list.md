---
title: bd list
---
`bd list` lists issues and supports a large set of filters. Use it when you want a broad view of the database instead of only ready work.

## Syntax

```sh
bd list [flags]
```

## Useful Filters

- `-s, --status`: Filter by `open`, `in_progress`, `blocked`, `deferred`, or `closed`.
- `-p, --priority`: Filter by a single priority.
- `--priority-min` and `--priority-max`: Filter a range of priorities.
- `-a, --assignee`: Filter by assignee.
- `-l, --label` and `--label-any`: Filter by labels.
- `-t, --type`: Filter by type such as `task`, `bug`, `feature`, or `epic`.
- `--parent`: Show children of an issue.
- `--overdue` and `--deferred`: Focus on scheduling-related states.

## Output Options

- `--pretty` or `--tree`: Show a tree-style view.
- `--long`: Show more detail per issue.
- `--sort`: Sort by fields such as `priority`, `created`, or `updated`.
- `-n, --limit`: Control how many issues are shown.

## Examples

```sh
bd list
bd list --status open
bd list --priority 0
bd list --assignee alice --status in_progress
bd list --parent bd-a3f8 --pretty
bd list --label backend --sort updated --reverse
```

## Notes

- `bd list` is broader than `bd ready`.
- `--all` includes closed issues.
- `--watch` is useful for a live terminal view when the database is changing.

## Related

- [bd ready](bd-ready.md)
- [bd search](bd-search.md)
- [bd status](bd-status.md)
