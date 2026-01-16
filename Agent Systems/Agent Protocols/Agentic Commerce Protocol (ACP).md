---
aliases:
  - Agentic Commerce Protocol
  - ACP
  - OpenAI Agentic Commerce Protocol
---
The **Agentic Commerce Protocol** is an open standard from OpenAI and Stripe that lets AI agents and merchants complete purchases while keeping merchants as the seller of record.

## Core building blocks

- **Product Feed**: A structured merchant catalog shared with OpenAI to enable product discovery in ChatGPT.
- **Agentic Checkout**: REST endpoints to create, update, and complete checkout sessions.
- **Delegated Payment**: Secure handoff of payment credentials via a PSP or vault provider.

## Key characteristics

- **Merchant-owned relationship**: Payments flow directly to the merchant, who approves orders and handles post-purchase actions.
- **Open source**: Protocol specs and reference implementations are published under an open-source license.

## References

- https://developers.openai.com/commerce/guides/get-started/
- https://developers.openai.com/commerce/specs/feed/
- https://developers.openai.com/commerce/specs/checkout/
- https://developers.openai.com/commerce/specs/payment/
- https://agenticcommerce.dev/
- https://github.com/openai/agentic-commerce
