---
title: bd doctor
---
`bd doctor` runs diagnostics on the current Beads installation and database.

## Syntax

```sh
bd doctor [path] [flags]
```

## What It Checks

- Whether `.beads/` exists.
- Database version, schema compatibility, and sync state.
- Multiple database or JSONL files.
- Daemon health.
- File permissions.
- Circular dependencies.
- Git hooks and metadata files.

## Important Flags

- `--fix`: Attempt automatic repairs.
- `--dry-run`: Preview what `--fix` would do.
- `--deep`: Run deeper graph validation.
- `--check`: Run a specific detailed check such as `pollution`.
- `--perf`: Run performance diagnostics.
- `-o, --output`: Export diagnostics to a JSON file.
- `-y, --yes`: Skip confirmation prompts.

## Examples

```sh
bd doctor
bd doctor --json
bd doctor --fix
bd doctor --fix --yes
bd doctor --dry-run
bd doctor --deep
bd doctor --check=pollution
```

## Notes

- Start here when `bd` behaves unexpectedly.
- `--fix` can change data, so `--dry-run` is the safer first pass.
- The help text explicitly calls out `bd doctor` as the place to start for installation health.

## Related

- [bd init](bd-init.md)
- [bd sync](bd-sync.md)
- [bd status](bd-status.md)
