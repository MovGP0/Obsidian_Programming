In `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add CoreWCF
builder.Services.AddServiceModelServices()
                .AddServiceModelMetadata(); // to serve WSDL/MEX
// Optional bindings with named options (if you want DI-configured instances)
builder.Services.AddSingleton(provider => {
    var b = new NetTcpBinding(SecurityMode.Transport);
    b.MaxReceivedMessageSize = 10 * 1024 * 1024;
    return b;
});

var app = builder.Build();

// HTTPS endpoint (BasicHttp)
app.UseRouting();
app.UseEndpoints(endpoints => {
    endpoints.UseServiceModel(builder => {
        builder.AddService<CalculatorService>();
        builder.AddServiceEndpoint<CalculatorService, ICalculator>(new BasicHttpBinding(BasicHttpSecurityMode.Transport), "/Calculator");
        builder.AddServiceEndpoint<CalculatorService, ICalculator>(app.Services.GetRequiredService<NetTcpBinding>(), new Uri("net.tcp://localhost:808/Calculator"));
        var smb = app.Services.GetRequiredService<CoreWCF.Description.ServiceMetadataBehavior>();
        smb.HttpsGetEnabled = true; // serve WSDL at /Calculator?wsdl
        builder.AddServiceMetadataEndpoint(new CoreWCF.Channels.BindingElement(), CoreWCF.Description.MetadataExchangeBindings.CreateMexHttpsBinding(), "/mex");
    });
});

app.Run();
```

### `appsettings.json` driven binding (optional pattern)

CoreWCF does not natively bind from configuration like WCF; typical practice is to read settings and build bindings in code:

```csharp
var cfg = builder.Configuration.GetSection("Bindings:BasicHttp");
var b = new BasicHttpBinding(BasicHttpSecurityMode.Transport) {
    MaxReceivedMessageSize = cfg.GetValue<long>("MaxReceivedMessageSize", 10485760),
    ReaderQuotas = new System.Xml.XmlDictionaryReaderQuotas {
        MaxArrayLength = cfg.GetValue<int>("ReaderQuotas:MaxArrayLength", 10485760),
        MaxStringContentLength = cfg.GetValue<int>("ReaderQuotas:MaxStringContentLength", 10485760)
    }
};
```

### Kestrel + Net.TCP

- CoreWCF’s `NetTcp` can run side-by-side with HTTP in ASP.NET Core by hosting a separate Net.TCP listener (often via `System.ServiceModel.NetTcp` integration).
- In containers, expose both ports (e.g., 443 for HTTPS, 808 for Net.TCP).
