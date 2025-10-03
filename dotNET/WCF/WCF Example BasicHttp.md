Configuration example using `BasicHttp` with HTTPS.

## Contract

```csharp
[ServiceContract]
public interface IRestService {
    [OperationContract]
    [WebGet(UriTemplate = "/ping")]
    string Ping();
}
```

## Server
- add `BasicHttp` endpoint at `/Calculator`
- Use `HttpsGetEnabled = true`

The configuration depends on the hosting model:
- [[WCF Hosting IIS WAS]]
- [[WCF Hosting in Self-hosted application]]
- [[WCF Hosting in ASP.NET Core (CoreWCF)]]

## Client

Using `ChannelFactory`:
```csharp
var binding = new BasicHttpBinding(BasicHttpSecurityMode.Transport);
var endpoint = new EndpointAddress("https://host.example.com/Calculator");
var cf = new ChannelFactory<ICalculator>(binding, endpoint);
var ch = cf.CreateChannel();
Console.WriteLine(await Task.Run(() => ch.Add(1,2)));
((IClientChannel)ch).Close();
cf.Close();
```
