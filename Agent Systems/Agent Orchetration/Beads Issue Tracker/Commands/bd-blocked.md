---
title: bd blocked
---
`bd blocked` shows issues that are currently blocked.

## Syntax

```sh
bd blocked [flags]
```

## Important Flags

- `--parent`: Restrict the output to descendants of a specific epic or parent issue.

## Examples

```sh
bd blocked
bd blocked --parent bd-a3f8
```

## Notes

- Use this command to review why work is not moving.
- It complements `bd ready`: one shows what can start, the other shows what cannot.

## Related

- [bd ready](bd-ready.md)
- [bd dep](bd-dep.md)
- [bd status](bd-status.md)
