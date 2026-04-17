---
title: bd create
---
`bd create` creates a new issue. This is the standard entry point for adding new work to Beads.

## Syntax

```sh
bd create [title] [flags]
```

## Important Flags

- `--title`: Provide the title as a named flag instead of a positional argument.
- `-d, --description`: Add a description.
- `-p, --priority`: Set priority from `0` to `4`.
- `-t, --type`: Set the issue type such as `task`, `bug`, `feature`, or `epic`.
- `-a, --assignee`: Assign the issue immediately.
- `-l, --labels`: Add one or more labels.
- `--parent`: Create the issue as a child under another issue.
- `--deps`: Add dependencies during creation.
- `--due` and `--defer`: Set due dates or defer work until later.

## Examples

```sh
bd create "Fix login bug"
bd create "Add auth" -p 0 -t feature
bd create "Write tests" -d "Unit tests for auth" --assignee alice
bd create --title "Refactor API client" --labels backend,cleanup
bd create "Implement export" --parent bd-a3f8 --deps bd-a3f8.1
```

## Notes

- `bd quickstart` and `bd human` both treat `bd create` as a primary daily command.
- Use `--validate` if you want Beads to check whether the description matches the required template for the issue type.
- `--dry-run` is useful when you want to inspect what would be created first.

## Related

- [bd list](bd-list.md)
- [bd show](bd-show.md)
- [bd dep](bd-dep.md)
