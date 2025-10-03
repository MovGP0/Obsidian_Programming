---
title: WCF vs. CoreWCF
---

|Topic|Classic WCF|CoreWCF|
|---|---|---|
|Hosting|IIS/WAS, self-host|ASP.NET Core pipeline|
|Config|Rich `system.serviceModel`|Primarily **code-based** (you can read from appsettings and build bindings)|
|Clients|WCF client or ChannelFactory|**Use WCF clients** (interop is wire-compatible)|
|Features|Full WS-* stack|Growing subset (NetTcp/BasicHttp/WSHttp/NamedPipe; MSMQ incomplete)|
|Diagnostics|WCF tracing + SvcTraceViewer|ASP.NET Core logging + CoreWCF diagnostics|
