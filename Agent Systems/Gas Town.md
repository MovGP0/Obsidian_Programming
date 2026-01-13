**Gas Town** is a **workspace manager and multi-agent orchestrator** that lets you coordinate _many_ AI coding agents working on different tasks without losing context when individual agents restart. It persists work state in git-backed hooks and facilitates automated workflows, agent roles, work tracking, and merge coordination.

Gas Town addresses core problems in multi-agent development:

- **Context loss** when an agent restarts
- **Coordination chaos** across agents
- **Manual merge pain**
- **Lack of persistent shared workspace state**

## Workspace Structure

Gas Town is organized around a **Town** workspace directory (e.g., `~/gt/`) that contains multiple **Rigs** and agent roles.

**Town**
- Root workspace where configuration, agents, and rigs live.
- All work state is stored here using git and Beads leaders.

**Rigs**
- Project repositories managed by Gas Town.
- Each project rig wraps a git repo and controls agent work via git hooks.

**Hooks**
- Git worktree-based persistent state used as “agent mailboxes.”
- Agents read/write work state here, enabling persistence and crash recovery.

## Roles

| Category                     | Members                                       |
| ---------------------------- | --------------------------------------------- |
| **Town-level orchestration** | Mayor, Deacon, Dogs, Boot the Dog             |
| **Rig-level execution**      | Polecats, Witness, Refinery, Crew             |
| **Human**                    | Overseer                                      |
| **Core system layer**        | System (underlies orchestration/coordination) |

| Role                   | Scope                             | Primary Responsibilities                                                                                             | Notes / Category                                                                                                                                                       |
| ---------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🏙️ Town               | Town                              | The town (`~/gt/` folder) manages and orchestrates all the workers across all your rigs                              |                                                                                                                                                                        |
| 🏗️ Rigs               | Rig (one per project)             | Each project (git repo) under Gas Town management is called a Rig                                                    |                                                                                                                                                                        |
| 🖥️ System             | (General / orchestration)         | _Glossary role for core orchestrator subsystem; handles base system operations and state_                            | The project’s system core; often implicit in CLI and runtime.                                                                                                          |
| 🎩 Mayor               | Town-level                        | Chief coordinator; concierge for user; orchestrates work convoys, coordinates high-level actions                     | Primary agent you interact with for most flows.                                                                                                                        |
| 🐺 Deacon              | Town-level                        | Daemon patrol agent; periodically runs defined workflows and propagates “Do Your Job” signals                        | Drives recurring maintenance patrols and jobs.                                                                                                                         |
| 🐶 Dogs                | Town-level                        | Support workers for Deacon; maintenance tasks (e.g., cleaning stale branches, plugin execution)                      | Help Deacon stay unblocked and focused.                                                                                                                                |
| 🐕 Boot the Dog        | Town-level                        | Periodic check agent that wakes to assess Deacon status: heartbeat, nudge, restart                                   | A specialized dog for Deacon supervision.                                                                                                                              |
| 😺 Polecats            | Rig-level                         | Ephemeral workers that swarm on tasks; execute work on a rig, produce merge requests, then terminate                 | Work swarming engine; transient workers spun up on demand.                                                                                                             |
| 🦉 Witness             | Rig-level                         | Monitors polecats, helps resolve stuck work; assists with MR submission and overall polecat lifecycle                | Acts as a patrol/overseer for swarm workers.                                                                                                                           |
| 🏭 Refinery            | Rig-level to Town-level interface | Handles intelligent merging of changes from polecats into the main branch; resolves complex merge situations         | Ensures no work is lost; sequentially merges work.                                                                                                                     |
| 👷 Crew, Worker, Agent | Rig-level                         | Persistent coding agents the user names and interacts with directly; handle longer-running tasks and iterative work. | Long-lived workers you use for typical agent workflows.                                                                                                                |
| 📬 Mail and Messaging  | Rig-level and Town-level          | Uses [[Beads]] as the atomic unit of work.                                                                           |                                                                                                                                                                        |
| 👤 Overseer (Human)    | User                              | The human operator who directs the system, receives inbox messages, sends tasks                                      | Not a coded agent, but the user’s identity and control layer.                                                                                                          |
| 🚛 Convoy              |                                   | Groups related work and tracks progress                                                                              |                                                                                                                                                                        |
| 🪝 Hook                | Worker-level                      | Persistence layer. Special pinned bead for a given worker/agent.                                                     | A bead that is the parent of the beads that the worker is responsible for; links with beads for the worker **Role**, the **Mail** inbox, orchestration **State**, etc. |
| 📿 Beads Formulas      |                                   | Repeatable workflows                                                                                                 |                                                                                                                                                                        |
| 📊 Dashboard           |                                   | Real-time monitoring                                                                                                 |                                                                                                                                                                        |

## Installation

Install Go:
```sh
winget install GoLang.Go
```

Install Gas Town:
```sh
go install github.com/steveyegge/gastown/cmd/gt@latest
```

## Setup

Crate the Town:
```sh
# in user directory
gt install ~/gt --git
cd ~/gt/

# in custom location
gt install D:/gt/ --git
cd D:/gt/
```

> [!tip]
> A town is just a folder and can be moved to another location when needed.

> [!tip]
> You may want to add the town directory to the `$PATH` variable.

Verify the town configuration
```sh
gt config show
```

Add a a project Rig
```sh
gt rig add myproject https://github.com/username/myproject.git
```

Crate the crew workspace
```sh
gt crew add yourname --rig myproject
cd myproject/crew/yourname
```

Start/Visit the Mayor
```sh
gt mayor attach
```

> [!info]
> `mayor attach` also creates a [tmux](https://github.com/tmux/tmux/wiki) session to orchestrate work.

Schedule tickets in a convoy
```sh
gt convoy create "Cart Improvements" CART-101 CART-102 --notify
```

Monitoring
```sh
# list convoys
gt convoy list

# list agents
gt agents

# use dashboard
gt dashboard --port 8080
```

## Beads Formula Workflows

Repeatable workflows can be defined in `.beads/formulas/`

```toml
description = "release"
version = 1
[[steps]]
id = "run-tests"
description = "make test"
```

## Important Commands

| Task                   | Command                               |
| ---------------------- | ------------------------------------- |
| List agents            | `gt agents`                           |
| Sling (assign) a issue | `gt sling <issue> <rig>`              |
| List convoys           | `gt convoy list`                      |
| Show convoy detail     | `gt convoy show <id>`                 |
| Start Mayor            | `gt mayor attach`                     |
| Create a convoy        | `gt convoy create <name> [issues...]` |
| View config            | `gt config show`                      |
| Dashboard              | `gt dashboard --port 8080`            |
| Git hook repair        | `gt hooks repair`                     |

## See also

- [Medium: Welcome to Gas Town](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04)
- [GitHub: Gas Town](https://github.com/steveyegge/gastown)
