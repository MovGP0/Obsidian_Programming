---
title: Control-Flow Patterns
---
Control-flow patterns describe how a workflow case moves between activities: sequencing, branching, joining, repetition, cancellation, termination, and external triggering. The patterns are useful as a modeling checklist because they separate similar-looking diagrams by their runtime semantics: what gets enabled, what waits, what is ignored, what is cancelled, and when a case can continue.

## Patterns

### Basic Control Flow Patterns

- [[Control-Flow/Sequence|Sequence]]
- [[Control-Flow/Parallel Split|Parallel Split]]
- [[Control-Flow/Synchronization|Synchronization]]
- [[Control-Flow/Exclusive Choice|Exclusive Choice]]
- [[Control-Flow/Simple Merge|Simple Merge]]

### Advanced Branching and Synchronization Patterns

- [[Control-Flow/Multi-Choice|Multi-Choice]]
- [[Control-Flow/Structured Synchronizing Merge|Structured Synchronizing Merge]]
- [[Control-Flow/Multi-Merge|Multi-Merge]]
- [[Control-Flow/Structured Discriminator|Structured Discriminator]]
- [[Control-Flow/Blocking Discriminator|Blocking Discriminator]]
- [[Control-Flow/Cancelling Discriminator|Cancelling Discriminator]]
- [[Control-Flow/Structured Partial Join|Structured Partial Join]]
- [[Control-Flow/Blocking Partial Join|Blocking Partial Join]]
- [[Control-Flow/Cancelling Partial Join|Cancelling Partial Join]]
- [[Control-Flow/Generalised AND-Join|Generalised AND-Join]]
- [[Control-Flow/Local Synchronizing Merge|Local Synchronizing Merge]]
- [[Control-Flow/General Synchronizing Merge|General Synchronizing Merge]]
- [[Control-Flow/Thread Merge|Thread Merge]]
- [[Control-Flow/Thread Split|Thread Split]]

### Multiple Instance Patterns

- [[Control-Flow/Multiple Instances without Synchronization|Multiple Instances without Synchronization]]
- [[Control-Flow/Multiple Instances with a Priori Design-Time Knowledge|Multiple Instances with a Priori Design-Time Knowledge]]
- [[Control-Flow/Multiple Instances with a Priori Run-Time Knowledge|Multiple Instances with a Priori Run-Time Knowledge]]
- [[Control-Flow/Multiple Instances without a Priori Run-Time Knowledge|Multiple Instances without a Priori Run-Time Knowledge]]
- [[Control-Flow/Static Partial Join for Multiple Instances|Static Partial Join for Multiple Instances]]
- [[Control-Flow/Cancelling Partial Join for Multiple Instances|Cancelling Partial Join for Multiple Instances]]
- [[Control-Flow/Dynamic Partial Join for Multiple Instances|Dynamic Partial Join for Multiple Instances]]

### State-based Patterns

- [[Control-Flow/Deferred Choice|Deferred Choice]]
- [[Control-Flow/Interleaved Parallel Routing|Interleaved Parallel Routing]]
- [[Control-Flow/Milestone|Milestone]]
- [[Control-Flow/Critical Section|Critical Section]]
- [[Control-Flow/Interleaved Routing|Interleaved Routing]]

### Cancellation and Force Completion Patterns

- [[Control-Flow/Cancel Task|Cancel Task]]
- [[Control-Flow/Cancel Case|Cancel Case]]
- [[Control-Flow/Cancel Region|Cancel Region]]
- [[Control-Flow/Cancel Multiple Instance Activity|Cancel Multiple Instance Activity]]
- [[Control-Flow/Complete Multiple Instance Activity|Complete Multiple Instance Activity]]

### Iteration Patterns

- [[Control-Flow/Arbitrary Cycles|Arbitrary Cycles]]
- [[Control-Flow/Structured Loop|Structured Loop]]
- [[Control-Flow/Recursion|Recursion]]

### Termination Patterns

- [[Control-Flow/Implicit Termination|Implicit Termination]]
- [[Control-Flow/Explicit Termination|Explicit Termination]]

### Trigger Patterns

- [[Control-Flow/Transient Trigger|Transient Trigger]]
- [[Control-Flow/Persistent Trigger|Persistent Trigger]]

## References
- [Control-Flow Patterns index](http://workflowpatterns.com/patterns/control/)
- [Workflow Patterns paper](http://workflowpatterns.com/documentation/documents/wfs-pat-2002.pdf)
