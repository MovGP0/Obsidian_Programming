### Quick matrix (common choices)

| Binding (WPF)         | Binding (CoreWCF)          | Transport     | Encoding  | Security modes               | Sessions | Streaming | Interop                         |
| --------------------- | -------------------------- | ------------- | --------- | ---------------------------- | -------- | --------- | ------------------------------- |
| `basicHttpBinding`    | `BasicHttp`                | HTTP/HTTPS    | Text      | None/Transport               | No       | Limited   | **Max** (ASMX/WS-Basic Profile) |
| `wsHttpBinding`       | `WSHttp`                   | HTTP/HTTPS    | Text      | None/Transport/Message/Mixed | Yes      | Limited   | WS-* capable                    |
| `netTcpBinding`       | `NetTcp`                   | TCP           | Binary    | None/Transport/Message       | Yes      | **Yes**   | .NET to .NET only               |
| `netNamedPipeBinding` | `NetNamedPipe`<br>(subset) | Named Pipes   | Binary    | Transport (Windows)          | Yes      | Yes       | Same machine                    |
| `netMsmqBinding`      |                            | MSMQ          | Binary    | Transport                    | Yes      | N/A       | Durable queuing                 |
| `wsDualHttpBinding`   |                            | HTTP (duplex) | Text      | As wsHttp                    | Yes      | No        | Behind NAT issues               |
| `webHttpBinding`      |                            | HTTP/HTTPS    | Text/JSON | Transport                    | No       | No        | REST-style (WCF WebHttp)        |

### Notes

- **Message security** gives end-to-end integrity/confidentiality across intermediaries; **Transport security** is TLS point-to-point and fastest.
- **Sessions** (reliable sessions / security sessions) affect scalability and require sticky routing if you load balance.
- For **large payloads/streams**, prefer `netTcpBinding` with `TransferMode.Streamed` and set quotas.

## Quick "Which binding should I choose?"

- **Public, cross-platform, simple SOAP**: `basicHttpBinding` (HTTPS).
- *_Enterprise WS-_ (claims, reliable sessions)**: `wsHttpBinding` (message or transport security).
- **High throughput inside LAN**: `netTcpBinding` (transport security).
- **Same machine IPC**: `netNamedPipeBinding`.
- **REST-like JSON** (legacy WCF style): `webHttpBinding` (consider **ASP.NET Core minimal APIs** instead for new work).
- **Queues**: `netMsmqBinding` (classic WCF; CoreWCF parity is limited—prefer Azure Service Bus / NServiceBus in new systems).

## Common Binding Configuration Examples

### `basicHttpBinding` (HTTPS, interop)

```xml
<basicHttpBinding>
  <binding name="BasicHttps10MB" maxReceivedMessageSize="10485760">
    <security mode="Transport"/>
    <readerQuotas maxArrayLength="10485760" maxStringContentLength="10485760"/>
  </binding>
</basicHttpBinding>
```

### `wsHttpBinding` (enterprise WS-* features)

```xml
<wsHttpBinding>
  <binding name="WsHttpMessageSecurity" reliableSessionEnabled="true">
    <security mode="Message">
      <message clientCredentialType="UserName" establishSecurityContext="true"/>
    </security>
  </binding>
</wsHttpBinding>
```

### `netTcpBinding` (intranet, performance, streaming)

```xml
<netTcpBinding>
  <binding name="TcpStreamed" transferMode="Streamed"
           maxReceivedMessageSize="67108864" listenBacklog="200">
    <security mode="Transport"> <!-- TLS -->
      <transport clientCredentialType="Certificate"/>
    </security>
    <readerQuotas maxDepth="64" maxArrayLength="67108864" maxStringContentLength="67108864"/>
  </binding>
</netTcpBinding>
```

### `webHttpBinding` (REST-style WCF)

```xml
<system.serviceModel>
  <serviceHostingEnvironment aspNetCompatibilityEnabled="true"/>
  <behaviors>
    <endpointBehaviors>
      <behavior name="restBehavior">
        <webHttp helpEnabled="true" defaultOutgoingResponseFormat="Json"/>
      </behavior>
    </endpointBehaviors>
  </behaviors>
  <services>
    <service name="Services.RestService">
      <endpoint address=""
                binding="webHttpBinding"
                contract="Services.IRestService"
                behaviorConfiguration="restBehavior" />
    </service>
  </services>
</system.serviceModel>
```

```csharp
[ServiceContract]
public interface IRestService {
    [OperationContract]
    [WebGet(UriTemplate = "/ping")]
    string Ping();
}
```
