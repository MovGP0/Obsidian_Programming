---
title: Clean Micro-service Architecture
source: https://blog.cleancoder.com/uncle-bob/2014/10/01/CleanMicroserviceArchitecture.html
source_title: Clean Micro-service Architecture
published: 2014-10-01
tags:
  - clean-code
  - clean-coder-blog
---

**Clean Micro-service Architecture** summarizes clean-code-style guidance from [Clean Micro-service Architecture](https://blog.cleancoder.com/uncle-bob/2014/10/01/CleanMicroserviceArchitecture.html).

Microservices do not remove the need for clean internal boundaries. Service size and deployment
topology are separate from dependency direction and separation of policy from detail.

## Style Guidance

- Do not rely on service boundaries alone to create clean design.
- Keep business rules protected from transport, persistence, and framework concerns inside each service.
- Treat distribution as a cost that must be justified by deployability and ownership needs.

## Related Concepts

- [[Microservices]]
- [[Clean Architecture]]
