---
title: bd sync
---
`bd sync` synchronizes Beads issues with git and the remote repository.

## Syntax

```sh
bd sync [flags]
```

## What It Does

1. Pull from the remote.
2. Merge local and remote issue state.
3. Export the merged state to JSONL.
4. Commit the changes to git.
5. Push the result.

## Important Flags

- `--dry-run`: Preview what would happen.
- `--flush-only`: Export pending changes to JSONL without git operations.
- `--import-only`: Import from JSONL without git operations.
- `--no-pull`: Skip pulling before syncing.
- `--no-push`: Skip pushing after syncing.
- `--squash`: Accumulate JSONL changes without creating a commit yet.
- `--status`: Show the diff between the sync branch and the main branch.
- `--check`: Run a pre-sync integrity check.

## Examples

```sh
bd sync
bd sync --dry-run
bd sync --flush-only
bd sync --import-only
bd sync --no-pull --no-push
```

## Notes

- Use `bd sync` when you want the Beads data in `.beads/` to stay aligned with git history and collaborators.
- `--flush-only` is useful for local export steps and hooks.
- `--import-only` is useful after `git pull`.

## Related

- [bd init](bd-init.md)
- [bd doctor](bd-doctor.md)
- [bd status](bd-status.md)
