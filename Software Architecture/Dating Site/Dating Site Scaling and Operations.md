---
title: Dating Site Scaling and Operations
---
**Dating site scaling and operations** increases capacity by removing shared bottlenecks, isolating workloads, and preserving simple ownership rules. Scaling is an iterative process. Capacity data should decide when a component is split or partitioned.

## Workload shape

The main workloads are different:

| Workload | Shape | Main scaling control |
| --- | --- | --- |
| Authentication and profiles | Moderate transactional reads and writes | Stateless API replicas, SQL indexes, read replicas |
| Onboarding and verification | Bursty third-party calls and abuse-sensitive workflows | Provider adapters, queues, strict rate limits, idempotent callbacks |
| Image management | Large byte transfers and bursty CPU work | Direct object upload, CDN, queues, worker autoscaling |
| Discovery and ranking | High read rate and compute-heavy scoring | Candidate indexes, feature cache, precomputation, fallbacks |
| Chat | Many long-lived connections and append-only writes | WebSocket gateways, partitioned streams, message-store partitions |
| Advertising | High event rate with eventual aggregation | Stateless decisions, event stream, windowed aggregation |
| Subscriptions | Low rate but high consistency and audit needs | PSP adapter, webhook inbox, reconciliation, entitlement cache |

## Capacity worksheet

Collect these numbers before selecting partitions or instance counts:

- registered users and daily active users (**DAU**);
- peak concurrent sessions and WebSocket connections;
- discovery pages per active user per day and candidates per page;
- likes, passes, blocks, and matches per second;
- messages per active user per day and message byte distribution;
- image uploads per day, average source size, and variant expansion factor;
- ad decisions, impressions, and clicks per active user per day;
- new subscriptions, renewals, failed payments, refunds, and provider webhooks per day;
- target latency, availability, recovery point objective, and recovery time objective;
- regional traffic and data-residency requirements.

For any daily action count $N$, the average requests per second are:

$$
R_{avg} = \frac{N}{86{,}400}
$$

Apply a measured peak factor. Do not size only for the daily average. Image processing, notifications, and ranking refreshes can create internal peaks even when user traffic is stable.

## Storage plan

| Data | Initial store | Later scale unit |
| --- | --- | --- |
| Accounts, profiles, catalog, likes, matches | Relational database | Read replicas, then partition by user or canonical pair key |
| Verification and age-assurance results | Relational database with protected fields | User ID and retention class |
| User answers | Relational partitioned table | User ID |
| Profile discovery projection | Search or geospatial index | Region or index shard |
| Ranked candidate lists and online features | Distributed cache or key-value store | User ID |
| Image bytes and variants | Object storage plus CDN | Provider-managed object key |
| Conversations and messages | Relational store at first, then append-optimized store | Conversation ID |
| Events | Durable partitioned log | Aggregate or conversation key |
| Subscriptions, payment-event inbox, and entitlements | Relational database | User ID or provider customer ID |
| Ad impressions and clicks | Event stream and analytical store | Event time and placement or campaign key |
| Analytics and training data | Object or analytical storage | Date and data domain |

The source database owns facts. Search indexes, caches, recommendation lists, feature stores, and analytics tables are projections. They must be rebuildable.

## Reliability patterns

- Keep HTTP application instances stateless.
- Deploy at least two instances across failure zones for every required online component.
- Use timeouts, bounded retries with jitter, circuit breakers, and bulkheads.
- Require idempotency keys for retried commands.
- Use a transactional outbox for database-to-event publication.
- Give each consumer a dead-letter policy and a replay procedure.
- Apply backpressure. A full queue must not cause unlimited memory growth.
- Test restoration from backup. A successful backup job is not proof of recovery.

## Graceful degradation

| Failure | User-visible fallback |
| --- | --- |
| Ranker unavailable | Serve a short cached list or simple filter plus compatibility order |
| Feature store slow | Use stable batch features and omit optional online features |
| Image moderation delayed | Keep new images in processing state; continue to show approved images |
| CDN or variant missing | Show a placeholder and queue repair |
| WebSocket unavailable | Retry with backoff and synchronize message history over HTTPS |
| Push provider unavailable | Keep the durable message; send notification later or omit it |
| Email, phone, or age provider unavailable | Pause new activation and preserve completed verification state |
| Payment provider unavailable | Preserve existing entitlements; pause new purchases and plan changes |
| Ad provider unavailable | Return an empty placement or a house promotion |
| Analytics unavailable | Buffer bounded events; never block a user command on analytics |

Safety and authorization checks do not fail open.

## Multi-region strategy

Start with one write region and multiple availability zones. Add global CDN delivery and regional read projections first. When another write region becomes necessary, assign each user a home region.

- Route profile and answer writes to the user's home region.
- Place a conversation in a stable home region derived from its conversation ID or participants.
- Replicate public, approved profile projections to serving regions.
- Keep block and suspension signals on a high-priority replication path.
- Resolve ownership before accepting a write. Avoid unrestricted multi-primary writes for the same record.

## Observability

Use correlation IDs across HTTP, WebSocket, queue, and worker operations. Do not put message text, tokens, precise location, answers, or image URLs in logs.

Measure:

- request rate, error rate, and latency by endpoint;
- database saturation, slow queries, replication delay, and lock time;
- cache hit rate and stale-result filtering;
- queue depth, oldest-event age, retry count, and dead-letter count;
- active WebSocket connections, reconnect rate, and delivery delay;
- image-processing time and rejection reasons;
- ranking latency, candidate count, feature age, and fallback rate;
- block and suspension propagation latency.

## Service topology and growth

Start with existing platform services and small domain deployables. Several custom services can share a PostgreSQL cluster, event broker, and Kubernetes cluster while retaining separate schemas and credentials.

1. Run identity, authorization, verification, object storage, image processing, chat, payments, search, cache, broker, and telemetry as existing managed or self-hosted products.
2. Keep custom dating logic in profile, question and answer, match, ranking, media control, safety, chat-adapter, and monetization services.
3. Scale replicas and workers for each workload independently.
4. Split a shared stateful cluster only when capacity, security, residency, failure isolation, or maintenance data supports the change.
5. Partition hot data by stable ownership keys such as user ID, canonical pair ID, or conversation ID.

Do not confuse the number of containers with isolation. Two services that share tables, deployment credentials, and failure modes are still tightly coupled. See [[Dating Site Platform Services]].

## Sources

- [ByteByteGo: Scale From Zero To Millions Of Users](https://bytebytego.com/courses/system-design-interview/scale-from-zero-to-millions-of-users)
- [ByteByteGo: Design A Rate Limiter](https://bytebytego.com/courses/system-design-interview/design-a-rate-limiter)
- [ByteByteGo: Design A Distributed Message Queue](https://bytebytego.com/courses/system-design-interview/design-a-distributed-message-queue)
- [ByteByteGo: Metrics Monitoring and Alerting System](https://bytebytego.com/courses/system-design-interview/metrics-monitoring-and-alerting-system)
- [Kubernetes StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
- [[Scalability]]
- [[12 Factor App]]
- [[Consistent Hashing]]
