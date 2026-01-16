---
aliases:
  - Agent Payments Protocol
  - AP2
---
The **Agent Payments Protocol** (**AP2**) is an open, non-proprietary extension to **Agent2Agent (A2A)** for AI-driven payments. It aligns with **MCP** so compliant agents, merchants, and payment providers can transact securely.

## Core concepts

- **Role-based architecture**: Responsibilities are split across shopper, shopping agent, credentials provider, merchant endpoint, and merchant payment processor to keep sensitive data inside the right boundary.
- **Verifiable mandates**: Transactions carry user-signed mandates (Intent, Cart, and Payment) that provide tamper-evident authorization and audit trails.
- **Rail-agnostic settlement**: x402 is the first rail, and the protocol is designed to plug in additional payment rails over time.

## Implementation resources

- **Reference implementations and samples**: Official GitHub repo includes runnable scenarios with Python and Android samples.
- **Docs and specs**: The documentation site covers core concepts, specification references, and integration guidance.

## References

- https://agentpaymentsprotocol.info/
- https://agentpaymentsprotocol.info/docs/
- https://agentpaymentsprotocol.info/about/
- https://agentpaymentsprotocol.info/docs/introduction/
- https://agentpaymentsprotocol.info/specification/core/
- https://agentpaymentsprotocol.info/specification/mcp-integration/
- https://github.com/google-agentic-commerce/AP2
