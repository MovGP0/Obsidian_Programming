---
title: Beads Command Reference
---
This folder documents the core user-facing Beads commands. It is intentionally narrower than the full `bd help` output and focuses on the commands most people use day to day.

## Setup and Health

- [`bd init`](Commands/bd-init.md): Initialize Beads in the current repository.
- [`bd sync`](Commands/bd-sync.md): Synchronize issue data with git and the remote.
- [`bd doctor`](Commands/bd-doctor.md): Diagnose installation, database, sync, and integrity problems.

## Create and Review Work

- [`bd create`](Commands/bd-create.md): Create a new issue.
- [`bd list`](Commands/bd-list.md): List issues with filters.
- [`bd show`](Commands/bd-show.md): Show the full details for one or more issues.
- [`bd search`](Commands/bd-search.md): Search issues by text and filters.
- [`bd status`](Commands/bd-status.md): Show a quick project summary.

## Execute Work

- [`bd ready`](Commands/bd-ready.md): Show unblocked work that can start now.
- [`bd update`](Commands/bd-update.md): Change status, assignee, labels, priority, title, or description.
- [`bd close`](Commands/bd-close.md): Close completed work.
- [`bd reopen`](Commands/bd-reopen.md): Reopen previously closed work.

## Model Dependencies

- [`bd dep`](Commands/bd-dep.md): Add, remove, inspect, and visualize dependencies.
- [`bd blocked`](Commands/bd-blocked.md): Show work that is currently blocked.

## Fast Paths

- New repository: `bd init`
- New task: `bd create "Title"`
- What can I work on: `bd ready`
- What is blocked: `bd blocked`
- Update progress: `bd update <id> --status in_progress`
- Finish work: `bd close <id>`
- Check overall health: `bd status`
- Repair or inspect problems: `bd doctor`
