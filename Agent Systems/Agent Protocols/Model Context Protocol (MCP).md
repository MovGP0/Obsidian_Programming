The **Model Context Protocol** (**MCP**) is an open standard developed by Anthropic for connecting AI models to external tools and data sources through a single interface.

## Configuring MCP Severs

MCP Servers can be usually configured using a JSON file. 

**Examples**

Simple example that adds an MCP server that is started with a shell command:
```json
  "mcpServers": {
    "repomix": {
      "note": "Repomix STDIO Server",
      "command": "npx",
      "args": [ "-y", "repomix", "--mcp" ]
    },
```

The same tool but executed via a [[Docker]] container:
```json
  "mcpServers": {
    "repomix-docker": {
      "note": "Repomix Docker Container",
      "command": "docker",
      "args": ["run","-i","--rm","ghcr.io/yamadashy/repomix","--mcp"]
    }
  }
```

It's also possible to specify environment variables:
```json
  "mcpServers": {
    "mcp-atlassian": {
      "note": "Atlassian Docker Container",
      "command": "docker",
      "args": [
        "run",
        "-i",
        "-e",
        "JIRA_URL",
        "-e",
        "JIRA_USERNAME",
        "-e",
        "JIRA_API_TOKEN",
        "ghcr.io/sooperset/mcp-atlassian:latest"
      ],
      "env": {
        "CONFLUENCE_URL": "https://your-company.atlassian.net/wiki",
        "CONFLUENCE_USERNAME": "your.email@company.com",
        "CONFLUENCE_API_TOKEN": "your_confluence_api_token",
        "JIRA_URL": "xxx.atlassian.net",
        "JIRA_USERNAME": "your.email@company.com",
        "JIRA_API_TOKEN": "xxx"
      },
    }
  }
```

Another possibility is to use a URL to the server:
```json
{
  "mcpServers": {
    "repomix-sse": {
      "type": "sse",
      "url": "https://my-localhost:8080/repomix/mcp",
      "note": "Repomix MCP Server"
    }
  }
}
```

> [!Note]
> The `type` parameter is one of 
> - `stdio` (default)
> 	- uses the `stdin`/`stdout`/`stderr` streams of the operating system
> - `sse` (obsolete) 
> 	- uses HTTP + [[Server-Sent Events (SSE)|SSE]] transport
> 	- Response `content-type` header is either `text/event-stream` or `application/json`
> - `streamable-http` 
> 	- like `sse`, but supports session continuations (stateless servers) for improved scalability
> 	- `Last-Event-ID` and `Mcp-Session-Id` HTTP-Headers are used to resume conversations

> [!Note]
> The exact syntax might be different dependent on the tool that the configuration is for.

## Configure MCP Clients

> [!Note]
> Some clients may require an subscription for MCP to be supported

**Claude Deskop**
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- MacOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Claude Code**

By specifying the settings as arguments:
```bash
claude mcp add-json mytool '{"type":"stdio","command":"/path/to/mytool","args":["--foo"]}'
```

By importing the `claude_desktop_config.json` file:
```bash
claude mcp add-from-claude-desktop
```

**Visual Studio Code**
- Windows: `%APPDATA%\Code\User\settings.json`
- MacOS: `~/Library/Application Support/Code/User/settings.json`
- Linux: `~/.config/Code/User/settings.json`

**OpenAI Codex**
- `~/.codex/config.json`

## MCP Inspector

Used for debugging and testing of MCP Servers
```bash
npx @modelcontextprotocol/inspector
```

## MCP 2.0

| Area             | MCP                   | MCP 2.0                                                           |
| ---------------- | --------------------- | ----------------------------------------------------------------- |
| Workflow support | Synchronous only      | **Asynchronous tasks and long-running jobs**<br>                  |
| Authorization    | Basic model, optional | **OAuth-aligned, protected resource metadata, scope negotiation** |
| Schema defaults  | Mixed                 | **JSON Schema 2020-12 default + default values**                  |
| Governance       | Emergent              | **Formal governance and extension processes**                     |
| Interoperability | Client/server basics  | **Improved identity, discovery, governance support**              |
| Transport Layer  | REST                  | JSON-RPC 2.0 over HTTPs and [[Server-Sent Events (SSE)]]          |
## Resources

- [Awesome .NET MCP](https://github.com/SciSharp/Awesome-DotNET-MCP): List of MCP resources for .NET development
- [Envisioning.io](https://www.envisioning.io/vocab/mcp-model-context-protocol): This site provides an overview of MCP as a framework for managing context in machine learning models, highlighting its importance in complex ML systems.
- [DEV Community](https://dev.to/mehmetakar/model-context-protocol-mcp-tutorial-3nda): Offers a tutorial on MCP, detailing its features such as dynamic context switching and memory management, particularly for conversational AI and large language models.
- [Wandb.ai](https://wandb.ai/onlineinference/mcp/reports/The-Model-Context-Protocol-MCP-by-Anthropic-Origins-functionality-and-impact--VmlldzoxMTY5NDI4MQ): Provides a technical breakdown of MCP, including its client-server architecture and how it enables AI models to access external resources.
- [Model Context Protocol Official Site](https://modelcontextprotocol.io/introduction): This is the official home page for MCP, offering tutorials, concepts, and development resources. It explains how MCP standardizes connections between AI models and data sources.
- [Anthropic: Model Context Protocol](https://www.anthropic.com/news/model-context-protocol): As the developer of MCP, Anthropic's website provides insights into the protocol's purpose, architecture, and its role in connecting AI systems with data sources.
- [GitHub: Model Context Protocol](https://github.com/modelcontextprotocol): The official MCP repository on GitHub is a valuable resource for developers looking to implement MCP in their projects.
- [TestCollab.com: Model Context Protocol (MCP): A Guide for QA Teams](https://testcollab.com/blog/model-context-protocol-mcp-a-guide-for-qa-teams)
- [How MCP Helps Machine Learning Interact with the World](https://mpgone.com/model-context-protocol-mcp/)
