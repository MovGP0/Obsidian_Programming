---
tags:
  - Vector-Database
---
## Setup via Docker (Windows)

Create folders
```powershell
New-Item -ItemType Directory -Force -Path D:\Docker\qdrant\storage
```

Create `D:\Docker\qdrant\docker-compose.yml`
```yaml
services:
  qdrant:
    image: qdrant/qdrant:latest
    container_name: qdrant
    restart: unless-stopped
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - "D:/Docker/qdrant/storage:/qdrant/storage"
    networks:
      - qdrant_net

networks:
  qdrant_net:
    name: qdrant_net
```

Start Qdrant
```powershell
docker compose -f D:\Docker\qdrant\docker-compose.yml up -d
```

Verify
```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:6333/
```

- REST API: [localhost:6333](http://localhost:6333/)
- Web UI: [localhost:6333/dashboard](http://localhost:6333/dashboard)
- GRPC API: [localhost:6334](http://localhost:6334/)

## Setup Qdrant MCP Server (Docker image)

Clone MCP server source
```powershell
git clone https://github.com/qdrant/mcp-server-qdrant.git D:\Docker\qdrant\mcp-server-qdrant-src
```

Build local image
```powershell
docker build -t mcp-server-qdrant:latest D:\Docker\qdrant\mcp-server-qdrant-src
```

Configure Codex MCP client (`~/.codex/config.toml`)
```toml
[mcp_servers.qdrant]
type = "stdio"
command = "docker"
args = [
  "run",
  "-i",
  "--rm",
  "--network",
  "qdrant_net",
  "-e",
  "QDRANT_URL=http://qdrant:6333",
  "-e",
  "COLLECTION_NAME=codex",
  "mcp-server-qdrant:latest",
  "mcp-server-qdrant"
]
startup_timeout_sec = 60
```

> [!notes]
>  - Qdrant container must be running before using the MCP server.
>  - Restart Codex after changing `~/.codex/config.toml` so the new MCP server is loaded.

Stop Qdrant with
```powershell
docker compose -f D:\Docker\qdrant\docker-compose.yml down
```

## Connect via .NET

Install NuGet:
```sh
dotnet add package Qdrant.Client
```

Connect to database:
```csharp
// connect via GRPC
var client = new QdrantClient("localhost", 6334);
```

Next steps:
- [[Qdrant Collections|Create a collection]]
- [[Qdrant Points|Add data-points]]
	- [[Qdrant Vectors|manage Vectors]]
	- [[Qdrant Payload|manage Payload]]
- [[Qdrant Queries|Query the data]]
