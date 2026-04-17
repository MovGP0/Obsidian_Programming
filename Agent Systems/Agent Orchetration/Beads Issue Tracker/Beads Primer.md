---
title: Beads Primer
---
**Beads** (`bd`) is a lightweight issue tracker with first-class dependency support. It stores issue data in `.beads/`, integrates with git, and is designed to answer a simple question quickly: _what can I work on right now?_

## What Beads Tracks

- Issues such as tasks, bugs, chores, features, and epics.
- Dependencies between issues so blocked work is explicit.
- State such as `open`, `in_progress`, `blocked`, `deferred`, and `closed`.
- Metadata such as priority, assignee, labels, due dates, and notes.

Issue IDs are generated from the repository prefix, for example `bd-a3f8`, `bd-a3f8.1`, or `api-a3f2dd`.

## Core Ideas

- `bd ready` is the fastest way to find unblocked work.
- Dependencies matter: if issue A depends on issue B, B must finish first.
- `bd status` is the dashboard-style summary for the whole database.
- `bd sync` keeps `.beads/` aligned with git and the remote.
- `bd doctor` is the health check when something looks wrong.

## Daily Workflow

1. Initialize Beads once in a repository with `bd init`.
2. Create work items with `bd create`.
3. Link blockers with `bd dep add`.
4. Use `bd ready` to find work that can actually start.
5. Inspect details with `bd show`.
6. Change ownership, status, labels, or priority with `bd update`.
7. Close finished work with `bd close`.
8. Sync issue data with git using `bd sync`.

## Priority Scale

| Priority | Meaning |
| --- | --- |
| `0` | Critical path or blocking work |
| `1` | High priority |
| `2` | Normal priority |
| `3` | Low priority |
| `4` | Backlog |

## Relevant Commands

The commands below were selected from `bd help`, `bd human`, and `bd quickstart` because they cover the normal user workflow.

| Area | Command |
| --- | --- |
| Setup | [`bd init`](Commands/bd-init.md), [`bd sync`](Commands/bd-sync.md), [`bd doctor`](Commands/bd-doctor.md) |
| Create and inspect | [`bd create`](Commands/bd-create.md), [`bd list`](Commands/bd-list.md), [`bd show`](Commands/bd-show.md) |
| Work execution | [`bd ready`](Commands/bd-ready.md), [`bd update`](Commands/bd-update.md), [`bd close`](Commands/bd-close.md), [`bd reopen`](Commands/bd-reopen.md) |
| Navigation and reporting | [`bd search`](Commands/bd-search.md), [`bd status`](Commands/bd-status.md) |
| Dependencies | [`bd dep`](Commands/bd-dep.md), [`bd blocked`](Commands/bd-blocked.md) |

## Which Command Should I Use?

- Use `bd list` when you want a broad filtered list.
- Use `bd ready` when you want only unblocked work.
- Use `bd search` when you know a keyword but not the exact issue ID.
- Use `bd show <id>` when you already know the issue you want.
- Use `bd blocked` when you want to review what is stuck.
- Use `bd status` when you want a project-wide snapshot.

## Getting Help

- `bd human` shows the short human-oriented command set.
- `bd quickstart` gives a guided quick-start with examples.
- `bd help` lists all commands.
- `bd help <command>` shows the detailed help for one command.
