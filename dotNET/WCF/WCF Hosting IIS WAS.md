---
title: WCF Hosting in IIS/WAS
---
IIS/WAS web.config (BasicHttp + metadata):

```xml
<configuration>
  <system.serviceModel>
    <services>
      <service name="Services.CalculatorService" behaviorConfiguration="ServiceBehavior">
        <endpoint address=""
                  binding="basicHttpBinding"
                  contract="Contracts.ICalculator" />
        <endpoint address="mex"
                  binding="mexHttpsBinding"
                  contract="IMetadataExchange" />
        <host>
          <baseAddresses>
            <add baseAddress="https://example.com/Calculator.svc"/>
          </baseAddresses>
        </host>
      </service>
    </services>

    <behaviors>
      <serviceBehaviors>
        <behavior name="ServiceBehavior">
          <serviceMetadata httpsGetEnabled="true" />
          <serviceDebug includeExceptionDetailInFaults="false" />
          <serviceThrottling maxConcurrentCalls="100" maxConcurrentSessions="200" />
        </behavior>
      </serviceBehaviors>
    </behaviors>

    <bindings>
      <basicHttpBinding>
        <binding name="BasicHttps" maxReceivedMessageSize="10485760">
          <security mode="Transport"/>
        </binding>
      </basicHttpBinding>
    </bindings>
  </system.serviceModel>
</configuration>
```
