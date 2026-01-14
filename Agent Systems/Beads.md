---
title: 📿 Beads
---
**Beads** (`bd`) is an issue tracking system for Agents.

```sh
bd init                     # initialize beads in repo (creates `.beads/` folder)
bd init --stealth           # local-only (no commit)
bd list                     # List all tasks
bd ready                    # List unblocked tasks (agent entry point)
bd show <id>                # Show full task
bd dep add <child> <parent> # Add dependency (child blocked by parent)
bd dep add bd-101 bd-100    # Task 101 is blocked by task 100
bd sync                     # Sync `.beads/` with branch & remote
```

## Help
```sh
# CLI Reference for humans
bd human

# CLI Reference for agents
bd agent

# Full CLI reference; list commands
bd help
bd --help
bd

# CLI Reference for specific commmands
bd help create
bd create --help
```

## Task Management

Create a task
```sh
bd create "Fix login bug" --priority 1
bd create --title "Title" --description "Description" --priority 0
```

## Task ID Structure

```
bd-a3f8          # Epic
bd-a3f8.1        # Task
bd-a3f8.1.1      # Sub-task
```

## Priorities

| Priority | Meaning                  |
| -------- | ------------------------ |
| 0        | Critical path / blocking |
| 1        | High                     |
| 2        | Normal                   |
| 3        | Low                      |
| 4        | Backlog                  |
