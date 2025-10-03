---
title: WCF Hosting in Self-hosted application
---
Example using NetTcp + BasicHttp:

```csharp
var baseHttp = new Uri("https://localhost:5001/Calculator");
var baseTcp  = new Uri("net.tcp://localhost:808/Calculator");
using var host = new ServiceHost(typeof(CalculatorService), baseHttp, baseTcp);

host.AddServiceEndpoint(typeof(ICalculator), new BasicHttpBinding(BasicHttpSecurityMode.Transport), "");
var tcpBinding = new NetTcpBinding(SecurityMode.Transport) {
    TransferMode = TransferMode.Buffered,
    MaxReceivedMessageSize = 10 * 1024 * 1024
};
host.AddServiceEndpoint(typeof(ICalculator), tcpBinding, "");

var smb = host.Description.Behaviors.Find<ServiceMetadataBehavior>() ?? new ServiceMetadataBehavior();
smb.HttpsGetEnabled = true;
host.Description.Behaviors.Add(smb);
host.AddServiceEndpoint(ServiceMetadataBehavior.MexContractName,
                        MetadataExchangeBindings.CreateMexHttpsBinding(), "mex");
host.Open();
// ...
```
