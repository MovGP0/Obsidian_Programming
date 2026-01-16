An **LLM agent** is an Al-driven application that uses a model or LLM, guided by instructions that shape its behavior.

It also has access to additional tools that enhance its capabilities, all running within a dynamic runtime environment.

The agent consists of:
- **Orchestration**: Central control unit that handles:
  - **Profile, goals & instructions**: The configuration and behavior of the agent.
  - **Memory**
  	- **Short-term memory**
  	- **Long-term memory**
  - **Model-based reasoning/planning**: This includes things like decomposing complex questions or reflecting on queries.
- **Generative AI Models**: Used to generate responses or intermediate outputs. The agent can use multiple generative models.
- **Tools**: External capabilities the agent can invoke:
  - APIs, Functions, and Databases using the [[Model Context Protocol (MCP)]]
  - other Agents using the [[Agent2Agent Protocol (A2A)]].

## When to use LLM Agents

**Predictability** 
- Agents can handle tasks that require dynamic decision making.
- Not well suited for tasks that require predictability.
**Consistency and control**
- Agents are stochastic and are not suited for tasks that require high consistency.
**Boundaries and complexity**
- Are the boundaries and subtasks clearly defined?
- Is open-ended reasoning required?
**Latency and const**
- LLMs have higher latency and financial cost.

## Design consideration

- Workflows
  - Consider Workflows where the agent is represented as a node with a set of clearly defined possible outcomes.
  - Some nodes of the Workflow might be fully automated, while others are handled by an agent.
- Frameworks
  - Enable quick prototyping
  - Hide the inner working and primitives of the agent, which leads to a reduced control
  - Frameworks enforce design choices and limitations that may or may not align with the goals of the system
  - May reduce system performance
- Single Responsibility
  - Agents should be focused on one specific tasks
  - Prioritize usefullness and working systems over complexity
  - Use iterative development and refinement
- Observability
  - Observe the real-world usage of the agents and observe which use-cases and functionalities are working and which are failing
- Promts
  - Use promts that the model can understand.
  - Ensure proper descriptions when the agents need to access tools or other agents

## References

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Prompt Engineering Guide](https://learnprompting.org/docs/introduction)
