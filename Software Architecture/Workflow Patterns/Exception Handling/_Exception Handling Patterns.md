---
title: Exception Handling Patterns
---
Exception handling in workflow systems is not just a runtime concern. It is a modeling concern because the process model must say what counts as an exception, where the exception is allowed to be handled, who or what performs the recovery work, and how the workflow instance continues afterward. The patterns below organize those decisions so that exception behavior can be designed deliberately instead of being hidden in ad hoc scripts, manual workarounds, or engine-specific callbacks.

These notes cover the exception handling material from workflowpatterns.com and frame each entry as an authored Obsidian reference: what the entry is for, when to apply it, and how to model it without losing the difference between normal process logic and recovery logic.

## Patterns

- [[Exception Handling/Introduction|Introduction]]
- [[Exception Handling/A Framework for Exception Handling|A Framework for Exception Handling]]
- [[Exception Handling/Exception Types|Exception Types]]
- [[Exception Handling/Exception Handling at Work Item Level|Exception Handling at Work Item Level]]
- [[Exception Handling/Exception Handling at Case Level|Exception Handling at Case Level]]
- [[Exception Handling/Recovery Action|Recovery Action]]
- [[Exception Handling/Characterising Exception Handling Strategies|Characterising Exception Handling Strategies]]
- [[Exception Handling/Survey of Exception Handling Capabilities|Survey of Exception Handling Capabilities]]
- [[Exception Handling/Considerations for a Workflow Exception Language|Considerations for a Workflow Exception Language]]
- [[Exception Handling/Related Work|Related Work]]
- [[Exception Handling/Conclusions|Conclusions]]

## References
- [Exception Handling Patterns index](http://workflowpatterns.com/patterns/exception/)
