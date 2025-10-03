### Configure WCF Client with App.config

```xml
<configuration>
  <system.serviceModel>
    <bindings>
      <basicHttpBinding>
        <binding name="BasicHttpSecure" maxReceivedMessageSize="10485760">
          <security mode="Transport"/> <!-- HTTPS -->
          <readerQuotas maxArrayLength="10485760" maxStringContentLength="10485760"/>
        </binding>
      </basicHttpBinding>
      <netTcpBinding>
        <binding name="NetTcpStreamed" transferMode="Streamed" maxReceivedMessageSize="67108864">
          <security mode="Transport"> <!-- TLS over TCP -->
            <transport clientCredentialType="Certificate"/>
          </security>
        </binding>
      </netTcpBinding>
    </bindings>

    <client>
      <endpoint address="https://api.example.com/calc.svc"
                binding="basicHttpBinding"
                bindingConfiguration="BasicHttpSecure"
                contract="Contracts.ICalculator"
                name="CalcHttp" />
      <endpoint address="net.tcp://svc.example.com:808/calc"
                binding="netTcpBinding"
                bindingConfiguration="NetTcpStreamed"
                contract="Contracts.ICalculator"
                name="CalcTcp" />
    </client>
  </system.serviceModel>
</configuration>
```

#### Creating a client

- **Generated proxy**: `svcutil.exe` or `dotnet-svcutil` (Core).
- **ChannelFactory** (no generated class):

```csharp
var cf = new ChannelFactory<ICalculator>("CalcHttp"); // name from config
ICalculator proxy = cf.CreateChannel();
double sum = proxy.Add(1, 2);
((IClientChannel)proxy).Close();
cf.Close();
```

### CoreWCF client options

CoreWCF is server-side focused; **clients are standard WCF**. Use:
- `ChannelFactory<T>` with WCF bindings in .NET (works on .NET 6+).
- `dotnet-svcutil` against CoreWCF metadata (MEX or WSDL).

#### Configure Credentials

```xml
<endpoint ...>
  <identity>
    <dns value="svc.example.com" />
  </identity>
</endpoint>
<behaviors>
  <endpointBehaviors>
    <behavior name="ClientCreds">
      <clientCredentials>
        <clientCertificate findValue="CN=client" storeLocation="CurrentUser" storeName="My" x509FindType="FindBySubjectDistinguishedName"/>
        <serviceCertificate>
          <authentication certificateValidationMode="ChainTrust" revocationMode="Online"/>
        </serviceCertificate>
      </clientCredentials>
    </behavior>
  </endpointBehaviors>
</behaviors>
```

Attach with `behaviorConfiguration="ClientCreds"` on the endpoint.
