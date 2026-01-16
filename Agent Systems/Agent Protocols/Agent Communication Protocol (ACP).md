---
aliases:
  - Agent Communication Protocol
  - ACP
---
The **Agent Communication Protocol** (**ACP**) is an open standard for agent-to-agent communication over HTTP.

## Core concepts

- **REST-based messaging**: Agents expose HTTP endpoints for sending and receiving messages.
- **SDK-optional**: Can be used with simple HTTP clients; SDKs exist but are not required.
- **Async-first**: Built for long-running tasks with optional synchronous usage; supports streaming.
- **Offline discovery**: Agents can publish metadata for discovery even when not running.

## Current status

ACP has been folded into **Agent2Agent (A2A)** under the Linux Foundation, and guidance points to A2A for ongoing development and migration.

## References

- https://research.ibm.com/projects/agent-communication-protocol
- https://www.ibm.com/think/topics/agent-communication-protocol
- https://research.ibm.com/blog/agent-communication-protocol-ai
