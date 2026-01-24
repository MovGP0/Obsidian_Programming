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
```

## MCP Servers

### Microsoft Learn

```toml
[mcp_servers.microsoft_learn]
type = "http"
url = "https://learn.microsoft.com/api/mcp"
```

### Rider

Calling Rider via MCP Proxy
```toml
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

Calling Rider directly
```toml
[mcp_servers.JetBrainsRider]
type = "stdio"
command = "C:\\Program Files (x86)\\JetBrains\\JetBrains Rider 2024.3\\jbr\\bin\\java"
args = [
  "-classpath",
  "C:\\Program Files (x86)\\JetBrains\\JetBrains Rider 2024.3\\plugins\\mcpserver\\lib\\mcpserver-frontend.jar;C:\\Program Files (x86)\\JetBrains\\JetBrains Rider 2024.3\\lib\\util-8.jar;C:\\Program Files (x86)\\JetBrains\\JetBrains Rider 2024.3\\lib\\module-intellij.libraries.ktor.client.cio.jar;C:\\Program Files (x86)\\JetBrains\\JetBrains Rider 2024.3\\lib\\module-intellij.libraries.ktor.client.jar;C:\\Program Files (x86)\\JetBrains\\JetBrains Rider 2024.3\\lib\\module-intellij.libraries.ktor.network.tls.jar;C:\\Program Files (x86)\\JetBrains\\JetBrains Rider 2024.3\\lib\\module-intellij.libraries.ktor.io.jar;C:\\Program Files (x86)\\JetBrains\\JetBrains Rider 2024.3\\lib\\module-intellij.libraries.ktor.utils.jar;C:\\Program Files (x86)\\JetBrains\\JetBrains Rider 2024.3\\lib\\module-intellij.libraries.kotlinx.io.jar;C:\\Program Files (x86)\\JetBrains\\JetBrains Rider 2024.3\\lib\\module-intellij.libraries.kotlinx.serialization.core.jar;C:\\Program Files (x86)\\JetBrains\\JetBrains Rider 2024.3\\lib\\module-intellij.libraries.kotlinx.serialization.json.jar",
  "com.intellij.mcpserver.stdio.McpStdioRunnerKt"
]

[mcp_servers.JetBrainsRider.env]
IJ_MCP_SERVER_PORT = "64342"
```

### RustRover

```toml
[mcp_servers.RustRover]
type = "stdio"
command = "C:\\Program Files (x86)\\JetBrains\\RustRover 2024.3\\jbr\\bin\\java"
args= [
  "-classpath",
  "C:\\Program Files (x86)\\JetBrains\\RustRover 2024.3\\plugins\\mcpserver\\lib\\mcpserver-frontend.jar;C:\\Program Files (x86)\\JetBrains\\RustRover 2024.3\\lib\\util-8.jar;C:\\Program Files (x86)\\JetBrains\\RustRover 2024.3\\lib\\modules\\intellij.libraries.ktor.client.cio.jar;C:\\Program Files (x86)\\JetBrains\\RustRover 2024.3\\lib\\lib-client.jar;C:\\Program Files (x86)\\JetBrains\\RustRover 2024.3\\lib\\modules\\intellij.libraries.ktor.client.jar",
  "com.intellij.mcpserver.stdio.McpStdioRunnerKt"
]

[mcp_servers.RustRover.env]
IJ_MCP_SERVER_PORT = "64342"
```

## References
- [OpenAI Developers: Configuring Codex](https://developers.openai.com/codex/local-config/)
- [GitHub: OpenAI Codex Config](https://github.com/openai/codex/blob/main/docs/config.md)
