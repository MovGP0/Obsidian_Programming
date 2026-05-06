## Create a client instance

```csharp
var configuration = new ApplicationConfiguration
{
    ApplicationName = "UA Sample Client",
	ApplicationType = ApplicationType.Client,
	ApplicationUri = $"urn:{Opc.Ua.Utils.GetHostName()}:OPCFoundation:SampleClient",
	TransportConfigurations = new TransportConfigurationCollection(),
	TransportQuotas = new TransportQuotas { OperationTimeout = 15000, MaxStringLength = 100000, MaxByteStringLength = 100000 },
	ClientConfiguration = new ClientConfiguration { DefaultSessionTimeout = 60000 },
	TraceConfiguration = new TraceConfiguration
	{
	    OutputFilePath = @"%CommonApplicationData%\Softing\OpcUaNetStandardToolkit\logs\SampleClient.log",
	    TraceMasks = 519
	},
	SecurityConfiguration = new SecurityConfiguration
	{
		ApplicationCertificate = new CertificateIdentifier
		{
			SubjectName = configuration.ApplicationName, // !!! important line too keep opc client creation time down !!!
			StoreType = CertificateStoreType.Directory,
			StorePath = @"%CommonApplicationData%\Softing\OpcUaNetStandardToolkit\pki\own"
		},
		TrustedPeerCertificates = new CertificateTrustList
		{
			StoreType = CertificateStoreType.Directory,
			StorePath = @"%CommonApplicationData%\Softing\OpcUaNetStandardToolkit\pki\trusted",
		},
		TrustedIssuerCertificates = new CertificateTrustList
		{
			StoreType = CertificateStoreType.Directory,
			StorePath = @"%CommonApplicationData%\Softing\OpcUaNetStandardToolkit\pki\issuer",
		},
		RejectedCertificateStore = new CertificateTrustList
		{
			StoreType = CertificateStoreType.Directory,
			StorePath = @"%CommonApplicationData%\Softing\OpcUaNetStandardToolkit\pki\rejected",
		},
		AutoAcceptUntrustedCertificates = true
	}
};

var clientTkConfigration = new ClientToolkitConfiguration
{
	DefaultSessionTimeout = 60000,
	DiscoveryOperationTimeout = 10000,
	DecodeCustomDataTypes = true
}           
configuration.UpdateExtension<ClientToolkitConfiguration>(new System.Xml.XmlQualifiedName("ClientToolkitConfiguration"), clientTkConfigration);

var application = UaApplication.Create(configuration).Result;
```

## Connect to a server

```csharp
ClientSession session = application.CreateSession(serverUrl, securityMode, securityPolicy, messageEncoding, userId)
session.SessionName = sessionName;
session.KeepAliveInterval = ...;
session.Timeout = ...;
session.CallCompleted += OnCallCompleted;
session.StateChanged += OnStateChanged;
session.Connect(deep: false, active: true);
```

## Browse or read nodes

```csharp
// Browse the root folder
ReferenceDescriptionCollection references;
byte[] continuationPoint;
session.Browse(
    null,
    null,
    ObjectIds.ObjectsFolder,
    0u,
    BrowseDirection.Forward,
    ReferenceTypeIds.HierarchicalReferences,
    true,
    (uint)NodeClass.Object | (uint)NodeClass.Variable,
    out continuationPoint,
    out references);

// Iterate through the references
foreach (var reference in references)
{
    Console.WriteLine($"NodeId: {reference.NodeId}, BrowseName: {reference.BrowseName}, DisplayName: {reference.DisplayName}");
}

// Read a specific node's value
DataValue value = session.ReadValue(nodeId);
Console.WriteLine($"Value: {value.Value}, StatusCode: {value.StatusCode}");
```

## Write to nodes

```csharp
// Define the value to write
Variant newValue = new Variant(42); // Example: writing the integer 42

// Create a WriteValue object
WriteValue writeValue = new WriteValue
{
    NodeId = nodeId,
    AttributeId = Attributes.Value,
    Value = new DataValue(newValue)
};

// Perform the write operation
StatusCodeCollection results;
DiagnosticInfoCollection diagnosticInfos;
session.Write(
    null,
    new WriteValueCollection { writeValue },
    out results,
    out diagnosticInfos);

// Check the result
if (StatusCode.IsGood(results[0]))
{
    Console.WriteLine("Write successful.");
}
else
{
    Console.WriteLine($"Write failed: {results[0]}");
}
```

## Subscribe to nodes/events

```csharp
// Create a subscription
Subscription subscription = new Subscription(session.DefaultSubscription)
{
    PublishingInterval = 1000, // 1 second
    KeepAliveCount = 10,
    LifetimeCount = 20,
    MaxNotificationsPerPublish = 1000,
    PublishingEnabled = true,
    Priority = 0
};

// Define the monitored item
MonitoredItem monitoredItem = new MonitoredItem
{
    StartNodeId = nodeId,
    AttributeId = Attributes.Value,
    MonitoringMode = MonitoringMode.Reporting,
    SamplingInterval = 1000, // 1 second
    QueueSize = 10,
    DiscardOldest = true
};

// Handle the notification
monitoredItem.Notification += OnMonitoredItemNotification;

// Add the monitored item to the subscription
subscription.AddItem(monitoredItem);
session.AddSubscription(subscription);
subscription.Create();

// Notification handler
private static void OnMonitoredItemNotification(MonitoredItem item, MonitoredItemNotificationEventArgs e)
{
    foreach (var value in item.DequeueValues())
    {
        Console.WriteLine($"Value: {value.Value}, Timestamp: {value.SourceTimestamp}");
    }
}
```

## Disconnect from the server

```csharp
// Disconnect the session
session.Disconnect();

// Dispose of the session
session.Dispose();

// Dispose of the application
application.Dispose();
```