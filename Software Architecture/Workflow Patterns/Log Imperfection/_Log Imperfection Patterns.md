---
title: Log Imperfection Patterns
---
Event logs look objective because they are tabular: a case identifier, an activity name, a timestamp, and a handful of attributes. In practice, those columns are the result of design choices made by forms, screens, batch jobs, integrations, and people under time pressure. Log imperfection patterns name the recurring ways that those choices damage the evidence used for process mining.

The useful question is not whether the log is "clean". It is which kind of imperfection is present, what analytical assumption it breaks, and whether the repair should be filtering, enrichment, abstraction, re-correlation, or explicit uncertainty. The patterns below are best read as diagnostic lenses for event-log preparation.

## Patterns

- [[Log Imperfection/Form-based Event Capture|Form-based Event Capture]]
- [[Log Imperfection/Inadvertent Time Travel|Inadvertent Time Travel]]
- [[Log Imperfection/Unanchored Event|Unanchored Event]]
- [[Log Imperfection/Scattered Event|Scattered Event]]
- [[Log Imperfection/Elusive Case|Elusive Case]]
- [[Log Imperfection/Scattered Case|Scattered Case]]
- [[Log Imperfection/Collateral Events|Collateral Events]]
- [[Log Imperfection/Polluted Label|Polluted Label]]
- [[Log Imperfection/Distorted Label|Distorted Label]]
- [[Log Imperfection/Synonymous Labels|Synonymous Labels]]
- [[Log Imperfection/Homonymous Label|Homonymous Label]]

## References
- [Log Imperfection Patterns index](http://workflowpatterns.com/patterns/logimperfection/)
