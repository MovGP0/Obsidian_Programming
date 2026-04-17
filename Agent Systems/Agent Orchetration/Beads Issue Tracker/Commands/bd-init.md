---
title: bd init
---
`bd init` initializes Beads in the current directory by creating the `.beads/` directory and a database file.

## Syntax

```sh
bd init [flags]
```

## Important Flags

- `-p, --prefix`: Set the issue prefix explicitly instead of using the current directory name.
- `--stealth`: Keep Beads local to the repository by configuring ignore settings and onboarding instructions.
- `--no-db`: Use JSONL without SQLite.
- `--from-jsonl`: Rebuild from the current `.beads/issues.jsonl` instead of git history.
- `--skip-hooks`: Skip git hook installation.

## Examples

```sh
bd init
bd init --prefix api
bd init --stealth
bd init --no-db
```

## Notes

- Run this once per repository.
- Use a stable prefix early, because issue IDs are based on it.
- If you are cleaning up JSONL manually, `--from-jsonl` is safer than replaying old git history.

## Related

- [bd sync](bd-sync.md)
- [bd doctor](bd-doctor.md)
