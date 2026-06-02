---
title: Data Patterns
---
Data patterns describe how information is scoped, exchanged, transformed, tested, and used to steer a workflow. Control-flow patterns explain when work can proceed; data patterns explain what a task, case, workflow, or external system can know when it proceeds. Good models make these boundaries explicit because ambiguous data ownership is a common source of hidden coupling, race conditions, stale decisions, and hard-to-replay process behavior.
The Workflow Patterns data catalog is useful because it separates concerns that are often collapsed in implementation: visibility is not interaction, interaction is not transfer mechanism, transfer mechanism is not transformation, and transformation is not routing. A workflow model can therefore say, for example, that a task reads case data, receives a copy of one value, locks a referenced record during execution, transforms an output, and only completes when a postcondition holds.
Visibility Patterns: Visibility patterns define where a data element is available without treating that availability as a data exchange. They answer the question: which part of the workflow owns and can observe this data?

Internal Interaction Patterns: Internal interaction patterns define how data moves between workflow components under the same workflow system boundary. They answer the question: who sends data to whom inside the process model?

External Interaction Patterns: External interaction patterns define movement across the workflow system boundary. Push means the source actively sends data. Pull means the target actively asks for data.
Transfer and Transformation Patterns: Transfer patterns define what is handed over when data moves: a value, a reference, a locked reference, or a copy-in/copy-out pair. Transformation patterns define how data shape changes at the boundary of an activity.

Data-Driven Routing and Trigger Patterns: Routing and trigger patterns use data as part of control behavior. Preconditions guard task start, postconditions guard task completion, triggers start work, and routing chooses the next path.

## Patterns

### Visibility Patterns

- [[Data/Task Data|Task Data]]
- [[Data/Block Data|Block Data]]
- [[Data/Scope Data|Scope Data]]
- [[Data/Multiple Instance Data|Multiple Instance Data]]
- [[Data/Case Data|Case Data]]
- [[Data/Folder Data|Folder Data]]
- [[Data/Workflow Data|Workflow Data]]
- [[Data/Environment Data|Environment Data]]

### Internal Interaction Patterns

- [[Data/Data Interaction - Task to Task|Data Interaction - Task to Task]]
- [[Data/Data Interaction - Block Task to Sub-Workflow Decomposition|Data Interaction - Block Task to Sub-Workflow Decomposition]]
- [[Data/Data Interaction - Sub-Workflow Decomposition to Block Task|Data Interaction - Sub-Workflow Decomposition to Block Task]]
- [[Data/Data Interaction - to Multiple Instance Task|Data Interaction - to Multiple Instance Task]]
- [[Data/Data Interaction - from Multiple Instance Task|Data Interaction - from Multiple Instance Task]]
- [[Data/Data Interaction - Case to Case|Data Interaction - Case to Case]]

### External Interaction Patterns

- [[Data/Data Interaction - Task to Environment - Push-Oriented|Data Interaction - Task to Environment - Push-Oriented]]
- [[Data/Data Interaction - Environment to Task - Pull-Oriented|Data Interaction - Environment to Task - Pull-Oriented]]
- [[Data/Data Interaction - Environment to Task - Push-Oriented|Data Interaction - Environment to Task - Push-Oriented]]
- [[Data/Data Interaction - Task to Environment - Pull-Oriented|Data Interaction - Task to Environment - Pull-Oriented]]
- [[Data/Data Interaction - Case to Environment - Push-Oriented|Data Interaction - Case to Environment - Push-Oriented]]
- [[Data/Data Interaction - Environment to Case - Pull-Oriented|Data Interaction - Environment to Case - Pull-Oriented]]
- [[Data/Data Interaction - Environment to Case - Push-Oriented|Data Interaction - Environment to Case - Push-Oriented]]
- [[Data/Data Interaction - Case to Environment - Pull-Oriented|Data Interaction - Case to Environment - Pull-Oriented]]
- [[Data/Data Interaction - Workflow to Environment - Push-Oriented|Data Interaction - Workflow to Environment - Push-Oriented]]
- [[Data/Data Interaction - Environment to Workflow - Pull-Oriented|Data Interaction - Environment to Workflow - Pull-Oriented]]
- [[Data/Data Interaction - Environment to Workflow - Push-Oriented|Data Interaction - Environment to Workflow - Push-Oriented]]
- [[Data/Data Interaction - Workflow to Environment - Pull-Oriented|Data Interaction - Workflow to Environment - Pull-Oriented]]

### Transfer and Transformation Patterns

- [[Data/Data Transfer by Value - Incoming|Data Transfer by Value - Incoming]]
- [[Data/Data Transfer by Value - Outgoing|Data Transfer by Value - Outgoing]]
- [[Data/Data Transfer - Copy In-Copy Out|Data Transfer - Copy In/Copy Out]]
- [[Data/Data Transfer by Reference - Unlocked|Data Transfer by Reference - Unlocked]]
- [[Data/Data Transfer by Reference - With Lock|Data Transfer by Reference - With Lock]]
- [[Data/Data Transformation - Input|Data Transformation - Input]]
- [[Data/Data Transformation - Output|Data Transformation - Output]]

### Data-Driven Routing and Trigger Patterns

- [[Data/Task Precondition - Data Existence|Task Precondition - Data Existence]]
- [[Data/Task Precondition - Data Value|Task Precondition - Data Value]]
- [[Data/Task Postcondition - Data Existence|Task Postcondition - Data Existence]]
- [[Data/Task Postcondition - Data Value|Task Postcondition - Data Value]]
- [[Data/Event-based Task Trigger|Event-based Task Trigger]]
- [[Data/Data-based Task Trigger|Data-based Task Trigger]]
- [[Data/Data-based Routing|Data-based Routing]]

## References
- [Data Patterns index](http://workflowpatterns.com/patterns/data/)
