---
aliases:
  - Agent-to-Agent Protocol
  - Agent to Agent Protocol
  - A2A
  - Agent2Agent Protocol
---
The **Agent2Agent protocol** (**A2A**) is an open standard for communication and interoperability between independent AI agents across vendors and frameworks.

## Core concepts

- **JSON-RPC over HTTP(S)**: Standardized request-response payloads for agent interactions.
- **Agent Cards**: Machine-readable capability and endpoint metadata to enable discovery.
- **Task lifecycle**: Long-running work is tracked with task state, messages, and artifacts.
- **Streaming and async**: Server-Sent Events (SSE) for real-time updates and webhooks for async notifications.

## Key objects

- **Task**: The unit of work with a unique ID and lifecycle.
- **Message**: A conversation turn with one or more content parts.
- **Part**: Content fragments such as text, file, or structured data.
- **Artifact**: Outputs produced by the agent, composed of parts.

## Transport and discovery

- **Transport**: HTTP(S) with JSON-RPC 2.0 payloads; streaming via SSE.
- **Discovery**: Agent Cards can be hosted for open discovery and referenced by clients.

## Positioning

- **Interoperability layer**: A2A focuses on agent-to-agent collaboration while MCP focuses on tool and data integration.

## References

- https://agent2agent.info/
- https://agent2agent.info/specification/
- https://agent2agent.info/docs/introduction/
- https://a2a-protocol.org/
- https://a2a-protocol.org/v0.1.0/specification
- https://github.com/a2aproject/A2A

## References

- [GitHub: Agent2Agent Protocol](https://github.com/google/A2A)
