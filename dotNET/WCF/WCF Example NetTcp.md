
Configuration example using `NetTcp` with TLS + client certs (classic WCF on both sides)

## Contract

```csharp
[ServiceContract]
public interface IRestService {
    [OperationContract]
    [WebGet(UriTemplate = "/ping")]
    string Ping();
}
```

## Setup Server

Configure Binding:
```xml
<bindings>
  <netTcpBinding>
    <binding name="TcpCerts" securityMode="Transport">
      <security>
        <transport clientCredentialType="Certificate"/>
      </security>
    </binding>
  </netTcpBinding>
</bindings>
<services>
  <service name="Services.CalculatorService" behaviorConfiguration="ServiceBehavior">
    <endpoint address=""
              binding="netTcpBinding"
              bindingConfiguration="TcpCerts"
              contract="Contracts.ICalculator" />
    <host>
      <baseAddresses>
        <add baseAddress="net.tcp://0.0.0.0:808/Calculator"/>
      </baseAddresses>
    </host>
  </service>
</services>
<behaviors>
  <serviceBehaviors>
    <behavior name="ServiceBehavior">
      <serviceCredentials>
        <serviceCertificate findValue="CN=server" storeLocation="LocalMachine" storeName="My" x509FindType="FindBySubjectName"/>
        <clientCertificate>
          <authentication certificateValidationMode="ChainTrust"/>
        </clientCertificate>
      </serviceCredentials>
    </behavior>
  </serviceBehaviors>
</behaviors>
```

## Setup Client

```csharp
var binding = new NetTcpBinding(SecurityMode.Transport);
binding.Security.Transport.ClientCredentialType = TcpClientCredentialType.Certificate;

var addr = new EndpointAddress(new Uri("net.tcp://server:808/Calculator"),
                               new DnsEndpointIdentity("server"));
var cf = new ChannelFactory<ICalculator>(binding, addr);
cf.Credentials.ClientCertificate.SetCertificate(StoreLocation.CurrentUser, StoreName.My,
    X509FindType.FindBySubjectName, "client");
var proxy = cf.CreateChannel();
var result = proxy.Add(3, 4);
```
