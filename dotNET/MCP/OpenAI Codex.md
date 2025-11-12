## Configuration

via `~/.codex/config.toml`

```toml
model = "gpt-5-codex"
windows_wsl_setup_acknowledged = true
model_reasoning_effort = "medium"
approval_policy = "on-failure" # untrusted, on-failure, on-request, never
sandbox_mode = "danger-full-access" # read-only, workspace-write, danger-full-access

[features]
streamable_shell = true # enable the streamable exec tool
web_search_request = true # allow the model to request web searches

[projects.'\\?\D:\']
trust_level = "trusted"

[mcp_servers.microsoft_learn]
type = "http"
url = "https://learn.microsoft.com/api/mcp"

[mcp_servers.rider]
type = "stdio"
env = { IJ_MCP_SERVER_PORT = "64560" }
command = "C:/Users/Johann.Dirry/AppData/Local/Programs/Rider/jbr/bin/java"
args = [
  "-classpath",
  "C:/Users/Johann.Dirry/AppData/Local/Programs/Rider/plugins/mcpserver/lib/mcpserver-frontend.jar;C:/Users/Johann.Dirry/AppData/Local/Programs/Rider/lib/util-8.jar;C:/Users/Johann.Dirry/AppData/Local/Programs/Rider/lib/modules/intellij.libraries.ktor.client.cio.jar;C:/Users/Johann.Dirry/AppData/Local/Programs/Rider/lib/lib-client.jar;C:/Users/Johann.Dirry/AppData/Local/Programs/Rider/lib/modules/intellij.libraries.ktor.client.jar",
  "com.intellij.mcpserver.stdio.McpStdioRunnerKt"
]
```

### References
- [OpenAI Developers: Configuring Codex](https://developers.openai.com/codex/local-config/)
- [GitHub: OpenAI Codex Config](https://github.com/openai/codex/blob/main/docs/config.md)
