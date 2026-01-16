> Context engineering is the art and science of filling the context window with just the right information at each step of an agent’s trajectory


## Common strategies

- **Writing** context
	- Saving the information outside the context window to help an agent perform a task.
- **Selecting** context
	- Pulling information into the context window to help an agent perform a task.
- **Compressing** context
	- Summarization of the context
	- Retaining only the tokens required to perform a task.
	- Example: "auto compact" in Claude Code
- **Isolating** context
	- Splitting the information to help an agent perform a task.
	- In Multi-Agent-Systems, the agent might only get the information required for it's sub-task

## Types of context

- **Instructions**: prompts, memories, few‑shot examples, tool descriptions, etc.
- **Knowledge**: facts, memories, etc.
- **Tools**: feedback from tool calls

- **Scratchpad**:
	- Summary of the current action.
	- Temporary memory that is only relevant for the current task
- **Memory**:
	- Persistent long/term memory that is used over multiple sessions/tasks

## Memory types

- **Semantic** (Facts; task-specific information)
- **Episodic** (Experiences; past agent actions)
- **Procedural** (Instructions; Agent system prompt)

## References

- [Context Engineering for Agents](https://mirror-feeling-d80.notion.site/Context-Engineering-for-Agents-21f808527b17802db4b1c84a068a0976)
- [The rise of "context engineering"](https://blog.langchain.com/the-rise-of-context-engineering/)
