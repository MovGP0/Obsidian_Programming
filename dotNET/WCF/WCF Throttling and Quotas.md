## Service Throttling
```xml
<serviceBehaviors>
  <behavior name="HeavyLoad">
    <serviceThrottling
      maxConcurrentCalls="200"
      maxConcurrentSessions="400"
      maxConcurrentInstances="400"/>
  </behavior>
</serviceBehaviors>
```

## Reader Quotas
```xml
<bindings>
  <basicHttpBinding>
    <binding name="LargePayload" maxReceivedMessageSize="104857600">
      <readerQuotas maxDepth="64" maxArrayLength="104857600"
                    maxBytesPerRead="4096" maxStringContentLength="104857600"/>
    </binding>
  </basicHttpBinding>
</bindings>
```
